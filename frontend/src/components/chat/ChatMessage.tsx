"use client";

import { ChatMessage as ChatMessageType } from "@/services/api";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface ChatMessageProps {
    message: ChatMessageType;
    isNew?: boolean;
}

/**
 * Single chat message bubble component
 * Handles both user and AI messages with appropriate styling
 * Follows SRP - only responsible for rendering a single message
 */
export function ChatMessage({ message, isNew = false }: ChatMessageProps) {
    const isUser = message.role === "user";

    // Safely format the timestamp, handling invalid dates
    const getFormattedTime = () => {
        try {
            const date = message.timestamp instanceof Date
                ? message.timestamp
                : new Date(message.timestamp);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return "Just now";
            }
            return format(date, "h:mm a");
        } catch {
            return "Just now";
        }
    };

    const formattedTime = getFormattedTime();

    return (
        <motion.div
            className={`flex gap-2 md:gap-4 group ${isUser ? "max-w-[90%] md:max-w-2xl ml-auto flex-row-reverse" : "max-w-[95%] md:max-w-3xl"
                }`}
            initial={isNew ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Avatar */}
            <div
                className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${isUser
                    ? "bg-white/5 border border-white/10"
                    : "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 shadow-lg shadow-blue-500/10"
                    }`}
            >
                {isUser ? (
                    <span className="font-bold text-white text-xs md:text-sm">SG</span>
                ) : (
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                )}
            </div>

            {/* Message Content */}
            <div className={`space-y-2 ${isUser ? "" : "flex-1"}`}>
                <div
                    className={`p-3 md:p-5 rounded-xl md:rounded-2xl text-sm md:text-base ${isUser
                        ? "rounded-tr-none bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20"
                        : "rounded-tl-none bg-gradient-to-br from-[#050A14] to-[#0a1628] border border-white/10 text-gray-200 shadow-xl backdrop-blur-sm"
                        }`}
                >
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

                    {/* Rich Content for AI messages */}
                    {!isUser && message.richContent && (
                        <div className="mt-4">
                            {message.richContent.type === "stats" && (
                                <RichStats data={message.richContent.data} />
                            )}
                            {message.richContent.type === "chart" && (
                                <RichChart data={message.richContent.data} />
                            )}
                        </div>
                    )}
                </div>

                {/* Timestamp */}
                <span
                    className={`text-[10px] text-gray-600 font-medium ${isUser ? "mr-2 text-right block" : "ml-2"
                        }`}
                >
                    {isUser ? `You • ${formattedTime}` : `Helios AI • ${formattedTime}`}
                </span>
            </div>
        </motion.div>
    );
}

// Rich content components
interface RichStatsProps {
    data: Record<string, unknown>;
}

function RichStats({ data }: RichStatsProps) {
    const { portfolioChange, topPerformer, topPerformerChange } = data as {
        portfolioChange: string;
        topPerformer: string;
        topPerformerChange: string;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="p-3 md:p-4 rounded-xl bg-green-500/5 border border-green-500/10 hover:border-green-500/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                        Portfolio Up
                    </span>
                </div>
                <p className="text-xl md:text-2xl font-mono font-bold text-white">
                    {portfolioChange}
                </p>
                <p className="text-xs text-gray-500 mt-1">This week's performance</p>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Top Performer
                    </span>
                </div>
                <p className="text-xl md:text-2xl font-mono font-bold text-white">
                    {topPerformer}
                </p>
                <p className="text-xs text-gray-500 mt-1">{topPerformerChange} this month</p>
            </div>
        </div>
    );
}

interface RichChartProps {
    data: Record<string, unknown>;
}

function RichChart({ data }: RichChartProps) {
    const { items } = data as {
        items: Array<{
            name: string;
            current: string;
            change: string;
            percentage: number;
        }>;
    };

    return (
        <div className="space-y-3 mt-4">
            {items.map((item) => (
                <div
                    key={item.name}
                    className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors"
                >
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm md:text-base">
                            {item.name}
                        </span>
                        <div className="text-right">
                            <span className="text-white font-mono font-bold text-sm md:text-base">
                                {item.current}
                            </span>
                            <span className="text-green-400 text-xs ml-2">{item.change}</span>
                        </div>
                    </div>
                    <div className="mt-2 h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_#3B82F6]"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
