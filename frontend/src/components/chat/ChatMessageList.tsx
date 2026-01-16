"use client";

import { ChatMessage as ChatMessageType } from "@/services/api";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface ChatMessageListProps {
    messages: ChatMessageType[];
    isSending: boolean;
}

/**
 * Scrollable container for chat messages
 * Auto-scrolls to bottom when new messages arrive
 * Follows SRP - only responsible for rendering the message list
 */
export function ChatMessageList({ messages, isSending }: ChatMessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastMessageCount = useRef(messages.length);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messages.length > lastMessageCount.current && containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
        lastMessageCount.current = messages.length;
    }, [messages.length]);

    return (
        <div
            ref={containerRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-8 relative z-10"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
            {/* Time Divider */}
            <div className="flex justify-center">
                <span className="text-[10px] text-gray-600 font-medium uppercase tracking-widest bg-black/50 px-4 py-1.5 rounded-full border border-white/10">
                    Today
                </span>
            </div>

            {/* Messages */}
            {messages.map((message, index) => (
                <ChatMessage
                    key={message.id}
                    message={message}
                    isNew={index >= messages.length - 2}
                />
            ))}

            {/* Typing indicator when AI is responding */}
            {isSending && (
                <div className="flex gap-3 md:gap-4 max-w-3xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10">
                        <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-blue-400 animate-spin" />
                    </div>
                    <div className="p-4 md:p-5 rounded-2xl rounded-tl-none bg-gradient-to-br from-[#050A14] to-[#0a1628] border border-white/10">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Helios is thinking</span>
                            <span className="flex gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
