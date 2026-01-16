"use client";

import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import {
    ChatHeader,
    ChatMessageList,
    ChatSuggestions,
    ChatInput,
    ChatErrorBoundary,
    ChatLoadingState,
} from "@/components/chat";
import { AlertCircle, X } from "lucide-react";

/**
 * Chat Page - Orchestrator Component
 * 
 * This page follows SRP by only orchestrating child components.
 * All business logic is in the useChat hook.
 * All presentation is in individual components.
 */
export default function ChatPage() {
    const {
        messages,
        isLoading,
        isSending,
        error,
        sendMessage,
        clearError,
    } = useChat();

    const handleSuggestionClick = (prompt: string) => {
        sendMessage(prompt);
    };

    return (
        <ChatErrorBoundary>
            <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col text-white relative overflow-hidden">
                {/* Background Map */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/map1.png"
                        alt="Background Map"
                        fill
                        className="object-cover opacity-[0.15]"
                        priority
                    />
                </div>

                {/* Header */}
                <ChatHeader isOnline={!error} />

                {/* Error Banner */}
                {error && (
                    <div className="mx-3 md:mx-4 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                        <button
                            onClick={clearError}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Messages Area */}
                {isLoading ? (
                    <ChatLoadingState />
                ) : (
                    <ChatMessageList messages={messages} isSending={isSending} />
                )}

                {/* Bottom Section */}
                <div className="shrink-0 relative z-10 bg-[#030712]/90 backdrop-blur-xl border-t border-white/10">
                    {/* Suggestions */}
                    <ChatSuggestions
                        onSuggestionClick={handleSuggestionClick}
                        disabled={isSending || isLoading}
                    />

                    {/* Input */}
                    <ChatInput
                        onSendMessage={sendMessage}
                        disabled={isSending || isLoading}
                    />
                </div>
            </div>
        </ChatErrorBoundary>
    );
}
