import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/services/api';

// Types matching the actual API response
export interface ClientProfile {
    name: string;
    address: string;
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

export interface DetailedAnalysis {
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
    detailed_analysis: DetailedAnalysis;
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

            // Handle { financial_advisory_report: {...} } structure
            if (parsed.financial_advisory_report) {
                console.log('Parsed Report:', parsed.financial_advisory_report);
                return parsed.financial_advisory_report as FinancialAdvisoryReport;
            }

            // Handle direct report structure
            if (parsed.client_profile && parsed.detailed_analysis) {
                return parsed as FinancialAdvisoryReport;
            }
        }

        // Handle direct { financial_advisory_report: {...} } format
        if (data.financial_advisory_report) {
            return data.financial_advisory_report as FinancialAdvisoryReport;
        }

        // Handle direct report format
        if (data.client_profile && data.detailed_analysis) {
            return data as FinancialAdvisoryReport;
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
