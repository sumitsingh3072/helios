"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { StakingCard } from "@/components/dashboard/staking-card";
import { ArrowUpRight, Wallet, Activity, Zap, Layers, RefreshCw, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const stakingData = [
    { name: "Mon", value: 3000 },
    { name: "Tue", value: 3500 },
    { name: "Wed", value: 3200 },
    { name: "Thu", value: 4000 },
    { name: "Fri", value: 3800 },
    { name: "Sat", value: 5000 },
    { name: "Sun", value: 5500 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Overview</h1>
                    <p className="text-gray-400 text-sm mt-1">Wednesday, October 24 • <span className="text-blue-400">System Optimal</span></p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-full px-6">Withdraw</Button>
                    <Button className="bg-white text-black hover:bg-gray-200 px-6 rounded-full font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">Deposit Assets</Button>
                </div>
            </div>

            {/* Top Row: Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StakingCard
                    symbol="ETH"
                    name="Etherium"
                    apy="4.2%"
                    tvl="$8,242"
                    chartColor="#3B82F6"
                    data={stakingData}
                    icon={<Layers className="w-5 h-5 text-blue-500" />}
                />
                <StakingCard
                    symbol="SOL"
                    name="Solana"
                    apy="7.8%"
                    tvl="$4,102"
                    chartColor="#60A5FA"
                    data={stakingData}
                    icon={<Zap className="w-5 h-5 text-blue-400" />}
                />
                <StakingCard
                    symbol="USDC"
                    name="USD Coin"
                    apy="5.1%"
                    tvl="$12,093"
                    chartColor="#FFFFFF"
                    data={stakingData}
                    icon={<RefreshCw className="w-5 h-5 text-white" />}
                />

                {/* Promotional / Action Card */}
                <GlassCard variant="blue" className="flex flex-col justify-between p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><Activity className="w-12 h-12 text-blue-500/20" /></div>
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
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Staking Large Card */}
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

                    <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                        {/* Gradients */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none" />

                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                            <h2 className="text-5xl font-mono font-bold text-white tracking-tight">$24,093.82</h2>
                            <div className="flex items-center gap-2 mt-4 text-green-400 bg-green-500/10 w-fit px-2 py-1 rounded">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm font-bold">+12.4%</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-medium">Etherium</span>
                                    <span className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">64%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-[64%] bg-blue-600 shadow-[0_0_10px_#2563EB]" />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-medium">Solana</span>
                                    <span className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">28%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-[28%] bg-blue-400" />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400 font-medium">USDC</span>
                                    <span className="text-sm text-white font-bold group-hover:text-blue-400 transition-colors">8%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                                    <div className="h-full w-[8%] bg-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Recent Activity */}
                <GlassCard className="p-0 flex flex-col h-full">
                    <div className="p-6 border-b border-white/5">
                        <h3 className="font-bold">Recent Activity</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                        <Wallet className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-200">Stake Deposit</p>
                                        <p className="text-xs text-gray-500">10 mins ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-mono font-bold text-white">+2.5 ETH</p>
                                    <p className="text-xs text-gray-500">Completed</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}

function TrendingUp({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    )
}
