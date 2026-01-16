"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api, ChatMessage } from "@/services/api";

interface UseChatReturn {
    messages: ChatMessage[];
    isLoading: boolean;
    isSending: boolean;
    error: string | null;
    sendMessage: (content: string) => Promise<void>;
    clearError: () => void;
    refreshMessages: () => Promise<void>;
}

/**
 * Custom hook for chat functionality
 * Handles message fetching, sending, and state management
 * Follows SRP - only responsible for chat data operations
 */
export function useChat(): UseChatReturn {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    // Fetch initial messages
    const fetchMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await api.chat.getMessages();
            setMessages(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load messages";
            setError(errorMessage);
            console.error("Failed to fetch chat messages:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch on mount
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchMessages();
        }
    }, [fetchMessages]);

    // Send a new message
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isSending) return;

        try {
            setIsSending(true);
            setError(null);

            // Optimistic update - add user message immediately
            const tempUserMessage: ChatMessage = {
                id: `temp-user-${Date.now()}`,
                role: "user",
                content: content.trim(),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, tempUserMessage]);

            // Send to API and get response
            const { userMessage, aiResponse } = await api.chat.sendMessage(content);

            // Replace temp message with real one and add AI response
            setMessages((prev) => [
                ...prev.filter((m) => m.id !== tempUserMessage.id),
                userMessage,
                aiResponse,
            ]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to send message";
            setError(errorMessage);
            // Remove the optimistic message on error
            setMessages((prev) => prev.filter((m) => !m.id.startsWith("temp-")));
            console.error("Failed to send message:", err);
        } finally {
            setIsSending(false);
        }
    }, [isSending]);

    // Clear error state
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Refresh messages (for manual refresh)
    const refreshMessages = useCallback(async () => {
        await fetchMessages();
    }, [fetchMessages]);

    return {
        messages,
        isLoading,
        isSending,
        error,
        sendMessage,
        clearError,
        refreshMessages,
    };
}
