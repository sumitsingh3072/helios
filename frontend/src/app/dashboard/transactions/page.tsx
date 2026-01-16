"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, ArrowUpRight, ArrowDownLeft, Download, RefreshCw, AlertCircle } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";

type TransactionFilter = 'all' | 'income' | 'expense' | 'pending';

const FILTER_OPTIONS: { label: string; value: TransactionFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Pending', value: 'pending' },
];

/**
 * Transactions Page - Orchestrator
 * Uses useTransactions hook for data, only responsible for layout
 */
export default function TransactionsPage() {
    const {
        filteredTransactions,
        summary,
        searchQuery,
        activeFilter,
        isLoading,
        error,
        setSearchQuery,
        setActiveFilter,
        refresh,
    } = useTransactions();

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold mb-2">Failed to load transactions</h2>
                <p className="text-gray-400 mb-4">{error}</p>
                <Button onClick={refresh} className="bg-blue-600 hover:bg-blue-500">
                    <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Transactions</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage and view your recent financial activity.</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-full px-4 md:px-6"
                        onClick={refresh}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                    </Button>
                    <Button className="bg-white text-black hover:bg-gray-200 px-4 md:px-6 rounded-full font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                        <Download className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Export CSV</span>
                    </Button>
                </div>
            </div>

            {/* Filters & Search */}
            <GlassCard variant="metallic" className="p-4 border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/50 border-white/10 h-12 pl-11 pr-4 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-blue-500/50"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {FILTER_OPTIONS.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`px-3 md:px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeFilter === filter.value
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                        <Button size="icon" variant="outline" className="border-white/10 hover:bg-white/5 h-10 w-10 rounded-xl">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Transactions Table */}
            <GlassCard variant="metallic" className="p-0 overflow-hidden border-white/5">
                {/* Table Header - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-black/30 border-b border-white/5">
                    <div className="col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</div>
                    <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</div>
                    <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</div>
                    <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</div>
                    <div className="col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-white/5">
                    {isLoading ? (
                        [...Array(5)].map((_, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 p-4 animate-pulse">
                                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-white/10 rounded w-24" />
                                        <div className="h-3 bg-white/5 rounded w-16" />
                                    </div>
                                </div>
                                <div className="hidden md:flex col-span-2 items-center">
                                    <div className="h-4 bg-white/10 rounded w-20" />
                                </div>
                                <div className="hidden md:flex col-span-2 items-center">
                                    <div className="h-6 bg-white/10 rounded-full w-16" />
                                </div>
                                <div className="hidden md:flex col-span-2 items-center">
                                    <div className="h-6 bg-white/10 rounded-full w-20" />
                                </div>
                                <div className="hidden md:flex col-span-3 items-center justify-end">
                                    <div className="h-6 bg-white/10 rounded w-20" />
                                </div>
                            </div>
                        ))
                    ) : filteredTransactions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {searchQuery || activeFilter !== 'all'
                                ? 'No transactions match your filters.'
                                : 'No transactions found.'
                            }
                        </div>
                    ) : (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group"
                            >
                                {/* Description with icon */}
                                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${transaction.amount > 0
                                            ? 'bg-green-500/10 border-green-500/20'
                                            : 'bg-red-500/10 border-red-500/20'
                                        }`}>
                                        {transaction.amount > 0 ? (
                                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {transaction.description}
                                        </p>
                                        <p className="text-xs text-gray-500">ID: {transaction.id.slice(0, 8)}...</p>
                                        {/* Mobile-only: Show amount */}
                                        <p className={`md:hidden text-sm font-mono font-bold mt-1 ${transaction.amount > 0 ? 'text-green-400' : 'text-white'
                                            }`}>
                                            {transaction.amount < 0
                                                ? `-₹${Math.abs(transaction.amount).toLocaleString()}`
                                                : `+₹${transaction.amount.toLocaleString()}`
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="hidden md:flex col-span-2 items-center">
                                    <span className="text-sm text-gray-400 font-medium">{transaction.date}</span>
                                </div>

                                {/* Category */}
                                <div className="hidden md:flex col-span-2 items-center">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-gray-300">
                                        {transaction.category}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="hidden md:flex col-span-2 items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${transaction.status === 'completed'
                                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                            : transaction.status === 'processing'
                                                ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                                                : 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
                                        }`}>
                                        {transaction.status}
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="hidden md:flex col-span-3 items-center justify-end">
                                    <span className={`text-lg font-mono font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-white'
                                        }`}>
                                        {transaction.amount < 0
                                            ? `-₹${Math.abs(transaction.amount).toLocaleString()}`
                                            : `+₹${transaction.amount.toLocaleString()}`
                                        }
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </GlassCard>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <GlassCard key={i} variant="default" className="p-6 border-white/5 bg-[#050A14] animate-pulse">
                            <div className="h-3 bg-white/10 rounded w-24 mb-3" />
                            <div className="h-8 bg-white/10 rounded w-32" />
                        </GlassCard>
                    ))
                ) : (
                    <>
                        <GlassCard variant="default" className="p-6 border-white/5 bg-[#050A14]">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Total Income</p>
                            <p className="text-2xl font-mono font-bold text-green-400">
                                +₹{summary?.totalIncome.toLocaleString()}
                            </p>
                        </GlassCard>
                        <GlassCard variant="default" className="p-6 border-white/5 bg-[#050A14]">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Total Expenses</p>
                            <p className="text-2xl font-mono font-bold text-red-400">
                                -₹{summary?.totalExpenses.toLocaleString()}
                            </p>
                        </GlassCard>
                        <GlassCard variant="blue" className="p-6">
                            <p className="text-xs text-blue-200/60 uppercase tracking-wider font-bold mb-2">Net Balance</p>
                            <p className="text-2xl font-mono font-bold text-white">
                                {(summary?.netBalance ?? 0) >= 0 ? '+' : '-'}₹{Math.abs(summary?.netBalance ?? 0).toLocaleString()}
                            </p>
                        </GlassCard>
                    </>
                )}
            </div>
        </div>
    );
}
