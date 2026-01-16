"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { WorldMap } from "@/components/dashboard/world-map";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { TrendingUp, Globe, Zap, Server, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInsights } from "@/hooks/useInsights";
import { Button } from "@/components/ui/button";

/**
 * Insights Page - Orchestrator
 * Uses useInsights hook for data, only responsible for layout
 */
export default function InsightsPage() {
    const { networkStats, chartData, selectedPeriod, isLoading, error, setSelectedPeriod, refresh } = useInsights();

    const periods = ['1H', '1D', '1W', '1M', '1Y'];

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
                            Global Intelligence
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm max-w-lg">
                        Real-time surveillance of distributed assets and global network latency.
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
                        <span className="text-xs font-bold tracking-widest text-blue-200">LIVE FEED</span>
                    </div>
                </div>
            </div>

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

                {/* Right Column Stats */}
                <div className="flex flex-col gap-6">
                    <GlassCard variant="default" className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-[#050A14]">
                        <div className="absolute right-0 top-0 p-32 bg-blue-500/5 blur-[60px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                {isLoading ? (
                                    <div className="h-6 bg-white/10 rounded w-16 animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/10">
                                        +{networkStats?.apyChange}%
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Staking APY</p>
                                {isLoading ? (
                                    <div className="h-10 bg-white/10 rounded w-24 animate-pulse" />
                                ) : (
                                    <h3 className="text-4xl font-serif font-bold text-white">{networkStats?.stakingApy}%</h3>
                                )}
                                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-blue-400" />
                                    Optimized
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard variant="blue" className="flex-1 p-6 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                    <Server className="w-5 h-5 text-blue-400" />
                                </div>
                                {isLoading ? (
                                    <div className="h-6 bg-white/10 rounded w-16 animate-pulse" />
                                ) : (
                                    <span className="text-xs font-bold text-blue-200 bg-blue-500/20 px-2 py-1 rounded border border-blue-500/20">
                                        {networkStats?.uptime}%
                                    </span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-blue-200/60 font-medium uppercase tracking-wider mb-1">Network Latency</p>
                                {isLoading ? (
                                    <div className="h-10 bg-white/10 rounded w-20 animate-pulse" />
                                ) : (
                                    <h3 className="text-4xl font-serif font-bold text-white">{networkStats?.networkLatency}ms</h3>
                                )}
                                <p className="text-xs text-blue-200/50 mt-2">Global average ping.</p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Chart Section */}
            <GlassCard className="p-6 md:p-8 h-[400px] relative border-white/5 bg-[#050A14]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                            <TrendingUp className="w-5 h-5 text-blue-500" /> Portfolio Velocity
                        </h3>
                        <p className="text-sm text-gray-500">Cross-chain asset performance analysis.</p>
                    </div>
                    <div className="flex gap-2">
                        {periods.map((t, i) => (
                            <button
                                key={t}
                                onClick={() => setSelectedPeriod(t)}
                                className={`px-3 md:px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selectedPeriod === t
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="h-[250px] bg-white/5 rounded-xl animate-pulse" />
                ) : (
                    <ResponsiveContainer width="100%" height="75%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorUvBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPvBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="name" stroke="#333" tick={{ fill: '#444', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis stroke="#333" tick={{ fill: '#444', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dx={-10} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#000000',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    boxShadow: '0 10px 30px -5px rgba(0,0,0,1)'
                                }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area type="monotone" dataKey="uv" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorUvBlue)" />
                            <Area type="monotone" dataKey="pv" stroke="#60A5FA" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPvBlue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </GlassCard>
        </div>
    );
}
