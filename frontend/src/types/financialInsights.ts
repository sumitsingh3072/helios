// Financial Insights Types - Matching actual API response

export interface Transaction {
    date: string;
    merchant: string;
    category: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    payment_mode: string;
}

export interface FinancialInsightsResponse {
    user_id: string;
    month: string;
    currency: string;
    transactions: Transaction[];
}

// Calculated insights from transactions
export interface CalculatedInsights {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    savingsRate: number;
    burnRate: number;
    categoryBreakdown: { category: string; amount: number; percentage: number }[];
    topMerchants: { merchant: string; amount: number; count: number }[];
    paymentModes: { mode: string; amount: number; count: number }[];
}

// Legacy types for backward compatibility (if backend changes later)
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

export interface KeyMetrics {
    net_cash_flow: {
        amount?: number;
        calculation?: string;
        insight: string;
    };
    burn_rate: {
        total_outflows?: number;
        ratio_to_income?: string;
        insight: string;
    };
    cost_of_funds: {
        fees_paid?: number;
        interest_earned?: number;
        net_cost?: number;
        insight: string;
    };
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
