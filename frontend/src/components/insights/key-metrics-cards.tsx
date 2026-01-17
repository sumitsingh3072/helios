"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { TrendingUp, Flame, Coins } from "lucide-react";
import { KeyMetrics } from "@/types/financialInsights";
import { cn } from "@/lib/utils";

interface KeyMetricsCardsProps {
    metrics: KeyMetrics;
}

/**
 * KeyMetricsCards - Displays the key financial metrics from the report
 * Follows SRP: Only responsible for displaying key metrics data
 */
export function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
    const metricCards = [
        {
            title: 'Net Cash Flow',
            icon: TrendingUp,
            value: metrics.net_cash_flow.amount !== undefined
                ? `$${metrics.net_cash_flow.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                : 'N/A',
            subtitle: metrics.net_cash_flow.calculation || '',
            insight: metrics.net_cash_flow.insight,
            color: 'blue',
            isPositive: (metrics.net_cash_flow.amount ?? 0) >= 0,
        },
        {
            title: 'Burn Rate',
            icon: Flame,
            value: metrics.burn_rate.ratio_to_income || 'N/A',
            subtitle: metrics.burn_rate.total_outflows
                ? `$${metrics.burn_rate.total_outflows.toLocaleString('en-US', { minimumFractionDigits: 2 })} total outflows`
                : '',
            insight: metrics.burn_rate.insight,
            color: 'orange',
            isPositive: false,
        },
        {
            title: 'Cost of Funds',
            icon: Coins,
            value: metrics.cost_of_funds.net_cost !== undefined
                ? `$${metrics.cost_of_funds.net_cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                : 'N/A',
            subtitle: metrics.cost_of_funds.fees_paid && metrics.cost_of_funds.interest_earned
                ? `Fees: $${metrics.cost_of_funds.fees_paid} • Interest: $${metrics.cost_of_funds.interest_earned}`
                : '',
            insight: metrics.cost_of_funds.insight,
            color: 'red',
            isPositive: false,
        },
    ];

    const colorClasses: Record<string, { bg: string; border: string; icon: string; text: string }> = {
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            icon: 'text-blue-400',
            text: 'text-blue-300',
        },
        orange: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            icon: 'text-orange-400',
            text: 'text-orange-300',
        },
        red: {
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            icon: 'text-red-400',
            text: 'text-red-300',
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metricCards.map((card) => {
                const colors = colorClasses[card.color];
                const Icon = card.icon;

                return (
                    <GlassCard
                        key={card.title}
                        className={cn("p-5 bg-[#050A14] border-white/5 relative overflow-hidden")}
                    >
                        {/* Background glow */}
                        <div className={cn("absolute -right-8 -top-8 w-24 h-24 rounded-full blur-[40px] pointer-events-none", colors.bg)} />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-2 rounded-lg border", colors.bg, colors.border)}>
                                    <Icon className={cn("w-4 h-4", colors.icon)} />
                                </div>
                                {card.isPositive && (
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                        Positive
                                    </span>
                                )}
                            </div>

                            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">{card.title}</p>
                            <p className={cn("text-2xl font-bold text-white mb-1")}>{card.value}</p>

                            {card.subtitle && (
                                <p className="text-xs text-gray-500 mb-3">{card.subtitle}</p>
                            )}

                            <p className="text-xs text-gray-400 leading-relaxed">{card.insight}</p>
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    );
}
