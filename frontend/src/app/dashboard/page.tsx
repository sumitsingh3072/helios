"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import {
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Activity,
    RefreshCw,
    BarChart,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    FileText,
    Shield,
    PiggyBank,
    Flame,
    Lightbulb,
    Upload
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
    const { report } = useFinancialInsightsStore();

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Calculate derived metrics
    const getTotalIncome = () => {
        if (!report) return 0;
        const netCashFlow = report.key_metrics.net_cash_flow.amount || 0;
        const outflows = report.key_metrics.burn_rate.total_outflows || 0;
        return netCashFlow + outflows;
    };

    const getSavingsRate = () => {
        if (!report) return 0;
        const ratio = report.key_metrics.burn_rate.ratio_to_income;
        if (ratio) {
            const burnPercent = parseInt(ratio.replace('%', ''));
            return 100 - burnPercent;
        }
        return 0;
    };

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

    // No report uploaded - show empty state
    if (!report) {
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

    return (
        <div className="space-y-8 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {currentDate} • <span className="text-blue-400">{report.client_profile.name}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/insights">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-full px-4 md:px-6">
                            <FileText className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">View Full Report</span>
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
                {/* Account Info */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-[30px]" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <Wallet className="w-4 h-4 text-blue-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Account</p>
                        </div>
                        <p className="text-sm font-bold text-white truncate">{report.client_profile.account_summary.account_number_mask}</p>
                        <p className="text-xs text-gray-500 mt-1">{report.client_profile.account_summary.statement_period}</p>
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
                            ₹{getTotalIncome().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                            ₹{(report.key_metrics.burn_rate.total_outflows || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </GlassCard>

                {/* Net Cash Flow */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                    <div className={cn(
                        "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-[30px]",
                        (report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? "bg-green-500/10" : "bg-red-500/10"
                    )} />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
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
                        <p className={cn(
                            "text-2xl font-bold",
                            (report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? "text-green-400" : "text-red-400"
                        )}>
                            ₹{(report.key_metrics.net_cash_flow.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Liquidity</span>
                            <span className={cn("text-xs font-bold", getHealthColor(report.financial_health_assessment.liquidity_status))}>
                                {report.financial_health_assessment.liquidity_status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Cash Flow</span>
                            <span className={cn("text-xs font-bold", getHealthColor(report.financial_health_assessment.cash_flow_status))}>
                                {report.financial_health_assessment.cash_flow_status}
                            </span>
                        </div>
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
                        "text-2xl font-bold",
                        report.financial_health_assessment.risk_level.toLowerCase() === 'low'
                            ? "text-green-400"
                            : report.financial_health_assessment.risk_level.toLowerCase() === 'moderate'
                                ? "text-yellow-400"
                                : "text-red-400"
                    )}>
                        {report.financial_health_assessment.risk_level}
                    </p>
                </GlassCard>

                {/* Savings Rate */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                            "p-2 rounded-lg border",
                            getSavingsRate() >= 20 ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"
                        )}>
                            <PiggyBank className={cn("w-4 h-4", getSavingsRate() >= 20 ? "text-green-400" : "text-yellow-400")} />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Savings Rate</p>
                    </div>
                    <p className={cn("text-2xl font-bold", getSavingsRate() >= 20 ? "text-green-400" : "text-yellow-400")}>
                        {getSavingsRate()}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{getSavingsRate() >= 20 ? 'Healthy savings' : 'Consider saving more'}</p>
                </GlassCard>

                {/* Burn Rate */}
                <GlassCard className="p-5 bg-[#050A14] border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Burn Rate</p>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">{report.key_metrics.burn_rate.ratio_to_income || '0%'}</p>
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
                        <span className="text-xs text-gray-500">{report.client_profile.account_summary.statement_period}</span>
                    </div>

                    <div className="flex-1 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-sm text-gray-400 mb-1">Net Cash Flow</p>
                            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
                                ₹{(report.key_metrics.net_cash_flow.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </h2>
                            <div className={cn(
                                "flex items-center gap-2 mt-4 w-fit px-3 py-1.5 rounded-lg",
                                (report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                            )}>
                                {(report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                <span className="text-sm font-bold">{(report.key_metrics.net_cash_flow.amount ?? 0) >= 0 ? 'Positive' : 'Negative'} Cash Flow</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-4 max-w-xs">{report.key_metrics.net_cash_flow.insight}</p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Total Income</span>
                                    <span className="text-sm text-green-400 font-bold">₹{getTotalIncome().toLocaleString('en-IN')}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 shadow-[0_0_10px_#22C55E]" style={{ width: '100%' }} />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Total Expenses</span>
                                    <span className="text-sm text-orange-400 font-bold">₹{(report.key_metrics.burn_rate.total_outflows || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 shadow-[0_0_10px_#F97316]" style={{ width: `${Math.min(100, ((report.key_metrics.burn_rate.total_outflows || 0) / getTotalIncome()) * 100)}%` }} />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">Banking Costs</span>
                                    <span className="text-sm text-red-400 font-bold">₹{(report.key_metrics.cost_of_funds.net_cost || 0).toFixed(2)}</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 shadow-[0_0_10px_#EF4444]" style={{ width: `${Math.min(100, ((report.key_metrics.cost_of_funds.net_cost || 0) / getTotalIncome()) * 100)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Strategic Recommendations */}
                <GlassCard className="p-0 flex flex-col h-full">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                        </div>
                        <h3 className="font-bold">Top Recommendations</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-3">
                        {report.strategic_recommendations.slice(0, 4).map((rec, index) => {
                            const priorityColors = {
                                high: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
                                medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
                                low: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
                            };
                            const priority = rec.priority.toLowerCase() as 'high' | 'medium' | 'low';
                            const colors = priorityColors[priority] || priorityColors.medium;

                            return (
                                <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="flex items-start gap-3">
                                        <span className={cn("text-[10px] font-bold px-2 py-1 rounded border shrink-0 mt-0.5", colors.bg, colors.border, colors.text)}>
                                            {rec.priority.toUpperCase()}
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{rec.action}</p>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{rec.rationale}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <Link href="/dashboard/insights" className="block text-center text-xs text-blue-400 hover:text-blue-300 py-2 transition-colors">
                            View all recommendations →
                        </Link>
                    </div>
                </GlassCard>
            </div>

            {/* Analysis Observations */}
            <GlassCard className="p-6 bg-[#050A14] border-white/5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">Analysis Highlights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {report.detailed_analysis.map((item, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">{item.category}</p>
                            <p className="text-sm text-gray-400">{item.observation}</p>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
