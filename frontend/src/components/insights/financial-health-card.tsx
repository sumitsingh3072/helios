"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { FinancialHealthAssessment } from "@/types/financialInsights";
import { cn } from "@/lib/utils";

interface FinancialHealthCardProps {
    assessment: FinancialHealthAssessment;
}

/**
 * FinancialHealthCard - Displays financial health status indicators
 * Follows SRP: Only responsible for displaying health assessment data
 */
export function FinancialHealthCard({ assessment }: FinancialHealthCardProps) {
    const getStatusConfig = (status: string, type: 'liquidity' | 'cashflow' | 'risk') => {
        const lowerStatus = status.toLowerCase();

        if (type === 'risk') {
            if (lowerStatus === 'low') return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: Shield };
            if (lowerStatus === 'moderate') return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle };
            return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertTriangle };
        }

        if (lowerStatus.includes('positive') || lowerStatus.includes('improving') || lowerStatus.includes('good')) {
            return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: TrendingUp };
        }
        if (lowerStatus.includes('negative') || lowerStatus.includes('declining') || lowerStatus.includes('poor')) {
            return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: TrendingDown };
        }
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Activity };
    };

    const liquidityConfig = getStatusConfig(assessment.liquidity_status, 'liquidity');
    const cashFlowConfig = getStatusConfig(assessment.cash_flow_status, 'cashflow');
    const riskConfig = getStatusConfig(assessment.risk_level, 'risk');

    const metrics = [
        { label: 'Liquidity Status', value: assessment.liquidity_status, ...liquidityConfig },
        { label: 'Cash Flow', value: assessment.cash_flow_status, ...cashFlowConfig },
        { label: 'Risk Level', value: assessment.risk_level, ...riskConfig },
    ];

    return (
        <GlassCard className="p-6 bg-[#050A14] border-white/5">
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <Activity className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="text-base font-bold text-white">Financial Health</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div
                            key={metric.label}
                            className={cn(
                                "p-4 rounded-xl border",
                                metric.bg,
                                metric.border
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Icon className={cn("w-4 h-4", metric.color)} />
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{metric.label}</p>
                            </div>
                            <p className={cn("text-lg font-bold", metric.color)}>{metric.value}</p>
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
}
