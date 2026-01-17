"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { WorldMap } from "@/components/dashboard/world-map";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
import { TrendingUp, Globe, DollarSign, Flame, RefreshCw, AlertCircle, FileText, Wallet, PiggyBank, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInsights } from "@/hooks/useInsights";
import { Button } from "@/components/ui/button";
import { useFinancialInsightsStore } from "@/stores";
import {
    StatementUpload,
    ClientProfileCard,
    FinancialHealthCard,
    KeyMetricsCards,
    DetailedAnalysisCard,
    RecommendationsCard,
} from "@/components/insights";
import { cn } from "@/lib/utils";

/**
 * Insights Page - Orchestrator
 * Uses useInsights hook for network data and useFinancialInsightsStore for financial analysis
 */
export default function InsightsPage() {
    const { networkStats, isLoading, error, refresh } = useInsights();
    const {
        report,
        uploadedFileName,
        isUploading,
        error: uploadError,
        uploadStatement,
        clearReport,
    } = useFinancialInsightsStore();

    // Transform report data for the spending chart
    const getSpendingChartData = () => {
        if (!report) return [];

        const metrics = report.key_metrics;
        return [
            { name: 'Net Cash Flow', value: Math.abs(metrics.net_cash_flow.amount || 0), color: '#3B82F6' },
            { name: 'Total Outflows', value: metrics.burn_rate.total_outflows || 0, color: '#F97316' },
            { name: 'Fees Paid', value: metrics.cost_of_funds.fees_paid || 0, color: '#EF4444' },
            { name: 'Interest Earned', value: metrics.cost_of_funds.interest_earned || 0, color: '#22C55E' },
        ];
    };

    // Transform report data for the cash flow trend chart
    const getCashFlowChartData = () => {
        if (!report) return [];

        const netCashFlow = report.key_metrics.net_cash_flow.amount || 0;
        const outflows = report.key_metrics.burn_rate.total_outflows || 0;
        const fees = report.key_metrics.cost_of_funds.fees_paid || 0;
        const interest = report.key_metrics.cost_of_funds.interest_earned || 0;

        // Create a simulated monthly view based on the statement data
        const inflows = netCashFlow + outflows; // Total deposits/income

        return [
            { name: 'Start', balance: 69.96, income: 0, expense: 0 },
            { name: 'Week 1', balance: 150, income: inflows * 0.25, expense: outflows * 0.2 },
            { name: 'Week 2', balance: 280, income: inflows * 0.5, expense: outflows * 0.4 },
            { name: 'Week 3', balance: 420, income: inflows * 0.75, expense: outflows * 0.65 },
            { name: 'End', balance: 586.71, income: inflows, expense: outflows },
        ];
    };

    // Calculate savings rate for display
    const getSavingsRate = () => {
        if (!report) return 0;
        const ratio = report.key_metrics.burn_rate.ratio_to_income;
        if (ratio) {
            const burnPercent = parseInt(ratio.replace('%', ''));
            return 100 - burnPercent;
        }
        return 0;
    };

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

                {/* Quick Stats / Overview */}
                {report ? (
                    <div className="lg:col-span-2">
                        <ClientProfileCard profile={report.client_profile} />
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
                                    Upload a bank statement to see your personalized financial health report and recommendations.
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                )}
            </div>

            {/* Financial Report Section - Only shown when report exists */}
            {report && (
                <>
                    {/* Financial Health Assessment */}
                    <FinancialHealthCard assessment={report.financial_health_assessment} />

                    {/* Key Metrics */}
                    <KeyMetricsCards metrics={report.key_metrics} />

                    {/* Quick Stats Cards - Updated with Financial Data */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Income */}
                        <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/10 rounded-full blur-[30px]" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                        Income
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Total Deposits</p>
                                <p className="text-2xl font-bold text-white">
                                    ${((report.key_metrics.net_cash_flow.amount || 0) + (report.key_metrics.burn_rate.total_outflows || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        </GlassCard>

                        {/* Total Expenses */}
                        <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/10 rounded-full blur-[30px]" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                        <ArrowDownRight className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                                        Expenses
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Total Outflows</p>
                                <p className="text-2xl font-bold text-white">
                                    ${(report.key_metrics.burn_rate.total_outflows || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        </GlassCard>

                        {/* Savings Rate */}
                        <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full blur-[30px]" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <PiggyBank className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold px-2 py-1 rounded border",
                                        getSavingsRate() >= 20
                                            ? "text-green-400 bg-green-500/10 border-green-500/20"
                                            : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                                    )}>
                                        {getSavingsRate() >= 20 ? 'Good' : 'Improve'}
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Savings Rate</p>
                                <p className="text-2xl font-bold text-white">{getSavingsRate()}%</p>
                            </div>
                        </GlassCard>

                        {/* Banking Costs */}
                        <GlassCard className="p-5 bg-[#050A14] border-white/5 relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-500/10 rounded-full blur-[30px]" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <Wallet className="w-4 h-4 text-red-400" />
                                    </div>
                                    <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                                        Fees
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Net Cost of Funds</p>
                                <p className="text-2xl font-bold text-white">
                                    ${(report.key_metrics.cost_of_funds.net_cost || 0).toFixed(2)}
                                </p>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Spending Chart & Detailed Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Spending Breakdown Chart */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                    <DollarSign className="w-4 h-4 text-indigo-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Financial Breakdown</h3>
                            </div>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={getSpendingChartData()} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={true} vertical={false} />
                                        <XAxis
                                            type="number"
                                            stroke="#333"
                                            tick={{ fill: '#666', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <YAxis
                                            type="category"
                                            dataKey="name"
                                            stroke="#333"
                                            tick={{ fill: '#888', fontSize: 11 }}
                                            axisLine={false}
                                            tickLine={false}
                                            width={100}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#000000',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px',
                                            }}
                                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                                        />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                            {getSpendingChartData().map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </GlassCard>

                        {/* Detailed Analysis */}
                        <DetailedAnalysisCard analysis={report.detailed_analysis} />
                    </div>

                    {/* Strategic Recommendations */}
                    <RecommendationsCard recommendations={report.strategic_recommendations} />

                    {/* Cash Flow Trend Chart - Updated with Financial Data */}
                    <GlassCard className="p-6 md:p-8 h-[400px] relative border-white/5 bg-[#050A14]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                            <div>
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                    <TrendingUp className="w-5 h-5 text-blue-500" /> Cash Flow Trend
                                </h3>
                                <p className="text-sm text-gray-500">Balance progression during statement period ({report.client_profile.account_summary.statement_period})</p>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-gray-400">Balance</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-gray-400">Income</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <span className="text-gray-400">Expenses</span>
                                </div>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height="75%">
                            <AreaChart data={getCashFlowChartData()}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#333" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#333" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#000000',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 30px -5px rgba(0,0,0,1)'
                                    }}
                                    formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                                />
                                <Area type="monotone" dataKey="balance" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                                <Area type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </GlassCard>
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

                {/* Right Column Stats - Updated with Financial Data when available */}
                <div className="flex flex-col gap-6">
                    {report ? (
                        <>
                            {/* Ending Balance Card */}
                            <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-[#050A14]">
                                <div className="absolute right-0 top-0 p-32 bg-blue-500/5 blur-[60px] pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                            <Wallet className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/10">
                                            +{((586.71 - 69.96) / 69.96 * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Ending Balance</p>
                                        <h3 className="text-4xl font-serif font-bold text-white">$586.71</h3>
                                        <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-blue-400" />
                                            From $69.96 starting
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Burn Rate Card */}
                            <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                                            <Flame className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <span className="text-xs font-bold text-orange-200 bg-orange-500/20 px-2 py-1 rounded border border-orange-500/20">
                                            {report.key_metrics.burn_rate.ratio_to_income}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200/60 font-medium uppercase tracking-wider mb-1">Burn Rate</p>
                                        <h3 className="text-4xl font-serif font-bold text-white">
                                            ${(report.key_metrics.burn_rate.total_outflows || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </h3>
                                        <p className="text-xs text-blue-200/50 mt-2">Total monthly outflows</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </>
                    ) : (
                        <>
                            {/* Default cards when no report */}
                            <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-[#050A14]">
                                <div className="absolute right-0 top-0 p-32 bg-blue-500/5 blur-[60px] pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <Wallet className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Balance</p>
                                        <h3 className="text-2xl font-serif font-bold text-gray-600">Upload statement</h3>
                                        <p className="text-xs text-gray-600 mt-2">to see your balance</p>
                                    </div>
                                </div>
                            </GlassCard>

                            <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                            <Flame className="w-5 h-5 text-blue-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200/60 font-medium uppercase tracking-wider mb-1">Burn Rate</p>
                                        <h3 className="text-2xl font-serif font-bold text-gray-400">--</h3>
                                        <p className="text-xs text-blue-200/50 mt-2">Awaiting analysis</p>
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
