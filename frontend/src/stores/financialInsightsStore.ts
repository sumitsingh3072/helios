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

    // Extract client profile
    const clientProfile: ClientProfile = {
        name: report.client_profile?.name || 'Unknown',
        address: report.client_profile?.address || '',
        account_number: report.client_profile?.account_number || 'N/A',
        analysis_period: report.client_profile?.analysis_period || 'N/A'
    };

    // Extract financial analysis - handle both "financial_analysis" and "detailed_analysis"
    const analysis = report.financial_analysis || report.detailed_analysis || {};

    const liquidityAssessment: LiquidityAssessment = {
        status: analysis.liquidity_assessment?.status || 'Unknown',
        start_balance: analysis.liquidity_assessment?.start_balance || 0,
        end_balance: analysis.liquidity_assessment?.end_balance || 0,
        insight: analysis.liquidity_assessment?.insight || ''
    };

    const cashFlowDynamics: CashFlowDynamics = {
        total_credits: analysis.cash_flow_dynamics?.total_credits || 0,
        total_debits: analysis.cash_flow_dynamics?.total_debits || 0,
        net_flow_observation: analysis.cash_flow_dynamics?.net_flow_observation || ''
    };

    const costBenefitAnalysis: CostBenefitAnalysis = {
        total_fees: analysis.cost_benefit_analysis?.total_fees || 0,
        interest_earned_period: analysis.cost_benefit_analysis?.interest_earned_period || 0,
        interest_earned_ytd: analysis.cost_benefit_analysis?.interest_earned_ytd || 0,
        insight: analysis.cost_benefit_analysis?.insight || ''
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
