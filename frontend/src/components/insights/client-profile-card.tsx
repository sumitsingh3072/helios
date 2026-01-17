"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { User, Wallet, Calendar } from "lucide-react";
import { ClientProfile } from "@/types/financialInsights";

interface ClientProfileCardProps {
    profile: ClientProfile;
}

/**
 * ClientProfileCard - Displays client information from the advisory report
 * Follows SRP: Only responsible for displaying client profile data
 */
export function ClientProfileCard({ profile }: ClientProfileCardProps) {
    return (
        <GlassCard className="p-6 bg-[#050A14] border-white/5">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl shrink-0">
                    <User className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{profile.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">{profile.address}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                        <div className="flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-gray-500" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Account</p>
                                <p className="text-sm font-mono text-gray-300">{profile.account_summary.account_number_mask}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">$</span>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Currency</p>
                                <p className="text-sm font-medium text-gray-300">{profile.account_summary.currency}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Period</p>
                                <p className="text-sm font-medium text-gray-300">{profile.account_summary.statement_period}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
