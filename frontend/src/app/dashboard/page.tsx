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
    PiggyBank,
    Flame,
    Lightbulb,
    Upload,
    DollarSign,
    Calendar,
    User,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinancialInsightsStore } from "@/stores";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Dashboard Overview Page - Financial Insights with Premium UI
 * Features glassmorphism, metallic effects, and micro-animations
 */
export default function DashboardPage() {
    const { report } = useFinancialInsightsStore();

    // Get current date formatted
    const currentDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            transition: { duration: 3, repeat: Infinity }
        }
    };

    // No report - show empty state
    if (!report) {
        return (
            <motion.div
                className="space-y-8 text-white min-h-screen pb-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                        <p className="text-gray-400 text-sm mt-1">{currentDate}</p>
                    </div>
                </motion.div>

                {/* Empty State */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-12 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
                        {/* Animated Background Glow */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"
                            variants={pulseVariants}
                            animate="animate"
                        />
                        <motion.div
                            className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-[80px]"
                            animate={{
                                x: [0, 30, 0],
                                y: [0, -20, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <motion.div
                            className="relative z-10 p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <FileText className="w-12 h-12 text-blue-400" />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-white mb-3 relative z-10">No Financial Data Available</h2>
                        <p className="text-gray-500 text-center max-w-md mb-6 relative z-10">
                            Upload your bank statement to see your personalized financial dashboard with insights and recommendations.
                        </p>

                        <Link href="/dashboard/insights">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full px-8 py-3 font-bold shadow-lg shadow-blue-600/30 border border-blue-400/20">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Statement
                                </Button>
                            </motion.div>
                        </Link>
                    </GlassCard>
                </motion.div>

                {/* Quick Action Cards */}
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: BarChart, title: "Financial Analysis", desc: "Get AI-powered insights from your bank statement", color: "blue" },
                        { icon: Activity, title: "Health Assessment", desc: "Understand your financial health status", color: "purple" },
                        { icon: Lightbulb, title: "Smart Recommendations", desc: "Get personalized financial advice", color: "green" }
                    ].map((item, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <GlassCard className={cn(
                                "p-6 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5",
                                `hover:border-${item.color}-500/30 transition-all duration-500 cursor-pointer group relative overflow-hidden`
                            )}>
                                <motion.div
                                    className={`absolute -right-10 -top-10 w-32 h-32 bg-${item.color}-500/10 rounded-full blur-[50px] group-hover:bg-${item.color}-500/20 transition-all duration-500`}
                                />
                                <div className={`relative z-10 p-3 bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                                </div>
                                <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-${item.color}-400 transition-colors duration-300`}>{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        );
    }

    // Extract values from report
    const { client_profile, detailed_analysis, executive_summary, strategic_recommendations } = report;
    const { liquidity_assessment, cash_flow_dynamics, cost_benefit_analysis } = detailed_analysis;

    const totalCredits = cash_flow_dynamics.total_credits;
    const totalDebits = cash_flow_dynamics.total_debits;
    const netCashFlow = totalCredits - totalDebits;
    const savingsRate = totalCredits > 0 ? ((netCashFlow / totalCredits) * 100) : 0;
    const burnRate = totalCredits > 0 ? ((totalDebits / totalCredits) * 100) : 0;
    const balanceChange = liquidity_assessment.end_balance - liquidity_assessment.start_balance;
    const growthPercent = ((liquidity_assessment.end_balance / liquidity_assessment.start_balance - 1) * 100);

    // Get liquidity status styling
    const getLiquidityStyle = () => {
        const status = liquidity_assessment.status.toLowerCase();
        if (status.includes('positive') || status.includes('healthy') || status.includes('strong')) {
            return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', glow: 'shadow-green-500/20' };
        }
        if (status.includes('recovering') || status.includes('improving')) {
            return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/20' };
        }
        if (status.includes('critical') || status.includes('low') || status.includes('negative')) {
            return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', glow: 'shadow-red-500/20' };
        }
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', glow: 'shadow-yellow-500/20' };
    };

    const liquidityStyle = getLiquidityStyle();

    return (
        <motion.div
            className="space-y-8 text-white min-h-screen pb-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                        <motion.div
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-400">LIVE</span>
                        </motion.div>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                        {currentDate} • <span className="text-blue-400">{client_profile.name}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/insights">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-gray-300 font-medium rounded-full px-4 md:px-6">
                                <FileText className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">View Details</span>
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="/dashboard/insights">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white px-4 md:px-6 rounded-full font-bold shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                                <Upload className="w-4 h-4 mr-2" />
                                New Statement
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>

            {/* Account Summary Row */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Client Info */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
                        <motion.div
                            className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-[40px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 rounded-lg backdrop-blur-sm"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <User className="w-4 h-4 text-blue-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Account Holder</p>
                            </div>
                            <p className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">{client_profile.name}</p>
                            <p className="text-xs text-gray-500 mt-1 font-mono">Acct: {client_profile.account_number}</p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Period */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-500">
                        <motion.div
                            className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-[40px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 rounded-lg backdrop-blur-sm"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <Calendar className="w-4 h-4 text-purple-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Analysis Period</p>
                            </div>
                            <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">{client_profile.analysis_period}</p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Starting Balance */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-500">
                        <motion.div
                            className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/20 rounded-full blur-[40px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 rounded-lg backdrop-blur-sm"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <Wallet className="w-4 h-4 text-orange-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Starting Balance</p>
                            </div>
                            <p className="text-2xl font-bold text-orange-400 font-mono">
                                ${liquidity_assessment.start_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Ending Balance */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-green-500/20 transition-all duration-500">
                        <motion.div
                            className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/20 rounded-full blur-[40px]"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 rounded-lg backdrop-blur-sm"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <Wallet className="w-4 h-4 text-green-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Ending Balance</p>
                            </div>
                            <p className="text-2xl font-bold text-green-400 font-mono">
                                ${liquidity_assessment.end_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>

            {/* Cash Flow & Metrics Row */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Credits */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/20 rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Credits</p>
                            </div>
                            <motion.p
                                className="text-2xl font-bold text-green-400 font-mono"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                ${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </motion.p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Total Debits */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Debits</p>
                            </div>
                            <motion.p
                                className="text-2xl font-bold text-red-400 font-mono"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                ${totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </motion.p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Total Fees */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Flame className="w-4 h-4 text-orange-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Fees</p>
                            </div>
                            <motion.p
                                className="text-2xl font-bold text-orange-400 font-mono"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                ${cost_benefit_analysis.total_fees.toFixed(2)}
                            </motion.p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Interest Earned */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <DollarSign className="w-4 h-4 text-blue-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Interest (YTD)</p>
                            </div>
                            <motion.p
                                className="text-2xl font-bold text-blue-400 font-mono"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                ${cost_benefit_analysis.interest_earned_ytd.toFixed(2)}
                            </motion.p>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>

            {/* Financial Health Row */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Liquidity Status */}
                <motion.div variants={cardVariants}>
                    <GlassCard className={cn(
                        "p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden",
                        `hover:${liquidityStyle.border} transition-all duration-500`
                    )}>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className={cn("p-2 rounded-lg border backdrop-blur-sm", liquidityStyle.bg, liquidityStyle.border)}
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Activity className={cn("w-4 h-4", liquidityStyle.color)} />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Liquidity Status</p>
                            </div>
                            <p className={cn("text-xl font-bold", liquidityStyle.color)}>{liquidity_assessment.status}</p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Net Cash Flow */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className={cn(
                                        "p-2 rounded-lg border backdrop-blur-sm",
                                        netCashFlow >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                                    )}
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {netCashFlow >= 0 ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Net Cash Flow</p>
                            </div>
                            <p className={cn("text-2xl font-bold font-mono", netCashFlow >= 0 ? "text-green-400" : "text-red-400")}>
                                ${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Savings Rate */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className={cn(
                                        "p-2 rounded-lg border backdrop-blur-sm",
                                        savingsRate >= 20 ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"
                                    )}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <PiggyBank className={cn("w-4 h-4", savingsRate >= 20 ? "text-green-400" : "text-yellow-400")} />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Savings Rate</p>
                            </div>
                            <p className={cn("text-2xl font-bold font-mono", savingsRate >= 20 ? "text-green-400" : "text-yellow-400")}>
                                {savingsRate.toFixed(1)}%
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Burn Rate */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-5 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-500">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <motion.div
                                    className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg backdrop-blur-sm"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Flame className="w-4 h-4 text-orange-400" />
                                </motion.div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Burn Rate</p>
                            </div>
                            <p className="text-2xl font-bold text-orange-400 font-mono">{burnRate.toFixed(1)}%</p>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>

            {/* Main Section */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Executive Summary Card - Metallic */}
                <motion.div variants={cardVariants} className="lg:col-span-2">
                    <GlassCard variant="metallic" className="p-0 overflow-hidden relative">
                        {/* Metallic Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />

                        <div className="p-6 border-b border-white/5 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-500/20"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <BarChart className="w-5 h-5 text-blue-500" />
                                </motion.div>
                                <h3 className="font-bold text-lg">Executive Summary</h3>
                            </div>
                            <motion.div
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] font-bold text-blue-400">AI GENERATED</span>
                            </motion.div>
                        </div>

                        <div className="p-6 md:p-8 relative z-10">
                            {/* Ambient Glow */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            />

                            <p className="text-gray-300 leading-relaxed mb-6 relative z-10">{executive_summary}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                                <motion.div
                                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(34, 197, 94, 0.3)' }}
                                >
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Balance Change</p>
                                    <p className="text-2xl font-bold text-green-400 font-mono">
                                        +${balanceChange.toFixed(2)}
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                                >
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Growth</p>
                                    <p className="text-2xl font-bold text-blue-400 font-mono">
                                        +{growthPercent.toFixed(0)}%
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                                >
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">Net Cost</p>
                                    <p className="text-2xl font-bold text-orange-400 font-mono">
                                        -${(cost_benefit_analysis.total_fees - cost_benefit_analysis.interest_earned_period).toFixed(2)}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Strategic Recommendations */}
                <motion.div variants={cardVariants}>
                    <GlassCard className="p-0 flex flex-col h-full bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <motion.div
                                className="p-2 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 rounded-lg"
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Lightbulb className="w-4 h-4 text-amber-400" />
                            </motion.div>
                            <h3 className="font-bold">Recommendations</h3>
                        </div>
                        <div className="flex-1 overflow-auto p-4 space-y-3">
                            {strategic_recommendations.map((rec, index) => {
                                const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
                                    'Cost Reduction': { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
                                    'Risk Management': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
                                    'Wealth Management': { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
                                };
                                const colors = categoryColors[rec.category] || { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' };

                                return (
                                    <motion.div
                                        key={index}
                                        className="p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className={cn("text-[10px] font-bold px-2 py-1 rounded border shrink-0", colors.bg, colors.border, colors.text)}>
                                                {rec.category}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{rec.action}</p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">{rec.details}</p>
                                    </motion.div>
                                );
                            })}

                            <Link href="/dashboard/insights" className="block text-center text-xs text-blue-400 hover:text-blue-300 py-2 transition-colors">
                                View full analysis →
                            </Link>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>

            {/* Analysis Insights Row */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Activity, title: "Liquidity Insight", text: liquidity_assessment.insight, color: "blue" },
                    { icon: TrendingUp, title: "Cash Flow Insight", text: cash_flow_dynamics.net_flow_observation, color: "green" },
                    { icon: DollarSign, title: "Cost Insight", text: cost_benefit_analysis.insight, color: "orange" }
                ].map((item, i) => (
                    <motion.div key={i} variants={cardVariants}>
                        <GlassCard className="p-6 bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border-white/5 h-full relative overflow-hidden group hover:border-white/10 transition-all duration-500">
                            <motion.div
                                className={`absolute -right-10 -top-10 w-32 h-32 bg-${item.color}-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <motion.div
                                    className={`p-2 bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-lg backdrop-blur-sm`}
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                >
                                    <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                                </motion.div>
                                <h3 className="text-base font-bold text-white">{item.title}</h3>
                            </div>
                            <p className="text-sm text-gray-400 relative z-10">{item.text}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
