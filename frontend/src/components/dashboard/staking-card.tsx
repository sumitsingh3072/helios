"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import { GlassCard } from "./glass-card";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface StakingCardProps {
    symbol: string;
    name: string;
    apy: string;
    tvl: string;
    chartColor: string;
    data: any[];
    icon: React.ReactNode;
}

export function StakingCard({ symbol, name, apy, tvl, chartColor, data, icon }: StakingCardProps) {
    return (
        <GlassCard className="flex flex-col justify-between p-6 min-h-[220px] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        {icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Proof of Stake</h4>
                        <p className="text-gray-400 text-xs">{name} ({symbol})</p>
                    </div>
                </div>
                <div className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-white">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

            <div className="space-y-1 relative z-20">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Reward Rate</p>
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{apy}%</h3>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Active</span>
                </div>
            </div>

            {/* Background Chart */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2}
                            fill={`url(#gradient-${symbol})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="absolute bottom-4 right-4 text-xs font-mono text-white/50 z-20">
                +{tvl}
            </div>
        </GlassCard>
    );
}
