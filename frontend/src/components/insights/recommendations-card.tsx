"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { Lightbulb, ArrowRight } from "lucide-react";
import { StrategicRecommendation } from "@/types/financialInsights";
import { cn } from "@/lib/utils";

interface RecommendationsCardProps {
    recommendations: StrategicRecommendation[];
}

/**
 * RecommendationsCard - Displays strategic recommendations
 * Follows SRP: Only responsible for displaying recommendation data
 */
export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
    const getPriorityConfig = (priority: string) => {
        const lowerPriority = priority.toLowerCase();
        if (lowerPriority === 'high') {
            return {
                bg: 'bg-red-500/10',
                border: 'border-red-500/20',
                text: 'text-red-400',
                label: 'HIGH',
            };
        }
        if (lowerPriority === 'medium') {
            return {
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/20',
                text: 'text-yellow-400',
                label: 'MEDIUM',
            };
        }
        return {
            bg: 'bg-green-500/10',
            border: 'border-green-500/20',
            text: 'text-green-400',
            label: 'LOW',
        };
    };

    return (
        <GlassCard className="p-6 bg-[#050A14] border-white/5">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white">Strategic Recommendations</h3>
            </div>

            <div className="space-y-4">
                {recommendations.map((rec, index) => {
                    const priorityConfig = getPriorityConfig(rec.priority);

                    return (
                        <div
                            key={index}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "text-[10px] font-bold px-2 py-1 rounded border",
                                        priorityConfig.bg,
                                        priorityConfig.border,
                                        priorityConfig.text
                                    )}>
                                        {priorityConfig.label}
                                    </span>
                                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {rec.action}
                                    </h4>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{rec.rationale}</p>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
}
