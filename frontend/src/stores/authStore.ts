import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, User } from '@/services/api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

/**
 * Auth Store - Zustand store for authentication state
 * Persists user session to localStorage
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string) => {
                try {
                    set({ isLoading: true, error: null });

                    // const response = await fetch('/api/auth/login', {
                    //     method: 'POST',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify({ email }),
                    // });
                    // if (!response.ok) throw new Error('Login failed');
                    // const user = await response.json();

                    const user = await api.auth.login(email);
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Login failed';
                    set({ error: message, isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                // await fetch('/api/auth/logout', { method: 'POST' });
                set({ user: null, isAuthenticated: false, error: null });
            },

            fetchUser: async () => {
                try {
                    set({ isLoading: true });

                    // const response = await fetch('/api/auth/me');
                    // if (!response.ok) throw new Error('Not authenticated');
                    // const user = await response.json();

                    const user = await api.auth.getUser();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'helios-auth',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);
