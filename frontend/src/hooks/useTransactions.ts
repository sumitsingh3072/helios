"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { api, Transaction, TransactionSummary } from "@/services/api";

type TransactionFilter = 'all' | 'income' | 'expense' | 'pending';

interface UseTransactionsReturn {
    transactions: Transaction[];
    filteredTransactions: Transaction[];
    summary: TransactionSummary | null;
    searchQuery: string;
    activeFilter: TransactionFilter;
    isLoading: boolean;
    error: string | null;
    setSearchQuery: (query: string) => void;
    setActiveFilter: (filter: TransactionFilter) => void;
    refresh: () => Promise<void>;
}

/**
 * Custom hook for transactions page
 * Handles fetching, filtering, and searching transactions
 * Follows SRP - only responsible for transactions data operations
 */
export function useTransactions(): UseTransactionsReturn {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<TransactionSummary | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<TransactionFilter>("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [transactionsData, summaryData] = await Promise.all([
                api.dashboard.getTransactions(),
                api.dashboard.getTransactionSummary(),
            ]);

            setTransactions(transactionsData);
            setSummary(summaryData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load transactions";
            setError(errorMessage);
            console.error("Failed to fetch transactions:", err);
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

    // Filter and search logic
    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        // Apply filter
        switch (activeFilter) {
            case 'income':
                result = result.filter(t => t.amount > 0);
                break;
            case 'expense':
                result = result.filter(t => t.amount < 0);
                break;
            case 'pending':
                result = result.filter(t => t.status === 'processing');
                break;
            default:
                break;
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.description.toLowerCase().includes(query) ||
                t.category.toLowerCase().includes(query) ||
                t.id.toLowerCase().includes(query)
            );
        }

        return result;
    }, [transactions, activeFilter, searchQuery]);

    return {
        transactions,
        filteredTransactions,
        summary,
        searchQuery,
        activeFilter,
        isLoading,
        error,
        setSearchQuery,
        setActiveFilter,
        refresh: fetchData,
    };
}
