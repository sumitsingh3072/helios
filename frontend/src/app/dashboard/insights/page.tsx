"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { WorldMap } from "@/components/dashboard/world-map";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie } from "recharts";
import { TrendingUp, Globe, RefreshCw, AlertCircle, FileText, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Calendar, Flame, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { useInsights } from "@/hooks/useInsights";
import { Button } from "@/components/ui/button";
import { useFinancialInsightsStore } from "@/stores";
import { StatementUpload } from "@/components/insights";
import { cn } from "@/lib/utils";

/**
 * Insights Page - Financial Analysis
 * Displays transaction breakdown and insights from uploaded statements
 */
export default function InsightsPage() {
    const { networkStats, isLoading, error, refresh } = useInsights();
    const {
        rawData,
        insights,
        uploadedFileName,
        isUploading,
        error: uploadError,
        uploadStatement,
        clearReport,
    } = useFinancialInsightsStore();

    // Category colors for charts
    const categoryColors = [
        '#F97316', '#3B82F6', '#8B5CF6', '#22C55E',
        '#EC4899', '#EAB308', '#06B6D4', '#EF4444'
    ];

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold mb-2">Failed to load insights</h2>
                <p className="text-gray-400 mb-4">{error}</p>
                <Button onClick={refresh} className="bg-blue-600 hover:bg-blue-500">
                    <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-white min-h-screen pb-10 overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">
                            Financial Insights
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm max-w-lg">
                        Upload your bank statement for AI-powered financial analysis and personalized recommendations.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={refresh}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-white"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                    <div className="bg-[#050A14] border border-blue-500/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-[0_0_20px_-10px_rgba(59,130,246,0.3)]">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-blue-200">AI POWERED</span>
                    </div>
                </div>
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <GlassCard className="p-6 bg-[#050A14] border-white/5 h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-400" />
                            </div>
                            <h3 className="text-base font-bold text-white">Statement Analysis</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                            Upload your bank statement to receive a comprehensive financial health report with actionable insights.
                        </p>
                        <StatementUpload
                            onUpload={uploadStatement}
                            isUploading={isUploading}
                            uploadedFileName={uploadedFileName}
                            onClear={clearReport}
                        />
                        {uploadError && (
                            <p className="text-xs text-red-400 mt-3">{uploadError}</p>
                        )}
                    </GlassCard>
                </div>

                {/* Quick Overview */}
                {rawData && insights ? (
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 bg-[#050A14] border-white/5 h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <Calendar className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{rawData.month}</h3>
                                    <p className="text-xs text-gray-500">{rawData.transactions.length} transactions • {rawData.currency}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Income</p>
                                    <p className="text-xl font-bold text-green-400">₹{insights.totalIncome.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Expenses</p>
                                    <p className="text-xl font-bold text-orange-400">₹{insights.totalExpenses.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Savings</p>
                                    <p className={cn("text-xl font-bold", insights.netCashFlow >= 0 ? "text-blue-400" : "text-red-400")}>
                                        ₹{insights.netCashFlow.toLocaleString('en-IN')}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Savings Rate</p>
                                    <p className={cn("text-xl font-bold", insights.savingsRate >= 20 ? "text-green-400" : "text-yellow-400")}>
                                        {insights.savingsRate.toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                ) : (
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 bg-[#050A14] border-white/5 h-full flex items-center justify-center min-h-[200px]">
                            <div className="text-center">
                                <div className="p-4 bg-gray-800/50 rounded-full inline-block mb-4">
                                    <FileText className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-400 mb-2">No Statement Uploaded</h3>
                                <p className="text-sm text-gray-600 max-w-sm">
                                    Upload a bank statement to see your personalized financial insights.
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                )}
            </div>

            {/* Financial Details - Only shown when data exists */}
            {rawData && insights && (
                <>
                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Category Breakdown Chart */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                    <Wallet className="w-4 h-4 text-indigo-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Spending by Category</h3>
                            </div>
                            <div className="h-[280px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={insights.categoryBreakdown} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={true} vertical={false} />
                                        <XAxis
                                            type="number"
                                            stroke="#333"
                                            tick={{ fill: '#666', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                        />
                                        <YAxis
                                            type="category"
                                            dataKey="category"
                                            stroke="#333"
                                            tick={{ fill: '#888', fontSize: 11 }}
                                            axisLine={false}
                                            tickLine={false}
                                            width={90}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#000000',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                            }}
                                            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                                        />
                                        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                                            {insights.categoryBreakdown.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </GlassCard>

                        {/* Income vs Expense Summary */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Cash Flow Summary</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Income */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-gray-400">Total Income</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-400">₹{insights.totalIncome.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_#22C55E]" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                {/* Expenses */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ArrowDownRight className="w-4 h-4 text-orange-400" />
                                            <span className="text-sm text-gray-400">Total Expenses</span>
                                        </div>
                                        <span className="text-lg font-bold text-orange-400">₹{insights.totalExpenses.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_10px_#F97316]"
                                            style={{ width: `${insights.burnRate}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Net Savings */}
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <PiggyBank className={cn("w-4 h-4", insights.netCashFlow >= 0 ? "text-blue-400" : "text-red-400")} />
                                            <span className="text-sm text-gray-400">Net Savings</span>
                                        </div>
                                        <span className={cn("text-xl font-bold", insights.netCashFlow >= 0 ? "text-blue-400" : "text-red-400")}>
                                            ₹{insights.netCashFlow.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full shadow-[0_0_10px]",
                                                insights.netCashFlow >= 0
                                                    ? "bg-gradient-to-r from-blue-600 to-blue-400"
                                                    : "bg-gradient-to-r from-red-600 to-red-400"
                                            )}
                                            style={{ width: `${Math.max(Math.abs(insights.savingsRate), 5)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {insights.savingsRate >= 20
                                            ? '✨ Great job! You saved more than 20% of your income.'
                                            : insights.savingsRate >= 10
                                                ? '👍 Good start! Try to save at least 20% of your income.'
                                                : '⚠️ Consider reducing expenses to save more.'}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Transactions & Payment Methods */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Transactions */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                    <FileText className="w-4 h-4 text-amber-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Recent Transactions</h3>
                            </div>
                            <div className="space-y-2 max-h-[350px] overflow-auto pr-2">
                                {rawData.transactions.slice(0, 10).map((txn, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center",
                                                txn.type === 'CREDIT' ? "bg-green-500/10" : "bg-orange-500/10"
                                            )}>
                                                {txn.type === 'CREDIT'
                                                    ? <ArrowUpRight className="w-4 h-4 text-green-400" />
                                                    : <ArrowDownRight className="w-4 h-4 text-orange-400" />
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{txn.merchant}</p>
                                                <p className="text-xs text-gray-500">{txn.category} • {txn.date}</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "text-sm font-mono font-bold",
                                            txn.type === 'CREDIT' ? "text-green-400" : "text-orange-400"
                                        )}>
                                            {txn.type === 'CREDIT' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Payment Methods */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                    <CreditCard className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Payment Methods</h3>
                            </div>
                            <div className="space-y-4">
                                {insights.paymentModes.map((mode, index) => {
                                    const totalAmount = insights.paymentModes.reduce((sum, m) => sum + m.amount, 0);
                                    const percentage = totalAmount > 0 ? (mode.amount / totalAmount) * 100 : 0;

                                    return (
                                        <div key={mode.mode} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-white">{mode.mode}</span>
                                                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                                                        {mode.count} txns
                                                    </span>
                                                </div>
                                                <span className="text-sm text-blue-400 font-mono font-bold">
                                                    ₹{mode.amount.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full", categoryColors[index % categoryColors.length])}
                                                    style={{ width: `${percentage}%`, backgroundColor: categoryColors[index % categoryColors.length] }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>
                    </div>
                </>
            )}

            {/* Global Map Section - Preserved from original */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                <GlassCard variant="metallic" className="lg:col-span-2 relative p-0 overflow-hidden group border-white/5 min-h-[300px]">
                    <div className="absolute inset-0 z-0 opacity-80">
                        <WorldMap />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between pointer-events-none">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-white">
                                    <Globe className="w-5 h-5 text-blue-500" /> Network Map
                                </h3>
                                {isLoading ? (
                                    <div className="h-4 bg-white/10 rounded w-32 animate-pulse" />
                                ) : (
                                    <p className="text-xs text-blue-400/80 font-mono">
                                        {networkStats?.totalNodes} NODES • {networkStats?.totalRegions} REGIONS
                                    </p>
                                )}
                            </div>
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl text-right">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Throughput</p>
                                {isLoading ? (
                                    <div className="h-8 bg-white/10 rounded w-24 mt-1 animate-pulse" />
                                ) : (
                                    <p className="text-2xl font-mono font-bold text-white">
                                        {networkStats?.totalThroughput} <span className="text-sm text-gray-500">TB/s</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                            {isLoading ? (
                                [...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-[#050A14]/80 border border-white/5 p-4 rounded-xl animate-pulse">
                                        <div className="h-3 bg-white/10 rounded w-16 mb-2" />
                                        <div className="h-1 bg-white/10 rounded mb-2" />
                                        <div className="h-3 bg-white/10 rounded w-8 ml-auto" />
                                    </div>
                                ))
                            ) : (
                                networkStats?.regions.map((region, i) => (
                                    <div key={region.id} className="bg-[#050A14]/80 border border-white/5 p-3 md:p-4 rounded-xl backdrop-blur-sm">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">{region.name}</p>
                                        <div className="h-0.5 w-full bg-gray-800 rounded-full overflow-hidden mb-2">
                                            <motion.div
                                                className="h-full bg-blue-500 shadow-[0_0_10px_#3B82F6]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${region.utilization}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                                            />
                                        </div>
                                        <p className="text-xs font-mono text-blue-300 text-right">{region.utilization}%</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </GlassCard>

                {/* Summary Stats */}
                <div className="flex flex-col gap-6">
                    {rawData && insights ? (
                        <>
                            {/* Burn Rate Card */}
                            <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-[#050A14]">
                                <div className="absolute right-0 top-0 p-32 bg-orange-500/5 blur-[60px] pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                            <Flame className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/10">
                                            {insights.burnRate.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Burn Rate</p>
                                        <h3 className="text-4xl font-serif font-bold text-white">₹{(insights.totalExpenses / 1000).toFixed(0)}k</h3>
                                        <p className="text-xs text-orange-400 mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-orange-400" />
                                            Monthly spend
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Savings Card */}
                            <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                            <PiggyBank className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-1 rounded border",
                                            insights.savingsRate >= 20
                                                ? "text-green-200 bg-green-500/20 border-green-500/20"
                                                : "text-yellow-200 bg-yellow-500/20 border-yellow-500/20"
                                        )}>
                                            {insights.savingsRate.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200/60 font-medium uppercase tracking-wider mb-1">Savings</p>
                                        <h3 className="text-4xl font-serif font-bold text-white">
                                            ₹{Math.abs(insights.netCashFlow / 1000).toFixed(0)}k
                                        </h3>
                                        <p className="text-xs text-blue-200/50 mt-2">
                                            {insights.netCashFlow >= 0 ? 'Monthly surplus' : 'Monthly deficit'}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </>
                    ) : (
                        <>
                            <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden border-white/5 bg-[#050A14]">
                                <div className="flex flex-col h-full justify-between">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 w-fit">
                                        <Flame className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Burn Rate</p>
                                        <h3 className="text-2xl font-bold text-gray-600">--</h3>
                                        <p className="text-xs text-gray-600 mt-2">Upload statement</p>
                                    </div>
                                </div>
                            </GlassCard>

                            <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden">
                                <div className="flex flex-col h-full justify-between">
                                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 w-fit">
                                        <PiggyBank className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200/60 mb-1">Savings</p>
                                        <h3 className="text-2xl font-bold text-gray-400">--</h3>
                                        <p className="text-xs text-blue-200/50 mt-2">Awaiting data</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
