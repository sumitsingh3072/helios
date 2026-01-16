// ============================================================================
// API Service - Frontend to Backend Integration
// ============================================================================
// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_V1 = `${API_BASE_URL}/api/v1`;

// ============================================================================
// Types matching backend schemas
// ============================================================================

// User types (matching backend/app/schemas/user.py)
export interface User {
    id: number;
    email: string;
    full_name: string | null;
    phone_number: string | null;
    is_active: boolean;
    documents: Document[];
    chat_messages: ChatMessageDB[];
    transactions: TransactionBackend[];
}

export interface UserCreate {
    email: string;
    full_name?: string;
    phone_number: string;
    password: string;
}

// Document type (matching backend/app/schemas/document.py)
export interface Document {
    id: number;
    filename: string;
    content_type: string;
    owner_id: number;
}

// Transaction types (matching backend/app/schemas/transactions.py)
export interface TransactionBackend {
    id: number;
    description: string | null;
    amount: number;
    category: string;
    vendor_name: string | null;
    owner_id: number;
    transaction_date: string;
}

// Frontend transaction type for UI display
export interface Transaction {
    id: string;
    date: string;
    amount: number;
    description: string;
    category: string;
    status: 'completed' | 'processing' | 'failed';
}

// Chat types (matching backend/app/schemas/chat.py)
export interface ChatMessageCreate {
    message: string;
    language?: 'English' | 'Hindi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Marathi' | 'Gujarati' | 'Kannada' | 'Malayalam' | 'Odia' | 'Punjabi' | 'Assamese' | 'Bhojpuri';
}

export interface ChatMessageResponse {
    message: string;
    response: string;
}

export interface ChatMessageDB {
    id: number;
    message: string;
    is_from_user: boolean;
    owner_id: number;
    created_at: string;
}

// Frontend chat message type for UI display
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

// Dashboard types (matching backend/app/schemas/dashboard.py)
export interface DashboardSummary {
    total_spending: number;
    spending_by_category: Record<string, number>;
}

// Frontend dashboard stats for UI
export interface DashboardStats {
    totalBalance: number;
    balanceChange: number;
    monthlySpend: number;
    investments: number;
    activeSips: number;
}

// Token type (matching backend/app/schemas/token.py)
export interface Token {
    access_token: string;
    token_type: string;
}

// Other frontend types
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

// ============================================================================
// Token Management
// ============================================================================
const TOKEN_KEY = 'helios_auth_token';

export const tokenManager = {
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken: (token: string): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },
    removeToken: (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    getAuthHeaders: (): HeadersInit => {
        const token = tokenManager.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
};

// ============================================================================
// API Error Handling
// ============================================================================
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
            // If we can't parse the error, use the default message
        }
        throw new ApiError(errorMessage, response.status);
    }
    return response.json();
}

// ============================================================================
// Mock Data (fallback when backend is not available)
// ============================================================================
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

// ============================================================================
// API Service
// ============================================================================
export const api = {
    // =========================================================================
    // Health Check
    // =========================================================================
    health: {
        check: async (): Promise<{ status: string; message: string }> => {
            const response = await fetch(`${API_V1}/health/`);
            return handleResponse(response);
        }
    },

    // =========================================================================
    // Authentication
    // =========================================================================
    auth: {
        /**
         * Login with email and password
         * Backend: POST /api/v1/login/token
         */
        login: async (email: string, password: string): Promise<Token> => {
            const formData = new URLSearchParams();
            formData.append('username', email); // OAuth2 uses 'username' field
            formData.append('password', password);

            const response = await fetch(`${API_V1}/login/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const token = await handleResponse<Token>(response);
            tokenManager.setToken(token.access_token);
            return token;
        },

        /**
         * Register a new user
         * Backend: POST /api/v1/users/
         */
        signup: async (data: UserCreate): Promise<User> => {
            const response = await fetch(`${API_V1}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },

        /**
         * Get current user details
         * Backend: GET /api/v1/users/me
         */
        getUser: async (): Promise<User> => {
            const response = await fetch(`${API_V1}/users/me`, {
                headers: {
                    ...tokenManager.getAuthHeaders(),
                },
            });
            return handleResponse(response);
        },

        /**
         * Logout - clears the stored token
         */
        logout: (): void => {
            tokenManager.removeToken();
        },

        /**
         * Check if user is authenticated
         */
        isAuthenticated: (): boolean => {
            return !!tokenManager.getToken();
        }
    },

    // =========================================================================
    // Dashboard
    // =========================================================================
    dashboard: {
        /**
         * Get dashboard summary
         * Backend: GET /api/v1/dashboard/summary
         */
        getSummary: async (): Promise<DashboardSummary> => {
            const response = await fetch(`${API_V1}/dashboard/summary`, {
                headers: {
                    ...tokenManager.getAuthHeaders(),
                },
            });
            return handleResponse(response);
        },

        /**
         * Get dashboard stats (transforms backend data + adds mock data for UI)
         */
        getStats: async (): Promise<DashboardStats> => {
            try {
                const summary = await api.dashboard.getSummary();
                return {
                    totalBalance: 24093.82, // Would come from a separate endpoint
                    balanceChange: 12.4,
                    monthlySpend: Number(summary.total_spending),
                    investments: 120000,
                    activeSips: 3
                };
            } catch {
                // Fallback to mock data if backend is not available
                return {
                    totalBalance: 24093.82,
                    balanceChange: 12.4,
                    monthlySpend: 45231,
                    investments: 120000,
                    activeSips: 3
                };
            }
        },

        /**
         * Get staking assets (mock data - no backend endpoint yet)
         */
        getStakingAssets: async (): Promise<StakingAsset[]> => {
            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_STAKING_ASSETS]), 600)
            );
        },

        /**
         * Get recent activities (mock data - no backend endpoint yet)
         */
        getActivities: async (): Promise<Activity[]> => {
            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_ACTIVITIES]), 700)
            );
        },

        /**
         * Get user transactions from backend
         * Transforms backend TransactionBackend to frontend Transaction format
         */
        getTransactions: async (): Promise<Transaction[]> => {
            try {
                const user = await api.auth.getUser();
                return user.transactions.map((t): Transaction => ({
                    id: String(t.id),
                    date: t.transaction_date,
                    amount: t.amount,
                    description: t.description || t.vendor_name || 'Transaction',
                    category: t.category,
                    status: 'completed'
                }));
            } catch {
                // Fallback to mock data
                return [
                    { id: 't1', date: '2024-03-01', amount: -340, description: 'Uber Ride', category: 'Transport', status: 'completed' },
                    { id: 't2', date: '2024-03-01', amount: -450, description: 'Starbucks', category: 'Food & Drink', status: 'completed' },
                    { id: 't3', date: '2024-02-28', amount: 85000, description: 'Salary', category: 'Income', status: 'completed' },
                ];
            }
        },

        /**
         * Get transaction summary
         */
        getTransactionSummary: async (): Promise<TransactionSummary> => {
            const transactions = await api.dashboard.getTransactions();
            const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
            const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

            return {
                totalIncome,
                totalExpenses,
                netBalance: totalIncome - totalExpenses
            };
        },
    },

    // =========================================================================
    // Insights
    // =========================================================================
    insights: {
        /**
         * Get network stats (mock data - no backend endpoint yet)
         */
        getNetworkStats: async (): Promise<NetworkStats> => {
            return new Promise((resolve) =>
                setTimeout(() => resolve({ ...MOCK_NETWORK_STATS }), 800)
            );
        },

        /**
         * Get chart data (mock data - no backend endpoint yet)
         */
        getChartData: async (period: string = '1W'): Promise<ChartDataPoint[]> => {
            return new Promise((resolve) =>
                setTimeout(() => resolve([...MOCK_CHART_DATA]), 600)
            );
        },
    },

    // =========================================================================
    // Chat
    // =========================================================================
    chat: {
        /**
         * Get chat message history from user's messages
         */
        getMessages: async (): Promise<ChatMessage[]> => {
            try {
                const user = await api.auth.getUser();
                return user.chat_messages.map((msg): ChatMessage => ({
                    id: String(msg.id),
                    role: msg.is_from_user ? 'user' : 'assistant',
                    content: msg.message,
                    timestamp: new Date(msg.created_at),
                }));
            } catch {
                // Return welcome message if not authenticated
                return [{
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello! I'm Helios, your AI financial assistant. Please login to access personalized insights.",
                    timestamp: new Date(),
                }];
            }
        },

        /**
         * Send a message and get AI response
         * Backend: POST /api/v1/chat/
         */
        sendMessage: async (content: string, language: ChatMessageCreate['language'] = 'English'): Promise<{ userMessage: ChatMessage; aiResponse: ChatMessage }> => {
            const response = await fetch(`${API_V1}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...tokenManager.getAuthHeaders(),
                },
                body: JSON.stringify({
                    message: content,
                    language: language,
                } as ChatMessageCreate),
            });

            const result = await handleResponse<ChatMessageResponse>(response);

            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: content,
                timestamp: new Date(),
            };

            const aiResponse: ChatMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: result.response,
                timestamp: new Date(),
            };

            return { userMessage, aiResponse };
        },

        /**
         * Clear chat history (client-side only for now)
         */
        clearHistory: async (): Promise<void> => {
            return new Promise((resolve) => setTimeout(resolve, 300));
        }
    },

    // =========================================================================
    // Expense Processing
    // =========================================================================
    expense: {
        /**
         * Process a bill image and create transaction
         * Backend: POST /api/v1/expense/process-bill
         */
        processBill: async (file: File): Promise<TransactionBackend> => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_V1}/expense/process-bill`, {
                method: 'POST',
                headers: {
                    ...tokenManager.getAuthHeaders(),
                },
                body: formData,
            });
            return handleResponse(response);
        }
    },

    // =========================================================================
    // Document Management
    // =========================================================================
    documents: {
        /**
         * Get user's documents
         */
        getDocuments: async (): Promise<Document[]> => {
            const user = await api.auth.getUser();
            return user.documents;
        }
    },

    // =========================================================================
    // OCR Service
    // =========================================================================
    ocr: {
        /**
         * Upload image and extract text via OCR
         * Backend: POST /api/v1/ocr/upload
         */
        upload: async (file: File): Promise<{ id: number; filename: string; extracted_text: string; owner_id: number }> => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_V1}/ocr/upload`, {
                method: 'POST',
                headers: {
                    ...tokenManager.getAuthHeaders(),
                },
                body: formData,
            });
            return handleResponse(response);
        }
    },

    // =========================================================================
    // Document Analysis
    // =========================================================================
    documentAnalysis: {
        /**
         * Analyze document image for structured data extraction
         * Backend: POST /api/v1/document-analysis/analyze
         */
        analyze: async (file: File): Promise<{ document_type: string; extracted_data: Record<string, unknown> }> => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_V1}/document-analysis/analyze`, {
                method: 'POST',
                headers: {
                    ...tokenManager.getAuthHeaders(),
                },
                body: formData,
            });
            return handleResponse(response);
        }
    },

    // =========================================================================
    // Fraud Detection
    // =========================================================================
    fraud: {
        /**
         * Analyze text for potential fraud
         * Backend: POST /api/v1/fraud/analyze
         */
        analyze: async (text: string): Promise<{ is_scam: boolean; reason: string }> => {
            const response = await fetch(`${API_V1}/fraud/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...tokenManager.getAuthHeaders(),
                },
                body: JSON.stringify({ text }),
            });
            return handleResponse(response);
        }
    }
};
