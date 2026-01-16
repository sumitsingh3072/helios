"use client";

import { Sparkles } from "lucide-react";

interface ChatHeaderProps {
    isOnline?: boolean;
}

/**
 * Chat header component with AI status indicator
 * Follows SRP - only responsible for rendering the chat header
 */
export function ChatHeader({ isOnline = true }: ChatHeaderProps) {
    return (
        <div className="flex items-center justify-between py-4 px-2 relative z-10 shrink-0">
            <div>
                <div className="flex items-center gap-3">
                    
                    <div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white">
                            Helios Intelligence
                        </h1>
                        <p className="text-gray-500 text-xs md:text-sm">
                            Your AI-powered financial advisor
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-[#050A14] border border-white/10 px-3 md:px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_20px_-10px_rgba(59,130,246,0.3)]">
                    <span className="relative flex h-2 w-2">
                        {isOnline && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        )}
                        <span
                            className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? "bg-green-500" : "bg-gray-500"
                                }`}
                        />
                    </span>
                    <span
                        className={`text-xs font-bold ${isOnline ? "text-green-200" : "text-gray-400"
                            }`}
                    >
                        {isOnline ? "ONLINE" : "OFFLINE"}
                    </span>
                </div>
            </div>
        </div>
    );
}
