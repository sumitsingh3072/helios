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

                    // Handle both response formats
                    let data: FinancialInsightsResponse;

                    if ('advisory_report' in response) {
                        // Old format - convert to new format
                        // This handles legacy responses
                        set({
                            rawData: null,
                            insights: null,
                            uploadedFileName: file.name,
                            isUploading: false,
                            error: 'Legacy response format - please update backend'
                        });
                        return;
                    } else if ('transactions' in response) {
                        // New format with transactions
                        data = response as FinancialInsightsResponse;
                    } else if ('user_id' in response) {
                        // Direct response format
                        data = response as FinancialInsightsResponse;
                    } else {
                        throw new Error('Unknown response format');
                    }

                    const insights = calculateInsights(data);

                    set({
                        rawData: data,
                        insights,
                        uploadedFileName: file.name,
                        isUploading: false,
                    });
                } catch (err) {
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
