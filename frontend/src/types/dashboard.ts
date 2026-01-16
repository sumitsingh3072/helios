// Dashboard-related type definitions

// ============= Overview Page Types =============

export interface DashboardStats {
    totalBalance: number;
    balanceChange: number;
    monthlySpend: number;
    investments: number;
    activeSips: number;
}

export interface StakingAsset {
    id: string;
    symbol: string;
    name: string;
    apy: string;
    tvl: string;
    chartColor: string;
    allocation: number;
    data: Array<{ name: string; value: number }>;
}

export interface Activity {
    id: string;
    type: 'deposit' | 'withdraw' | 'stake' | 'unstake' | 'reward';
    description: string;
    amount: string;
    asset: string;
    timestamp: Date;
    status: 'completed' | 'pending' | 'failed';
}

export interface DashboardData {
    stats: DashboardStats;
    stakingAssets: StakingAsset[];
    activities: Activity[];
}

// ============= Insights Page Types =============

export interface NetworkRegion {
    id: string;
    name: string;
    utilization: number;
    nodes: number;
}

export interface NetworkStats {
    totalThroughput: number;
    totalNodes: number;
    totalRegions: number;
    stakingApy: number;
    apyChange: number;
    networkLatency: number;
    uptime: number;
    regions: NetworkRegion[];
}

export interface ChartDataPoint {
    name: string;
    uv: number;
    pv: number;
}

export interface InsightsData {
    networkStats: NetworkStats;
    chartData: ChartDataPoint[];
}

// ============= Transactions Page Types =============

export type TransactionFilter = 'all' | 'income' | 'expense' | 'pending';

export interface TransactionSummary {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
}

export interface TransactionsState {
    searchQuery: string;
    activeFilter: TransactionFilter;
}
