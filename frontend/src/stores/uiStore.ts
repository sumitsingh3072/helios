import { create } from 'zustand';

interface UIState {
    // Sidebar
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;

    // Loading states
    globalLoading: boolean;

    // Actions
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setGlobalLoading: (loading: boolean) => void;
}

/**
 * UI Store - Zustand store for global UI state
 */
export const useUIStore = create<UIState>()((set) => ({
    isSidebarOpen: true,
    isSidebarCollapsed: false,
    globalLoading: false,

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
    setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
