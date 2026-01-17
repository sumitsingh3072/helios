"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { StakingCard } from "@/components/dashboard/staking-card";
import { ArrowUpRight, Wallet, Activity, Zap, Layers, RefreshCw, BarChart, AlertCircle, TrendingUp, TrendingDown, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/hooks/useDashboard";
import { useFinancialInsightsStore } from "@/stores";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Dashboard Overview Page - Orchestrator
 * Uses useDashboard hook for data and useFinancialInsightsStore for financial insights
 */
export default function DashboardPage() {
    const { stats, stakingAssets, activities, isLoading, error, refresh } = useDashboard();
    const { report } = useFinancialInsightsStore();

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Get health status color
    const getHealthColor = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('positive') || lower.includes('improving') || lower.includes('good') || lower === 'low') {
            return 'text-green-400';
        }
        if (lower.includes('negative') || lower.includes('declining') || lower === 'high') {
            return 'text-red-400';
        }
        return 'text-yellow-400';
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h2 className="text-xl font-bold mb-2">Failed to load dashboard</h2>
                <p className="text-gray-400 mb-4">{error}</p>
                <Button onClick={refresh} className="bg-blue-600 hover:bg-blue-500">
                    <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {currentDate} • <span className="text-blue-400">System Optimal</span>
                    </p>
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
                        Deposit Assets
                    </Button>
                </div>
            </div>

            {/* Financial Insights Summary - Only show if report exists */}
            {report && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Client Info */}
                    <GlassCard className="p-5 bg-[#050A14] border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Statement Analysis</p>
                        </div>
                        <p className="text-sm font-bold text-white truncate">{report.client_profile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.client_profile.account_summary.statement_period}</p>
                    </GlassCard>

                    {/* Net Cash Flow */}
                    <GlassCard className="p-5 bg-[#050A14] border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "p-2 rounded-lg border",
                                    (report.key_metrics.net_cash_flow.amount ?? 0) >= 0
                                        ? "bg-green-500/10 border-green-500/20"
                                        : "bg-red-500/10 border-red-500/20"
                                )}>
                                    {(report.key_metrics.net_cash_flow.amount ?? 0) >= 0
                                        ? <TrendingUp className="w-4 h-4 text-green-400" />
                                        : <TrendingDown className="w-4 h-4 text-red-400" />
                                    }
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Net Cash Flow</p>
                            </div>
                        </div>
                        <p className={cn(
                            "text-2xl font-bold",
                            (report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                            ${report.key_metrics.net_cash_flow.amount?.toFixed(2) || '0.00'}
                        </p>
                    </GlassCard>

                    {/* Financial Health */}
                    <GlassCard className="p-5 bg-[#050A14] border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                <Activity className="w-4 h-4 text-purple-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Financial Health</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className={cn("text-xs font-bold", getHealthColor(report.financial_health_assessment.liquidity_status))}>
                                {report.financial_health_assessment.liquidity_status}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className={cn("text-xs font-bold", getHealthColor(report.financial_health_assessment.cash_flow_status))}>
                                {report.financial_health_assessment.cash_flow_status}
                            </span>
                        </div>
                    </GlassCard>

                    {/* Risk Level */}
                    <GlassCard className="p-5 bg-[#050A14] border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={cn(
                                "p-2 rounded-lg border",
                                report.financial_health_assessment.risk_level.toLowerCase() === 'low'
                                    ? "bg-green-500/10 border-green-500/20"
                                    : report.financial_health_assessment.risk_level.toLowerCase() === 'moderate'
                                        ? "bg-yellow-500/10 border-yellow-500/20"
                                        : "bg-red-500/10 border-red-500/20"
                            )}>
                                <Shield className={cn(
                                    "w-4 h-4",
                                    report.financial_health_assessment.risk_level.toLowerCase() === 'low'
                                        ? "text-green-400"
                                        : report.financial_health_assessment.risk_level.toLowerCase() === 'moderate'
                                            ? "text-yellow-400"
                                            : "text-red-400"
                                )} />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Risk Level</p>
                        </div>
                        <p className={cn(
                            "text-lg font-bold",
                            report.financial_health_assessment.risk_level.toLowerCase() === 'low'
                                ? "text-green-400"
                                : report.financial_health_assessment.risk_level.toLowerCase() === 'moderate'
                                    ? "text-yellow-400"
                                    : "text-red-400"
                        )}>
                            {report.financial_health_assessment.risk_level}
                        </p>
                        <Link href="/dashboard/insights" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
                            View Full Report →
                        </Link>
                    </GlassCard>
                </div>
            )}

            {/* Top Row: Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    // Loading skeletons
                    [...Array(4)].map((_, i) => (
                        <GlassCard key={i} className="p-6 animate-pulse">
                            <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                            <div className="h-8 bg-white/10 rounded w-3/4 mb-2" />
                            <div className="h-20 bg-white/5 rounded" />
                        </GlassCard>
                    ))
                ) : (
                    <>
                        {stakingAssets.map((asset, i) => (
                            <StakingCard
                                key={asset.id}
                                symbol={asset.symbol}
                                name={asset.name}
                                apy={asset.apy}
                                tvl={asset.tvl}
                                chartColor={asset.chartColor}
                                data={asset.data}
                                icon={
                                    i === 0 ? <Layers className="w-5 h-5 text-blue-500" /> :
                                        i === 1 ? <Zap className="w-5 h-5 text-blue-400" /> :
                                            <RefreshCw className="w-5 h-5 text-white" />
                                }
                            />
                        ))}
                        {/* Promotional Card */}
                        <GlassCard variant="blue" className="flex flex-col justify-between p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <Activity className="w-12 h-12 text-blue-500/20" />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">New Pool</span>
                                </div>
                                <h3 className="text-xl font-bold mb-1">Liquid Staking</h3>
                                <p className="text-sm text-gray-400">Earn 12% APY on your idle assets.</p>
                            </div>
                            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white border-0 font-bold rounded-xl shadow-lg shadow-blue-600/20">
                                Start Staking <ArrowUpRight className="ml-2 w-4 h-4" />
                            </Button>
                        </GlassCard>
                    </>
                )}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Card */}
                <GlassCard variant="metallic" className="lg:col-span-2 p-0 overflow-hidden min-h-[400px] flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <BarChart className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg">Performance</h3>
                        </div>
                        <div className="flex gap-2">
                            {['1D', '1W', '1M', '1Y'].map(period => (
                                <button key={period} className="px-3 py-1 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none" />

                        {isLoading ? (
                            <>
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-white/10 rounded w-24" />
                                    <div className="h-12 bg-white/10 rounded w-48" />
                                    <div className="h-6 bg-white/10 rounded w-20" />
                                </div>
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-20 bg-white/5 rounded-xl" />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                                    <h2 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                                        ${stats?.totalBalance.toLocaleString()}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-4 text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-sm font-bold">+{stats?.balanceChange}%</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {stakingAssets.map((asset) => (
                                        <div key={asset.id} className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer group">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm text-gray-400 font-medium">{asset.name}</span>
                                                <span className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">{asset.allocation}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 shadow-[0_0_10px_#2563EB] transition-all duration-500"
                                                    style={{ width: `${asset.allocation}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </GlassCard>

                {/* Recent Activity */}
                <GlassCard className="p-0 flex flex-col h-full">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="font-bold">Recent Activity</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-2">
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-white/10 rounded w-24" />
                                            <div className="h-3 bg-white/5 rounded w-16" />
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="h-4 bg-white/10 rounded w-16 ml-auto" />
                                        <div className="h-3 bg-white/5 rounded w-12 ml-auto" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            activities.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                            <Wallet className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-200">{activity.description}</p>
                                            <p className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-mono font-bold text-white">{activity.amount}</p>
                                        <p className={`text-xs capitalize ${activity.status === 'completed' ? 'text-green-400' :
                                            activity.status === 'pending' ? 'text-yellow-400' : 'text-gray-500'
                                            }`}>
                                            {activity.status}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
