"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { FileSearch, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import { DetailedAnalysis } from "@/types/financialInsights";
import { cn } from "@/lib/utils";

interface DetailedAnalysisCardProps {
    analysis: DetailedAnalysis[];
}

/**
 * DetailedAnalysisCard - Displays detailed observations from the report
 * Follows SRP: Only responsible for displaying analysis observations
 */
export function DetailedAnalysisCard({ analysis }: DetailedAnalysisCardProps) {
    const getCategoryIcon = (category: string) => {
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('volatility') || lowerCategory.includes('balance')) return AlertCircle;
        if (lowerCategory.includes('fee') || lowerCategory.includes('cost')) return DollarSign;
        if (lowerCategory.includes('income') || lowerCategory.includes('stability')) return TrendingUp;
        return FileSearch;
    };

    const getCategoryColor = (category: string) => {
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('volatility') || lowerCategory.includes('risk')) return 'yellow';
        if (lowerCategory.includes('fee') || lowerCategory.includes('cost')) return 'red';
        if (lowerCategory.includes('income') || lowerCategory.includes('stability')) return 'green';
        return 'blue';
    };

    const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
        yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'text-yellow-400' },
        red: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400' },
        green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400' },
    };

    return (
        <GlassCard className="p-6 bg-[#050A14] border-white/5">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <FileSearch className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-white">Detailed Analysis</h3>
            </div>

            <div className="space-y-4">
                {analysis.map((item, index) => {
                    const Icon = getCategoryIcon(item.category);
                    const color = getCategoryColor(item.category);
                    const colors = colorClasses[color];

                    return (
                        <div
                            key={index}
                            className={cn(
                                "p-4 rounded-xl border transition-all hover:scale-[1.01]",
                                colors.bg,
                                colors.border
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn("p-2 rounded-lg shrink-0", colors.bg)}>
                                    <Icon className={cn("w-4 h-4", colors.icon)} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">{item.category}</h4>
                                    <p className="text-xs text-gray-400 leading-relaxed">{item.observation}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
}
