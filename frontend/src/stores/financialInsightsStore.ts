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

    // Extract client profile - handle multiple formats
    const clientInfo = report.client_profile || report.client_information || {};
    const clientProfile: ClientProfile = {
        name: clientInfo.name || report.account_holder || 'Unknown',
        address: clientInfo.address || '',
        account_number: clientInfo.account_number || 'N/A',
        analysis_period: clientInfo.analysis_period || clientInfo.period_under_review || report.period_analysis || 'N/A'
    };

    // Extract financial analysis - handle multiple formats
    const analysis = report.financial_analysis || report.detailed_analysis || report.key_observations || {};
    const healthMetrics = report.financial_health_metrics || {};

    // Handle liquidity - can be nested object or from health metrics
    const liquidityData = analysis.liquidity_assessment || analysis.liquidity_trend || {};

    // Try to extract balances from description text or key_observations array
    let startBalance = liquidityData.start_balance || liquidityData.opening_balance || 0;
    let endBalance = liquidityData.end_balance || liquidityData.closing_balance || 0;

    // If key_observations is an array, extract data from it
    if (Array.isArray(report.key_observations)) {
        report.key_observations.forEach((obs: { category?: string; observation?: string; impact?: string }) => {
            const obsText = (obs.observation || '') + ' ' + (obs.impact || '');

            // Extract balances from observations
            const balanceMatch = obsText.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*to\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
            if (balanceMatch) {
                startBalance = startBalance || parseFloat(balanceMatch[1].replace(/,/g, ''));
                endBalance = endBalance || parseFloat(balanceMatch[2].replace(/,/g, ''));
            }

            // Look for ending balance
            const endingMatch = obsText.match(/ending balance[^0-9]*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
            if (endingMatch) {
                endBalance = endBalance || parseFloat(endingMatch[1].replace(/,/g, ''));
            }

            // Look for beginning balance
            const beginningMatch = obsText.match(/beginning balance[^0-9]*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
            if (beginningMatch) {
                startBalance = startBalance || parseFloat(beginningMatch[1].replace(/,/g, ''));
            }

            // Pattern: "balance was critically low at 69.96"
            const lowBalanceMatch = obsText.match(/balance[^0-9]*(?:was|at)[^0-9]*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
            if (lowBalanceMatch && obs.category?.includes('Balance')) {
                startBalance = startBalance || parseFloat(lowBalanceMatch[1].replace(/,/g, ''));
            }

            // Pattern: "ending balance to 586.71"
            const toBalanceMatch = obsText.match(/balance to (\d+(?:,\d{3})*(?:\.\d{2})?)/i);
            if (toBalanceMatch) {
                endBalance = endBalance || parseFloat(toBalanceMatch[1].replace(/,/g, ''));
            }
        });
    }

    // Parse from description if still no balances
    const description = liquidityData.description || '';
    if ((!startBalance || !endBalance) && description) {
        const balanceMatch = description.match(/\$?([\d,]+\.?\d*)\s*to\s*\$?([\d,]+\.?\d*)/);
        if (balanceMatch) {
            startBalance = startBalance || parseFloat(balanceMatch[1].replace(/,/g, ''));
            endBalance = endBalance || parseFloat(balanceMatch[2].replace(/,/g, ''));
        }
    }

    const liquidityAssessment: LiquidityAssessment = {
        status: liquidityData.status || healthMetrics.liquidity_status || 'Unknown',
        start_balance: typeof startBalance === 'number' ? startBalance : parseFloat(startBalance) || 0,
        end_balance: typeof endBalance === 'number' ? endBalance : parseFloat(endBalance) || 0,
        insight: liquidityData.insight || liquidityData.description || healthMetrics.savings_capacity || ''
    };

    // Handle cash flow - multiple formats
    const cashFlowData = (typeof analysis === 'object' && !Array.isArray(analysis)) ? analysis.cash_flow_dynamics || {} : {};
    let totalCredits = cashFlowData.total_credits || cashFlowData.total_inflow || 0;
    let totalDebits = cashFlowData.total_debits || cashFlowData.total_outflow || 0;

    // Extract from key_observations array if available
    if (Array.isArray(report.key_observations)) {
        report.key_observations.forEach((obs: { category?: string; observation?: string }) => {
            if (obs.category === 'Cash Flow' && obs.observation) {
                // Pattern: "Total deposits (1,876.02)"
                const depositsMatch = obs.observation.match(/deposits?\s*\(?([\d,]+\.?\d*)\)?/i);
                if (depositsMatch) {
                    totalCredits = totalCredits || parseFloat(depositsMatch[1].replace(/,/g, ''));
                }

                // Pattern: "withdrawals (1,320.02)"
                const withdrawalsMatch = obs.observation.match(/withdrawal[s]?\s*\(?([\d,]+\.?\d*)\)?/i);
                if (withdrawalsMatch) {
                    totalDebits = totalDebits || parseFloat(withdrawalsMatch[1].replace(/,/g, ''));
                }
            }
        });
    }

    // Parse from net_cash_flow in health metrics (+516.75)
    const netFlowStr = healthMetrics.net_cash_flow || '';
    const netFlowMatch = netFlowStr.match(/([+-]?[\d,]+\.?\d*)/);
    const netCashFlow = netFlowMatch ? parseFloat(netFlowMatch[1].replace(/,/g, '')) : 0;

    const cashFlowDynamics: CashFlowDynamics = {
        total_credits: typeof totalCredits === 'number' ? totalCredits : parseFloat(totalCredits) || 0,
        total_debits: typeof totalDebits === 'number' ? totalDebits : parseFloat(totalDebits) || 0,
        net_flow_observation: cashFlowData.net_flow_observation || cashFlowData.net_result ||
            (netCashFlow ? `Net cash flow: ${netFlowStr}` : '') ||
            healthMetrics.savings_capacity || ''
    };

    // Handle costs - multiple formats
    const costData = (typeof analysis === 'object' && !Array.isArray(analysis))
        ? (analysis.cost_benefit_analysis || analysis.cost_vs_return || {})
        : {};
    let totalFees = costData.total_fees || costData.fees_charged || 0;
    let interestEarned = costData.interest_earned_period || costData.interest_earned || 0;

    // Extract from key_observations array if available
    if (Array.isArray(report.key_observations)) {
        report.key_observations.forEach((obs: { category?: string; observation?: string }) => {
            if (obs.category === 'Cost Management' && obs.observation) {
                // Pattern: "fees totaled 12.00"
                const feesMatch = obs.observation.match(/(?:fees?|charges?)\s*(?:totaled|of)?\s*([\d,]+\.?\d*)/i);
                if (feesMatch) {
                    totalFees = totalFees || parseFloat(feesMatch[1].replace(/,/g, ''));
                }
            }
        });
    }

    const costBenefitAnalysis: CostBenefitAnalysis = {
        total_fees: typeof totalFees === 'number' ? totalFees : parseFloat(totalFees) || 0,
        interest_earned_period: typeof interestEarned === 'number' ? interestEarned : parseFloat(interestEarned) || 0,
        interest_earned_ytd: costData.interest_earned_ytd || interestEarned || 0,
        insight: costData.insight || costData.analysis || healthMetrics.expense_to_income_ratio || ''
    };

    // Extract recommendations
    const recommendations: Recommendation[] = (report.strategic_recommendations || []).map((rec: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = rec as any;
        return {
            category: r.category || r.priority || 'General',
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

            if (parsed.financial_advisory) {
                return normalizeReport(parsed.financial_advisory);
            }

            if (parsed.client_profile || parsed.client_information || parsed.account_holder) {
                return normalizeReport(parsed);
            }
        }

        // Handle direct { financial_advisory_report: {...} } format
        if (data.financial_advisory_report) {
            return normalizeReport(data.financial_advisory_report);
        }

        // Handle direct { financial_advisory: {...} } format (without _report)
        if (data.financial_advisory) {
            return normalizeReport(data.financial_advisory);
        }

        // Handle direct report format with various client identifiers
        if (data.client_profile || data.client_information || data.account_holder) {
            return normalizeReport(data);
        }

        // If we have executive_summary, treat it as a report
        if (data.executive_summary) {
            return normalizeReport(data);
        }

        console.warn('Could not find financial report in response');
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
