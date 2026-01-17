"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import {
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Activity,
    BarChart,
    TrendingUp,
    TrendingDown,
    FileText,
    Shield,
    PiggyBank,
    Flame,
    Lightbulb,
    Upload,
    CreditCard,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialInsightsStore } from "@/stores";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Dashboard Overview Page - Financial Insights Focused
 * Uses useFinancialInsightsStore for all financial data from uploaded statements
 */
export default function DashboardPage() {
    const { rawData, insights } = useFinancialInsightsStore();

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // No data uploaded - show empty state
    if (!rawData || !insights) {
        return (
            <div className="space-y-8 text-white min-h-screen pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                        <p className="text-gray-400 text-sm mt-1">{currentDate}</p>
                    </div>
                </div>

                {/* Empty State */}
                <GlassCard className="p-12 bg-[#050A14] border-white/5 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                        <FileText className="w-12 h-12 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">No Financial Data Available</h2>
                    <p className="text-gray-500 text-center max-w-md mb-6">
                        Upload your bank statement to see your personalized financial dashboard with insights, spending analysis, and recommendations.
                    </p>
                    <Link href="/dashboard/insights">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 py-3 font-bold shadow-lg shadow-blue-600/20">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Statement
                        </Button>
                    </Link>
                </GlassCard>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <GlassCard className="p-6 bg-[#050A14] border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer group">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl w-fit mb-4">
                            <BarChart className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Financial Analysis</h3>
                        <p className="text-sm text-gray-500">Get AI-powered insights from your bank statement</p>
                    </GlassCard>

                    <GlassCard className="p-6 bg-[#050A14] border-white/5 hover:border-purple-500/30 transition-colors cursor-pointer group">
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl w-fit mb-4">
                            <Activity className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Health Assessment</h3>
                        <p className="text-sm text-gray-500">Understand your financial health status</p>
                    </GlassCard>

                    <GlassCard className="p-6 bg-[#050A14] border-white/5 hover:border-green-500/30 transition-colors cursor-pointer group">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl w-fit mb-4">
                            <Lightbulb className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Smart Recommendations</h3>
                        <p className="text-sm text-gray-500">Get personalized financial advice</p>
                    </GlassCard>
                </div>
            </div>
        );
    }

    // Determine financial health status based on savings rate
    const getHealthStatus = () => {
        if (insights.savingsRate >= 20) return { status: 'Healthy', color: 'text-green-400' };
        if (insights.savingsRate >= 10) return { status: 'Moderate', color: 'text-yellow-400' };
        return { status: 'Needs Attention', color: 'text-red-400' };
    };

    const getRiskLevel = () => {
        if (insights.savingsRate >= 20) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' };
        if (insights.savingsRate >= 10) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' };
        return { level: 'High', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/20' };
    };

    const healthStatus = getHealthStatus();
    const riskLevel = getRiskLevel();

    return (
        <div className="space-y-8 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {currentDate} • <span className="text-blue-400">{rawData.month}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/insights">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-full px-4 md:px-6">
                            <FileText className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">View Details</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard/insights">
                        <Button className="bg-white text-black hover:bg-gray-200 px-4 md:px-6 rounded-full font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                            <Upload className="w-4 h-4 mr-2" />
                            New Statement
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Account Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* User & Month Info */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-[30px]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <Calendar className="w-4 h-4 text-blue-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Statement Period</p>
                        </div>
                        <p className="text-lg font-bold text-white">{rawData.month}</p>
                        <p className="text-xs text-gray-500 mt-1">{rawData.transactions.length} transactions • {rawData.currency}</p>
                    </div>
                </GlassCard>

                {/* Total Income */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/10 rounded-full blur-[30px]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <ArrowUpRight className="w-4 h-4 text-green-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Income</p>
                        </div>
                        <p className="text-2xl font-bold text-green-400">
                            ₹{insights.totalIncome.toLocaleString('en-IN')}
                        </p>
                    </div>
                </GlassCard>

                {/* Total Expenses */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/10 rounded-full blur-[30px]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                <ArrowDownRight className="w-4 h-4 text-orange-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Expenses</p>
                        </div>
                        <p className="text-2xl font-bold text-orange-400">
                            ₹{insights.totalExpenses.toLocaleString('en-IN')}
                        </p>
                    </div>
                </GlassCard>

                {/* Net Cash Flow */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className={cn(
                        "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-[30px]",
                        insights.netCashFlow >= 0 ? "bg-green-500/10" : "bg-red-500/10"
                    )} />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={cn(
                                "p-2 rounded-lg border",
                                insights.netCashFlow >= 0
                                    ? "bg-green-500/10 border-green-500/20"
                                    : "bg-red-500/10 border-red-500/20"
                            )}>
                                {insights.netCashFlow >= 0
                                    ? <TrendingUp className="w-4 h-4 text-green-400" />
                                    : <TrendingDown className="w-4 h-4 text-red-400" />
                                }
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Net Cash Flow</p>
                        </div>
                        <p className={cn(
                            "text-2xl font-bold",
                            insights.netCashFlow >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                            ₹{insights.netCashFlow.toLocaleString('en-IN')}
                        </p>
                    </div>
                </GlassCard>
            </div>

            {/* Financial Health & Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Financial Health */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                            <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Financial Health</p>
                    </div>
                    <p className={cn("text-xl font-bold", healthStatus.color)}>{healthStatus.status}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {insights.netCashFlow >= 0 ? 'Positive cash flow' : 'Negative cash flow'}
                    </p>
                </GlassCard>

                {/* Risk Level */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={cn("p-2 rounded-lg border", riskLevel.bgColor, riskLevel.borderColor)}>
                            <Shield className={cn("w-4 h-4", riskLevel.color)} />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Risk Level</p>
                    </div>
                    <p className={cn("text-2xl font-bold", riskLevel.color)}>{riskLevel.level}</p>
                </GlassCard>

                {/* Savings Rate */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                            "p-2 rounded-lg border",
                            insights.savingsRate >= 20 ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"
                        )}>
                            <PiggyBank className={cn("w-4 h-4", insights.savingsRate >= 20 ? "text-green-400" : "text-yellow-400")} />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Savings Rate</p>
                    </div>
                    <p className={cn("text-2xl font-bold", insights.savingsRate >= 20 ? "text-green-400" : "text-yellow-400")}>
                        {insights.savingsRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{insights.savingsRate >= 20 ? 'Healthy savings' : 'Try saving more'}</p>
                </GlassCard>

                {/* Burn Rate */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Burn Rate</p>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">{insights.burnRate.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500 mt-1">of income spent</p>
                </GlassCard>
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Overview Card */}
                <GlassCard variant="metallic" className="lg:col-span-2 p-0 overflow-hidden min-h-[400px] flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <BarChart className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-bold text-lg">Financial Summary</h3>
                        </div>
                        <span className="text-xs text-gray-500">{rawData.month}</span>
                    </div>

                    <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-sm text-gray-400 mb-1">Net Savings</p>
                            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                                ₹{insights.netCashFlow.toLocaleString('en-IN')}
                            </h2>
                            <div className={cn(
                                "flex items-center gap-2 mt-4 w-fit px-3 py-1.5 rounded-lg",
                                insights.netCashFlow >= 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                            )}>
                                {insights.netCashFlow >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                <span className="text-sm font-bold">{insights.netCashFlow >= 0 ? 'Surplus' : 'Deficit'} this month</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-4 max-w-xs">
                                You spent {insights.burnRate.toFixed(0)}% of your income. {insights.savingsRate >= 20 ? 'Great job on saving!' : 'Consider reducing expenses.'}
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Total Income</span>
                                    <span className="text-sm text-green-400 font-bold">₹{insights.totalIncome.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 shadow-[0_0_10px_#22C55E]" style={{ width: '100%' }} />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Total Expenses</span>
                                    <span className="text-sm text-orange-400 font-bold">₹{insights.totalExpenses.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 shadow-[0_0_10px_#F97316]" style={{ width: `${insights.burnRate}%` }} />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Savings</span>
                                    <span className={cn("text-sm font-bold", insights.netCashFlow >= 0 ? "text-blue-400" : "text-red-400")}>
                                        ₹{Math.abs(insights.netCashFlow).toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className={cn(
                                        "h-full shadow-[0_0_10px]",
                                        insights.netCashFlow >= 0 ? "bg-blue-500" : "bg-red-500"
                                    )} style={{ width: `${Math.max(insights.savingsRate, 5)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Category Breakdown */}
                <GlassCard className="p-0 flex flex-col h-full">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                            <Wallet className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h3 className="font-bold">Spending by Category</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-3">
                        {insights.categoryBreakdown.map((cat, index) => {
                            const colors = [
                                'bg-orange-500', 'bg-blue-500', 'bg-purple-500',
                                'bg-green-500', 'bg-pink-500', 'bg-yellow-500',
                                'bg-cyan-500', 'bg-red-500'
                            ];
                            const color = colors[index % colors.length];

                            return (
                                <div key={cat.category} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-white">{cat.category}</span>
                                        <span className="text-sm text-gray-400 font-mono">₹{cat.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-black/50 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full", color)} style={{ width: `${cat.percentage}%` }} />
                                        </div>
                                        <span className="text-xs text-gray-500 w-10 text-right">{cat.percentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
            </div>

            {/* Recent Transactions & Payment Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Merchants */}
                <GlassCard className="p-6 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Top Spending Merchants</h3>
                    </div>
                    <div className="space-y-3">
                        {insights.topMerchants.filter(m => m.amount > 0).map((merchant, index) => (
                            <div key={merchant.merchant} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-400">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-white">{merchant.merchant}</span>
                                </div>
                                <span className="text-sm text-orange-400 font-mono font-bold">₹{merchant.amount.toLocaleString('en-IN')}</span>
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
                        <h3 className="text-base font-bold text-white">Payment Methods Used</h3>
                    </div>
                    <div className="space-y-3">
                        {insights.paymentModes.map((mode) => (
                            <div key={mode.mode} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-white">{mode.mode}</span>
                                    <span className="text-xs text-gray-500">({mode.count} txns)</span>
                                </div>
                                <span className="text-sm text-blue-400 font-mono font-bold">₹{mode.amount.toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
