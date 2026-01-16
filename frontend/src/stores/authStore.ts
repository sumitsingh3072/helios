import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, User, tokenManager } from '@/services/api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
    clearError: () => void;
    checkAuth: () => boolean;
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

            login: async (email: string, password: string) => {
                try {
                    set({ isLoading: true, error: null });

                    // Login returns a token, which is stored by the API
                    await api.auth.login(email, password);

                    // Fetch user details after login
                    const user = await api.auth.getUser();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Login failed';
                    set({ error: message, isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                api.auth.logout();
                set({ user: null, isAuthenticated: false, error: null });
            },

            fetchUser: async () => {
                try {
                    set({ isLoading: true });

                    const user = await api.auth.getUser();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch {
                    // If fetch fails, clear auth state
                    tokenManager.removeToken();
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            checkAuth: () => {
                return api.auth.isAuthenticated();
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
