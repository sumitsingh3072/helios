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
];

/**
 * API Service
 * 
 * This service handles all data fetching. currently using mock data.
 * When backend is ready, replace simulated delays with actual fetch calls.
 */
export const api = {
    auth: {
        login: async (email: string): Promise<User> => {
            // await fetch('/api/auth/login', ...);
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 1000));
        },
        signup: async (data: any): Promise<User> => {
            // await fetch('/api/auth/signup', ...);
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 1000));
        },
        getUser: async (): Promise<User> => {
            // await fetch('/api/user/me');
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 500));
        }
    },
    dashboard: {
        getStats: async () => {
            // await fetch('/api/dashboard/stats');
            return new Promise((resolve) => setTimeout(() => resolve({
                balance: 245000,
                monthlySpend: 45231,
                investments: 120000,
                activeSips: 3
            }), 800));
        },
        getTransactions: async (): Promise<Transaction[]> => {
            // await fetch('/api/transactions');
            return new Promise((resolve) => setTimeout(() => resolve(MOCK_TRANSACTIONS), 800));
        }
    }
};
