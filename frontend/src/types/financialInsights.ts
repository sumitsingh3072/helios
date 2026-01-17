// ============================================================================
// Financial Insights Types
// ============================================================================

export interface ClientProfile {
    name: string;
    address: string;
    account_summary: {
        account_number_mask: string;
        currency: string;
        statement_period: string;
    };
}

export interface FinancialHealthAssessment {
    liquidity_status: string;
    cash_flow_status: string;
    risk_level: string;
}

export interface KeyMetric {
    amount?: number;
    calculation?: string;
    insight: string;
    total_outflows?: number;
    ratio_to_income?: string;
    fees_paid?: number;
    interest_earned?: number;
    net_cost?: number;
}

export interface KeyMetrics {
    net_cash_flow: KeyMetric;
    burn_rate: KeyMetric;
    cost_of_funds: KeyMetric;
}

export interface DetailedAnalysis {
    category: string;
    observation: string;
}

export interface StrategicRecommendation {
    priority: string;
    action: string;
    rationale: string;
}

export interface AdvisoryReport {
    client_profile: ClientProfile;
    financial_health_assessment: FinancialHealthAssessment;
    key_metrics: KeyMetrics;
    detailed_analysis: DetailedAnalysis[];
    strategic_recommendations: StrategicRecommendation[];
}

export interface FinancialInsightsResponse {
    advisory_report: AdvisoryReport;
}
