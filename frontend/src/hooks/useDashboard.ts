"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api, DashboardStats, StakingAsset, Activity } from "@/services/api";

interface UseDashboardReturn {
    stats: DashboardStats | null;
    stakingAssets: StakingAsset[];
    activities: Activity[];
    isLoading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for dashboard (overview) page
 * Handles fetching stats, staking assets, and activities
 * Follows SRP - only responsible for dashboard data operations
 */
export function useDashboard(): UseDashboardReturn {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [stakingAssets, setStakingAssets] = useState<StakingAsset[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch all data in parallel
            const [statsData, stakingData, activitiesData] = await Promise.all([
                api.dashboard.getStats(),
                api.dashboard.getStakingAssets(),
                api.dashboard.getActivities(),
            ]);

            setStats(statsData);
            setStakingAssets(stakingData);
            setActivities(activitiesData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data";
            setError(errorMessage);
            console.error("Failed to fetch dashboard data:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchData();
        }
    }, [fetchData]);

    return {
        stats,
        stakingAssets,
        activities,
        isLoading,
        error,
        refresh: fetchData,
    };
}
