import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/services/api';

// Types matching the actual API response
export interface ClientProfile {
    name: string;
    address?: string;
    account_number: string;
    analysis_period: string;
}

export interface LiquidityAssessment {
    status: string;
    start_balance: number;
    end_balance: number;
    insight: string;
}

export interface CashFlowDynamics {
    total_credits: number;
    total_debits: number;
    net_flow_observation: string;
}

export interface CostBenefitAnalysis {
    total_fees: number;
    interest_earned_period: number;
    interest_earned_ytd: number;
    insight: string;
}

export interface FinancialAnalysis {
    liquidity_assessment: LiquidityAssessment;
    cash_flow_dynamics: CashFlowDynamics;
    cost_benefit_analysis: CostBenefitAnalysis;
}

export interface Recommendation {
    category: string;
    action: string;
    details: string;
}

export interface FinancialAdvisoryReport {
    client_profile: ClientProfile;
    executive_summary: string;
    financial_analysis: FinancialAnalysis;  // Changed from detailed_analysis
    strategic_recommendations: Recommendation[];
}

interface FinancialInsightsState {
    // Parsed report from API
    report: FinancialAdvisoryReport | null;

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
 * Extract JSON from markdown code block
 */
function extractJsonFromAnswer(answer: string): string {
    // Remove markdown code block markers
    let json = answer.trim();

    // Remove ```json at the start
    if (json.startsWith('```json')) {
        json = json.slice(7);
    } else if (json.startsWith('```')) {
        json = json.slice(3);
    }

    // Remove ``` at the end
    if (json.endsWith('```')) {
        json = json.slice(0, -3);
    }

    return json.trim();
}

/**
 * Normalize the report structure to handle various API response formats
 */
function normalizeReport(data: unknown): FinancialAdvisoryReport | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const report = data as any;

    if (!report) return null;

    console.log('Normalizing report:', report);

    // Extract client profile - handle both "client_profile" and "client_information"
    const clientInfo = report.client_profile || report.client_information || {};
    const clientProfile: ClientProfile = {
        name: clientInfo.name || 'Unknown',
        address: clientInfo.address || '',
        account_number: clientInfo.account_number || 'N/A',
        analysis_period: clientInfo.analysis_period || clientInfo.period_under_review || 'N/A'
    };

    // Extract financial analysis - handle multiple formats:
    // - "financial_analysis" 
    // - "detailed_analysis"
    // - "key_observations"
    const analysis = report.financial_analysis || report.detailed_analysis || report.key_observations || {};

    // Handle liquidity - can be "liquidity_assessment" or "liquidity_trend"
    const liquidityData = analysis.liquidity_assessment || analysis.liquidity_trend || {};

    // Try to extract balances from description text if not directly available
    let startBalance = liquidityData.start_balance || liquidityData.opening_balance || 0;
    let endBalance = liquidityData.end_balance || liquidityData.closing_balance || 0;

    // Parse balances from description if available (e.g., "grew from $69.96 to $586.71")
    const description = liquidityData.description || '';
    if ((!startBalance || !endBalance) && description) {
        const balanceMatch = description.match(/\$?([\d,]+\.?\d*)\s*to\s*\$?([\d,]+\.?\d*)/);
        if (balanceMatch) {
            startBalance = startBalance || parseFloat(balanceMatch[1].replace(/,/g, ''));
            endBalance = endBalance || parseFloat(balanceMatch[2].replace(/,/g, ''));
        }
    }

    const liquidityAssessment: LiquidityAssessment = {
        status: liquidityData.status || 'Unknown',
        start_balance: typeof startBalance === 'number' ? startBalance : parseFloat(startBalance) || 0,
        end_balance: typeof endBalance === 'number' ? endBalance : parseFloat(endBalance) || 0,
        insight: liquidityData.insight || liquidityData.description || ''
    };

    // Handle cash flow - can be "cash_flow_dynamics" with various field names
    const cashFlowData = analysis.cash_flow_dynamics || {};
    const totalCredits = cashFlowData.total_credits || cashFlowData.total_inflow || 0;
    const totalDebits = cashFlowData.total_debits || cashFlowData.total_outflow || 0;

    const cashFlowDynamics: CashFlowDynamics = {
        total_credits: typeof totalCredits === 'number' ? totalCredits : parseFloat(totalCredits) || 0,
        total_debits: typeof totalDebits === 'number' ? totalDebits : parseFloat(totalDebits) || 0,
        net_flow_observation: cashFlowData.net_flow_observation || cashFlowData.net_result || ''
    };

    // Handle costs - can be "cost_benefit_analysis" or "cost_vs_return"
    const costData = analysis.cost_benefit_analysis || analysis.cost_vs_return || {};
    const totalFees = costData.total_fees || costData.fees_charged || 0;
    const interestPeriod = costData.interest_earned_period || costData.interest_earned || 0;
    const interestYtd = costData.interest_earned_ytd || costData.interest_earned || 0;

    const costBenefitAnalysis: CostBenefitAnalysis = {
        total_fees: typeof totalFees === 'number' ? totalFees : parseFloat(totalFees) || 0,
        interest_earned_period: typeof interestPeriod === 'number' ? interestPeriod : parseFloat(interestPeriod) || 0,
        interest_earned_ytd: typeof interestYtd === 'number' ? interestYtd : parseFloat(interestYtd) || 0,
        insight: costData.insight || costData.analysis || ''
    };

    // Extract recommendations
    const recommendations: Recommendation[] = (report.strategic_recommendations || []).map((rec: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = rec as any;
        return {
            category: r.category || 'General',
            action: r.action || '',
            details: r.details || r.rationale || ''
        };
    });

    console.log('Normalized result:', {
        clientProfile,
        liquidityAssessment,
        cashFlowDynamics,
        costBenefitAnalysis
    });

    return {
        client_profile: clientProfile,
        executive_summary: report.executive_summary || '',
        financial_analysis: {
            liquidity_assessment: liquidityAssessment,
            cash_flow_dynamics: cashFlowDynamics,
            cost_benefit_analysis: costBenefitAnalysis
        },
        strategic_recommendations: recommendations
    };
}

/**
 * Parse the API response
 */
function parseResponse(response: unknown): FinancialAdvisoryReport | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = response as any;

    console.log('Raw API Response:', data);

    try {
        // Handle { answer: "```json...```" } format
        if (data.answer && typeof data.answer === 'string') {
            const jsonStr = extractJsonFromAnswer(data.answer);
            const parsed = JSON.parse(jsonStr);

            if (parsed.financial_advisory_report) {
                return normalizeReport(parsed.financial_advisory_report);
            }

            if (parsed.client_profile) {
                return normalizeReport(parsed);
            }
        }

        // Handle direct { financial_advisory_report: {...} } format
        if (data.financial_advisory_report) {
            return normalizeReport(data.financial_advisory_report);
        }

        // Handle direct report format
        if (data.client_profile) {
            return normalizeReport(data);
        }

        console.warn('Could not find financial_advisory_report in response');
        return null;

    } catch (err) {
        console.error('Error parsing response:', err);
        return null;
    }
}

/**
 * Financial Insights Store - Zustand store for financial advisory reports
 */
export const useFinancialInsightsStore = create<FinancialInsightsState>()(
    persist(
        (set) => ({
            report: null,
            uploadedFileName: null,
            isLoading: false,
            isUploading: false,
            error: null,

            uploadStatement: async (file: File) => {
                try {
                    set({ isUploading: true, error: null });

                    const response = await api.financialInsights.getInsights(file);
                    const report = parseResponse(response);

                    if (!report) {
                        set({
                            report: null,
                            uploadedFileName: file.name,
                            isUploading: false,
                            error: 'Could not parse financial report from response'
                        });
                        return;
                    }

                    set({
                        report,
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
                set({ report: null, uploadedFileName: null, error: null });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'helios-financial-insights',
            partialize: (state) => ({
                report: state.report,
                uploadedFileName: state.uploadedFileName,
            }),
        }
    )
);
