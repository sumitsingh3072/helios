import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FinancialInsightsResponse, AdvisoryReport } from '@/types/financialInsights';
import { api } from '@/services/api';

interface FinancialInsightsState {
    // Data
    report: AdvisoryReport | null;
    uploadedFileName: string | null;

    // Status
    isLoading: boolean;
    isUploading: boolean;
    error: string | null;

    // Actions
    uploadStatement: (file: File) => Promise<void>;
    clearReport: () => void;
    clearError: () => void;
}

/**
 * Financial Insights Store - Zustand store for financial advisory reports
 * Handles file upload and stores the analysis results
 * Persists the last report to localStorage for reuse
 */
export const useFinancialInsightsStore = create<FinancialInsightsState>()(
    persist(
        (set) => ({
            report: null,
            uploadedFileName: null,
            isLoading: false,
            isUploading: false,
            error: null,

            uploadStatement: async (file: File) => {
                try {
                    set({ isUploading: true, error: null });

                    const response = await api.financialInsights.getInsights(file);

                    set({
                        report: response.advisory_report,
                        uploadedFileName: file.name,
                        isUploading: false,
                    });
                } catch (err) {
                    const message = err instanceof Error ? err.message : 'Failed to analyze statement';
                    set({ error: message, isUploading: false });
                    throw err;
                }
            },

            clearReport: () => {
                set({ report: null, uploadedFileName: null, error: null });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'helios-financial-insights',
            partialize: (state) => ({
                report: state.report,
                uploadedFileName: state.uploadedFileName,
            }),
        }
    )
);
