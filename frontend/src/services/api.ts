// Basic types for our domain
export interface User {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'pro';
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
    status: 'completed' | 'processing' | 'failed';
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    richContent?: {
        type: 'stats' | 'chart' | 'table';
        data: Record<string, unknown>;
    };
}

// Dashboard types
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

export interface NetworkStats {
    totalThroughput: number;
    totalNodes: number;
    totalRegions: number;
    stakingApy: number;
    apyChange: number;
    networkLatency: number;
    uptime: number;
    regions: Array<{ id: string; name: string; utilization: number; nodes: number }>;
}

export interface ChartDataPoint {
    name: string;
    uv: number;
    pv: number;
}

export interface TransactionSummary {
    totalIncome: number;
    totalExpenses: number;
    netBalance: number;
}

// Mock data
const MOCK_USER: User = {
    id: 'u1',
    name: 'Somil Gupta',
    email: 'somil@example.com',
    plan: 'pro'
};

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', date: '2024-03-01', amount: -340, description: 'Uber Ride', category: 'Transport', status: 'completed' },
    { id: 't2', date: '2024-03-01', amount: -450, description: 'Starbucks', category: 'Food & Drink', status: 'completed' },
    { id: 't3', date: '2024-02-28', amount: 85000, description: 'Salary', category: 'Income', status: 'completed' },
    { id: 't4', date: '2024-02-27', amount: -1200, description: 'Amazon Purchase', category: 'Shopping', status: 'completed' },
    { id: 't5', date: '2024-02-26', amount: -500, description: 'Electricity Bill', category: 'Utilities', status: 'processing' },
    { id: 't6', date: '2024-02-25', amount: 5000, description: 'Freelance Payment', category: 'Income', status: 'completed' },
    { id: 't7', date: '2024-02-24', amount: -800, description: 'Restaurant', category: 'Food & Drink', status: 'completed' },
];

const MOCK_STAKING_DATA = [
    { name: "Mon", value: 3000 },
    { name: "Tue", value: 3500 },
    { name: "Wed", value: 3200 },
    { name: "Thu", value: 4000 },
    { name: "Fri", value: 3800 },
    { name: "Sat", value: 5000 },
    { name: "Sun", value: 5500 },
];

const MOCK_STAKING_ASSETS: StakingAsset[] = [
    { id: 's1', symbol: 'ETH', name: 'Ethereum', apy: '4.2%', tvl: '$8,242', chartColor: '#3B82F6', allocation: 64, data: MOCK_STAKING_DATA },
    { id: 's2', symbol: 'SOL', name: 'Solana', apy: '7.8%', tvl: '$4,102', chartColor: '#60A5FA', allocation: 28, data: MOCK_STAKING_DATA },
    { id: 's3', symbol: 'USDC', name: 'USD Coin', apy: '5.1%', tvl: '$12,093', chartColor: '#FFFFFF', allocation: 8, data: MOCK_STAKING_DATA },
];

const MOCK_ACTIVITIES: Activity[] = [
    { id: 'a1', type: 'deposit', description: 'Stake Deposit', amount: '+2.5 ETH', asset: 'ETH', timestamp: new Date(Date.now() - 600000), status: 'completed' },
    { id: 'a2', type: 'reward', description: 'Staking Reward', amount: '+0.02 ETH', asset: 'ETH', timestamp: new Date(Date.now() - 3600000), status: 'completed' },
    { id: 'a3', type: 'stake', description: 'Auto-compound', amount: '+0.5 SOL', asset: 'SOL', timestamp: new Date(Date.now() - 7200000), status: 'completed' },
    { id: 'a4', type: 'withdraw', description: 'Withdrawal', amount: '-1.0 ETH', asset: 'ETH', timestamp: new Date(Date.now() - 86400000), status: 'completed' },
    { id: 'a5', type: 'deposit', description: 'Stake Deposit', amount: '+100 USDC', asset: 'USDC', timestamp: new Date(Date.now() - 172800000), status: 'pending' },
];

const MOCK_NETWORK_STATS: NetworkStats = {
    totalThroughput: 842.5,
    totalNodes: 34,
    totalRegions: 12,
    stakingApy: 12.84,
    apyChange: 12.4,
    networkLatency: 14,
    uptime: 99.9,
    regions: [
        { id: 'r1', name: 'NA-East', utilization: 60, nodes: 12 },
        { id: 'r2', name: 'EU-West', utilization: 75, nodes: 10 },
        { id: 'r3', name: 'AP-South', utilization: 90, nodes: 12 },
    ],
};

const MOCK_CHART_DATA: ChartDataPoint[] = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 },
    { name: 'Jul', uv: 3490, pv: 4300 },
];

const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    {
        id: 'm1',
        role: 'assistant',
        content: "Hello! I'm Helios, your AI financial intelligence assistant. I've been analyzing your portfolio and have some insights to share. Would you like me to break down your staking rewards or analyze market trends?",
        timestamp: new Date(Date.now() - 60000),
        richContent: {
            type: 'stats',
            data: {
                portfolioChange: '+12.4%',
                topPerformer: 'ETH',
                topPerformerChange: '+18.2%'
            }
        }
    },
    {
        id: 'm2',
        role: 'user',
        content: "Show me my staking rewards breakdown and compare with last month's performance.",
        timestamp: new Date(Date.now() - 30000),
    },
    {
        id: 'm3',
        role: 'assistant',
        content: "Here's your staking rewards breakdown. Your total rewards are $1,318 — up 12.8% from last month ($1,158).",
        timestamp: new Date(),
        richContent: {
            type: 'chart',
            data: {
                items: [
                    { name: 'Ethereum', current: '$842', prev: '$720', change: '+16.9%', percentage: 75 },
                    { name: 'Solana', current: '$320', prev: '$290', change: '+10.3%', percentage: 45 },
                    { name: 'USDC', current: '$156', prev: '$148', change: '+5.4%', percentage: 25 },
                ]
            }
        }
    },
];

const AI_RESPONSES = [
    "I've analyzed your request. Based on your portfolio data, I can see some interesting trends. Your overall performance has been positive this quarter.",
    "Great question! Looking at the market data, I can provide some insights. The current trend suggests cautious optimism.",
    "I've processed your query. Here's what I found in your financial data - your spending patterns show improvement compared to last month.",
    "Based on my analysis, I recommend reviewing your asset allocation. Your current portfolio is well-diversified but could benefit from some adjustments.",
];

/**
 * API Service
 * 
 * This service handles all data fetching. Currently using mock data.
 * When backend is ready, replace simulated delays with actual fetch calls.
 */
export const api = {
    auth: {
        login: async (email: string): Promise<User> => {
            // await fetch('/api/auth/login', ...);
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 1000));
        },
        signup: async (data: unknown): Promise<User> => {
            // await fetch('/api/auth/signup', ...);
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 1000));
        },
        getUser: async (): Promise<User> => {
            // await fetch('/api/user/me');
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 500));
        }
    },

    dashboard: {
        /**
         * Get dashboard overview stats
         */
        getStats: async (): Promise<DashboardStats> => {
            // const response = await fetch('/api/dashboard/stats');
            // if (!response.ok) throw new Error('Failed to fetch stats');
            // return response.json();

            return new Promise((resolve) => setTimeout(() => resolve({
                totalBalance: 24093.82,
                balanceChange: 12.4,
                monthlySpend: 45231,
                investments: 120000,
                activeSips: 3
            }), 800));
        },

        /**
         * Get staking assets data
         */
        getStakingAssets: async (): Promise<StakingAsset[]> => {
            // const response = await fetch('/api/dashboard/staking');
            // if (!response.ok) throw new Error('Failed to fetch staking assets');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_STAKING_ASSETS]), 600)
            );
        },

        /**
         * Get recent activities
         */
        getActivities: async (): Promise<Activity[]> => {
            // const response = await fetch('/api/dashboard/activities');
            // if (!response.ok) throw new Error('Failed to fetch activities');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_ACTIVITIES]), 700)
            );
        },

        /**
         * Get transactions list
         */
        getTransactions: async (): Promise<Transaction[]> => {
            // const response = await fetch('/api/transactions');
            // if (!response.ok) throw new Error('Failed to fetch transactions');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_TRANSACTIONS]), 800)
            );
        },

        /**
         * Get transaction summary
         */
        getTransactionSummary: async (): Promise<TransactionSummary> => {
            // const response = await fetch('/api/transactions/summary');
            // if (!response.ok) throw new Error('Failed to fetch summary');
            // return response.json();

            const transactions = MOCK_TRANSACTIONS;
            const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
            const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

            return new Promise((resolve) => setTimeout(() => resolve({
                totalIncome,
                totalExpenses,
                netBalance: totalIncome - totalExpenses
            }), 500));
        },
    },

    insights: {
        /**
         * Get network statistics
         */
        getNetworkStats: async (): Promise<NetworkStats> => {
            // const response = await fetch('/api/insights/network');
            // if (!response.ok) throw new Error('Failed to fetch network stats');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve({ ...MOCK_NETWORK_STATS }), 800)
            );
        },

        /**
         * Get chart data for performance graph
         */
        getChartData: async (period: string = '1W'): Promise<ChartDataPoint[]> => {
            // const response = await fetch(`/api/insights/chart?period=${period}`);
            // if (!response.ok) throw new Error('Failed to fetch chart data');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_CHART_DATA]), 600)
            );
        },
    },

    chat: {
        /**
         * Get chat message history
         */
        getMessages: async (): Promise<ChatMessage[]> => {
            // const response = await fetch('/api/chat/messages');
            // if (!response.ok) throw new Error('Failed to fetch messages');
            // return response.json();

            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_CHAT_MESSAGES]), 800)
            );
        },

        /**
         * Send a message and get AI response
         */
        sendMessage: async (content: string): Promise<{ userMessage: ChatMessage; aiResponse: ChatMessage }> => {
            // const response = await fetch('/api/chat/send', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ content }),
            // });
            // if (!response.ok) throw new Error('Failed to send message');
            // return response.json();

            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content,
                timestamp: new Date(),
            };

            await new Promise((resolve) => setTimeout(resolve, 1500));

            const aiResponse: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
                timestamp: new Date(),
            };

            return { userMessage, aiResponse };
        },

        /**
         * Clear chat history
         */
        clearHistory: async (): Promise<void> => {
            // await fetch('/api/chat/clear', { method: 'DELETE' });
            return new Promise((resolve) => setTimeout(resolve, 300));
        }
    }
};

