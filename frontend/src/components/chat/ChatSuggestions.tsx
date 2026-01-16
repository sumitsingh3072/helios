"use client";

import { DEFAULT_SUGGESTIONS, ChatSuggestion } from "@/types/chat";

interface ChatSuggestionsProps {
    onSuggestionClick: (prompt: string) => void;
    suggestions?: ChatSuggestion[];
    disabled?: boolean;
}

/**
 * Quick suggestion chips for common chat prompts
 * Follows SRP - only responsible for rendering suggestions
 */
export function ChatSuggestions({
    onSuggestionClick,
    suggestions = DEFAULT_SUGGESTIONS,
    disabled = false,
}: ChatSuggestionsProps) {
    return (
        <div className="px-3 md:px-4 py-3 border-b border-white/5">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        onClick={() => !disabled && onSuggestionClick(suggestion.prompt)}
                        disabled={disabled}
                        className="px-3 md:px-4 py-2 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {suggestion.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
