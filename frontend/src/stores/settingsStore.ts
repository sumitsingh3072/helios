import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSettings {
    // Notifications
    spendingAlerts: boolean;
    weeklyReports: boolean;

    // Display
    displayName: string;
    email: string;
}

interface SettingsState {
    settings: UserSettings;
    isLoading: boolean;
    isSaving: boolean;
    error: string | null;

    // Actions
    updateSettings: (updates: Partial<UserSettings>) => void;
    saveSettings: () => Promise<void>;
    resetSettings: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
    spendingAlerts: true,
    weeklyReports: true,
    displayName: '',
    email: '',
};

/**
 * Settings Store - Zustand store for user settings
 * Persists to localStorage
 */
export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            settings: DEFAULT_SETTINGS,
            isLoading: false,
            isSaving: false,
            error: null,

            updateSettings: (updates) => {
                set((state) => ({
                    settings: { ...state.settings, ...updates },
                }));
            },

            saveSettings: async () => {
                try {
                    set({ isSaving: true, error: null });

                    // const response = await fetch('/api/settings', {
                    //     method: 'PUT',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify(get().settings),
                    // });
                    // if (!response.ok) throw new Error('Failed to save settings');

                    // Simulate API delay
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    set({ isSaving: false });
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Failed to save';
                    set({ error: message, isSaving: false });
                    throw err;
                }
            },

            resetSettings: () => {
                set({ settings: DEFAULT_SETTINGS, error: null });
            },
        }),
        {
            name: 'helios-settings',
            partialize: (state) => ({ settings: state.settings }),
        }
    )
);
