import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FinancialInsightsResponse, Transaction, CalculatedInsights } from '@/types/financialInsights';
import { api } from '@/services/api';

interface FinancialInsightsState {
    // Raw data from API
    rawData: FinancialInsightsResponse | null;

    // Calculated insights
    insights: CalculatedInsights | null;

    uploadedFileName: string | null;

    // Status
    isLoading: boolean;
    isUploading: boolean;
    error: string | null;

    // Actions
    uploadStatement: (file: File) => Promise<void>;
    clearReport: () => void;
    clearError: () => void;
}

/**
 * Calculate insights from raw transaction data
 */
function calculateInsights(data: FinancialInsightsResponse): CalculatedInsights {
    const transactions = data.transactions || [];

    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'CREDIT')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'DEBIT')
        .reduce((sum, t) => sum + t.amount, 0);

    const netCashFlow = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((netCashFlow / totalIncome) * 100) : 0;
    const burnRate = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100) : 0;

    // Category breakdown
    const categoryMap = new Map<string, number>();
    transactions.filter(t => t.type === 'DEBIT').forEach(t => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
    });

    const categoryBreakdown = Array.from(categoryMap.entries())
        .map(([category, amount]) => ({
            category,
            amount,
            percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
        }))
        .sort((a, b) => b.amount - a.amount);

    // Top merchants
    const merchantMap = new Map<string, { amount: number; count: number }>();
    transactions.forEach(t => {
        const existing = merchantMap.get(t.merchant) || { amount: 0, count: 0 };
        merchantMap.set(t.merchant, {
            amount: existing.amount + (t.type === 'DEBIT' ? t.amount : 0),
            count: existing.count + 1
        });
    });

    const topMerchants = Array.from(merchantMap.entries())
        .map(([merchant, data]) => ({ merchant, ...data }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    // Payment modes
    const modeMap = new Map<string, { amount: number; count: number }>();
    transactions.forEach(t => {
        const existing = modeMap.get(t.payment_mode) || { amount: 0, count: 0 };
        modeMap.set(t.payment_mode, {
            amount: existing.amount + t.amount,
            count: existing.count + 1
        });
    });

    const paymentModes = Array.from(modeMap.entries())
        .map(([mode, data]) => ({ mode, ...data }))
        .sort((a, b) => b.count - a.count);

    return {
        totalIncome,
        totalExpenses,
        netCashFlow,
        savingsRate,
        burnRate,
        categoryBreakdown,
        topMerchants,
        paymentModes
    };
}

/**
 * Parse the API response and extract financial data
 * Handles various response formats from the backend
 */
function parseResponse(response: unknown): FinancialInsightsResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = response as any;

    console.log('API Response:', JSON.stringify(data, null, 2));

    // If response has transactions array directly
    if (Array.isArray(data.transactions)) {
        return {
            user_id: data.user_id || data.userId || 'unknown',
            month: data.month || data.period || new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
            currency: data.currency || 'INR',
            transactions: data.transactions.map((t: unknown) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const txn = t as any;
                return {
                    date: txn.date || txn.transaction_date || '',
                    merchant: txn.merchant || txn.description || txn.vendor || 'Unknown',
                    category: txn.category || 'Uncategorized',
                    amount: typeof txn.amount === 'number' ? txn.amount : parseFloat(txn.amount) || 0,
                    type: (txn.type === 'CREDIT' || txn.type === 'credit' || txn.amount > 0 && !txn.type) ? 'CREDIT' : 'DEBIT',
                    payment_mode: txn.payment_mode || txn.paymentMode || txn.method || 'Unknown'
                } as Transaction;
            })
        };
    }

    // If response is the advisory_report format (legacy)
    if (data.advisory_report) {
        // Convert legacy format - create synthetic transactions from metrics
        const report = data.advisory_report;
        return {
            user_id: report.client_profile?.name || 'User',
            month: report.client_profile?.account_summary?.statement_period || 'Statement',
            currency: report.client_profile?.account_summary?.currency || 'INR',
            transactions: []
        };
    }

    // If response itself looks like transaction data
    if (data.date && data.merchant && data.amount !== undefined) {
        return {
            user_id: 'unknown',
            month: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
            currency: 'INR',
            transactions: [data as Transaction]
        };
    }

    // Return empty structure if we can't parse
    console.warn('Could not parse response format:', data);
    return {
        user_id: 'unknown',
        month: 'Unknown Period',
        currency: 'INR',
        transactions: []
    };
}

/**
 * Financial Insights Store - Zustand store for financial data
 * Handles file upload and calculates insights from transaction data
 * Persists the data to localStorage for reuse
 */
export const useFinancialInsightsStore = create<FinancialInsightsState>()(
    persist(
        (set) => ({
            rawData: null,
            insights: null,
            uploadedFileName: null,
            isLoading: false,
            isUploading: false,
            error: null,

            uploadStatement: async (file: File) => {
                try {
                    set({ isUploading: true, error: null });

                    const response = await api.financialInsights.getInsights(file);

                    // Parse the response flexibly
                    const data = parseResponse(response);

                    if (data.transactions.length === 0) {
                        set({
                            rawData: data,
                            insights: null,
                            uploadedFileName: file.name,
                            isUploading: false,
                            error: 'No transactions found in the response. Check console for details.'
                        });
                        return;
                    }

                    const insights = calculateInsights(data);

                    set({
                        rawData: data,
                        insights,
                        uploadedFileName: file.name,
                        isUploading: false,
                        error: null
                    });
                } catch (err) {
                    console.error('Upload error:', err);
                    const message = err instanceof Error ? err.message : 'Failed to analyze statement';
                    set({ error: message, isUploading: false });
                    throw err;
                }
            },

            clearReport: () => {
                set({ rawData: null, insights: null, uploadedFileName: null, error: null });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'helios-financial-insights',
            partialize: (state) => ({
                rawData: state.rawData,
                insights: state.insights,
                uploadedFileName: state.uploadedFileName,
            }),
        }
    )
);
