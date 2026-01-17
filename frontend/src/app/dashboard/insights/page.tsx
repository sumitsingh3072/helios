"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { WorldMap } from "@/components/dashboard/world-map";
import { TrendingUp, Globe, RefreshCw, AlertCircle, FileText, Wallet, ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Flame, PiggyBank, User, Activity, Lightbulb, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useInsights } from "@/hooks/useInsights";
import { Button } from "@/components/ui/button";
import { useFinancialInsightsStore } from "@/stores";
import { StatementUpload } from "@/components/insights";
import { cn } from "@/lib/utils";

/**
 * Insights Page - Financial Analysis
 * Displays financial advisory report from uploaded statements
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

    // Extract data if report exists
    const clientProfile = report?.client_profile;
    const financialAnalysis = report?.financial_analysis;
    const executiveSummary = report?.executive_summary;
    const recommendations = report?.strategic_recommendations || [];

    const totalCredits = financialAnalysis?.cash_flow_dynamics?.total_credits || 0;
    const totalDebits = financialAnalysis?.cash_flow_dynamics?.total_debits || 0;
    const netCashFlow = totalCredits - totalDebits;
    const savingsRate = totalCredits > 0 ? ((netCashFlow / totalCredits) * 100) : 0;

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
                {report && clientProfile && financialAnalysis ? (
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6 bg-[#050A14] border-white/5 h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <User className="w-4 h-4 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{clientProfile.name}</h3>
                                    <p className="text-xs text-gray-500">{clientProfile.analysis_period} • Acct: {clientProfile.account_number}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Credits</p>
                                    <p className="text-xl font-bold text-green-400">${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Debits</p>
                                    <p className="text-xl font-bold text-red-400">${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Net Flow</p>
                                    <p className={cn("text-xl font-bold", netCashFlow >= 0 ? "text-blue-400" : "text-red-400")}>
                                        ${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Savings Rate</p>
                                    <p className={cn("text-xl font-bold", savingsRate >= 20 ? "text-green-400" : "text-yellow-400")}>
                                        {savingsRate.toFixed(1)}%
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
            {report && financialAnalysis && (
                <>
                    {/* Executive Summary */}
                    <GlassCard className="p-6 bg-[#050A14] border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <FileText className="w-4 h-4 text-blue-400" />
                            </div>
                            <h3 className="text-base font-bold text-white">Executive Summary</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{executiveSummary}</p>
                    </GlassCard>

                    {/* Liquidity & Balance Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <Activity className="w-4 h-4 text-blue-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Liquidity Assessment</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Status</span>
                                    <span className="text-sm font-bold text-blue-400">{financialAnalysis.liquidity_assessment.status}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Starting Balance</span>
                                    <span className="text-sm font-bold text-orange-400">
                                        ${financialAnalysis.liquidity_assessment.start_balance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Ending Balance</span>
                                    <span className="text-sm font-bold text-green-400">
                                        ${financialAnalysis.liquidity_assessment.end_balance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Balance Change</span>
                                    <span className="text-sm font-bold text-green-400">
                                        +${(financialAnalysis.liquidity_assessment.end_balance - financialAnalysis.liquidity_assessment.start_balance).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                <p className="text-xs text-gray-400">{financialAnalysis.liquidity_assessment.insight}</p>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                    <DollarSign className="w-4 h-4 text-orange-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Cost-Benefit Analysis</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Total Fees</span>
                                    <span className="text-sm font-bold text-red-400">
                                        -${financialAnalysis.cost_benefit_analysis.total_fees.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Interest (Period)</span>
                                    <span className="text-sm font-bold text-green-400">
                                        +${financialAnalysis.cost_benefit_analysis.interest_earned_period.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Interest (YTD)</span>
                                    <span className="text-sm font-bold text-green-400">
                                        +${financialAnalysis.cost_benefit_analysis.interest_earned_ytd.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <span className="text-sm text-gray-400">Net Cost</span>
                                    <span className="text-sm font-bold text-orange-400">
                                        -${(financialAnalysis.cost_benefit_analysis.total_fees - financialAnalysis.cost_benefit_analysis.interest_earned_period).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                <p className="text-xs text-gray-400">{financialAnalysis.cost_benefit_analysis.insight}</p>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Cash Flow & Recommendations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Cash Flow */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Cash Flow Summary</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Credits */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                                            <span className="text-sm text-gray-400">Total Credits</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-400">${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_#22C55E]" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                {/* Debits */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                                            <span className="text-sm text-gray-400">Total Debits</span>
                                        </div>
                                        <span className="text-lg font-bold text-red-400">${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-3 w-full bg-black/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#EF4444]"
                                            style={{ width: `${(totalDebits / totalCredits) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Net Flow */}
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <PiggyBank className={cn("w-4 h-4", netCashFlow >= 0 ? "text-blue-400" : "text-red-400")} />
                                            <span className="text-sm text-gray-400">Net Cash Flow</span>
                                        </div>
                                        <span className={cn("text-xl font-bold", netCashFlow >= 0 ? "text-blue-400" : "text-red-400")}>
                                            ${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {financialAnalysis.cash_flow_dynamics.net_flow_observation}
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Recommendations */}
                        <GlassCard className="p-6 bg-[#050A14] border-white/5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                    <Lightbulb className="w-4 h-4 text-amber-400" />
                                </div>
                                <h3 className="text-base font-bold text-white">Strategic Recommendations</h3>
                            </div>

                            <div className="space-y-4">
                                {recommendations.map((rec, index) => {
                                    const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
                                        'Cost Reduction': { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
                                        'Risk Management': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
                                        'Wealth Management': { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
                                    };
                                    const colors = categoryColors[rec.category] || { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' };

                                    return (
                                        <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={cn("text-[10px] font-bold px-2 py-1 rounded border", colors.bg, colors.border, colors.text)}>
                                                    {rec.category}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white mb-1">{rec.action}</p>
                                            <p className="text-xs text-gray-500">{rec.details}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>
                    </div>
                </>
            )}

            {/* Global Map Section */}
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
                    {report && financialAnalysis ? (
                        <>
                            <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-[#050A14]">
                                <div className="absolute right-0 top-0 p-32 bg-orange-500/5 blur-[60px] pointer-events-none" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                                            <Flame className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/10">
                                            ${financialAnalysis.cost_benefit_analysis.total_fees.toFixed(2)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Fees</p>
                                        <p className="text-xs text-orange-400 mt-2 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-orange-400" />
                                            Service charges this period
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>

                            <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                            <PiggyBank className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold px-2 py-1 rounded border",
                                            netCashFlow >= 0
                                                ? "text-green-200 bg-green-500/20 border-green-500/20"
                                                : "text-red-200 bg-red-500/20 border-red-500/20"
                                        )}>
                                            {savingsRate.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200/60 font-medium uppercase tracking-wider mb-1">Net Flow</p>
                                        <h3 className="text-3xl font-serif font-bold text-white">
                                            ${Math.abs(netCashFlow).toFixed(2)}
                                        </h3>
                                        <p className="text-xs text-blue-200/50 mt-2">
                                            {netCashFlow >= 0 ? 'Surplus this period' : 'Deficit this period'}
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
                                        <p className="text-sm text-gray-500 mb-1">Total Fees</p>
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
                                        <p className="text-sm text-blue-200/60 mb-1">Net Flow</p>
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
