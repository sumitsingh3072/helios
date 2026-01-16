"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api, NetworkStats, ChartDataPoint } from "@/services/api";

interface UseInsightsReturn {
    networkStats: NetworkStats | null;
    chartData: ChartDataPoint[];
    selectedPeriod: string;
    isLoading: boolean;
    error: string | null;
    setSelectedPeriod: (period: string) => void;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for insights page
 * Handles fetching network stats and chart data
 * Follows SRP - only responsible for insights data operations
 */
export function useInsights(): UseInsightsReturn {
    const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState("1W");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [statsData, chartDataResult] = await Promise.all([
                api.insights.getNetworkStats(),
                api.insights.getChartData(selectedPeriod),
            ]);

            setNetworkStats(statsData);
            setChartData(chartDataResult);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load insights data";
            setError(errorMessage);
            console.error("Failed to fetch insights data:", err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedPeriod]);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, [fetchData]);

    // Refetch when period changes (after initial load)
    useEffect(() => {
        if (hasFetched.current && networkStats) {
            api.insights.getChartData(selectedPeriod).then(setChartData).catch(console.error);
        }
    }, [selectedPeriod, networkStats]);

    return {
        networkStats,
        chartData,
        selectedPeriod,
        isLoading,
        error,
        setSelectedPeriod,
        refresh: fetchData,
    };
}
