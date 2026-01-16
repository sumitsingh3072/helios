"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Paperclip } from "lucide-react";
import { useState, FormEvent, KeyboardEvent } from "react";

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

/**
 * Chat input field with send/mic/attach buttons
 * Follows SRP - only responsible for capturing and submitting user input
 */
export function ChatInput({
    onSendMessage,
    disabled = false,
    placeholder = "Ask Helios anything about your finances...",
}: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e?: FormEvent) => {
        e?.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-2 sm:p-3 md:p-4 pb-safe">
            <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full bg-[#0a1628] border-white/10 h-11 sm:h-12 md:h-14 pl-3 sm:pl-4 md:pl-6 pr-12 sm:pr-14 md:pr-36 rounded-xl sm:rounded-2xl text-white text-sm md:text-base placeholder:text-gray-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/30 disabled:opacity-50"
                />
                <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 sm:gap-1">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="hidden md:flex text-gray-500 hover:text-white hover:bg-white/5 h-8 w-8 md:h-10 md:w-10 transition-colors rounded-xl"
                        disabled={disabled}
                    >
                        <Mic className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="hidden md:flex text-gray-500 hover:text-white hover:bg-white/5 h-8 w-8 md:h-10 md:w-10 transition-colors rounded-xl"
                        disabled={disabled}
                    >
                        <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                    <Button
                        type="submit"
                        size="icon"
                        disabled={disabled || !message.trim()}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg sm:rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                </div>
            </form>
            <div className="text-center mt-1.5 sm:mt-2 md:mt-3">
                <p className="text-[9px] sm:text-[10px] text-gray-600">
                    Helios AI can make mistakes. Please verify important financial decisions.
                </p>
            </div>
        </div>
    );
}
