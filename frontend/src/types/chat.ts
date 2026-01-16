// Chat-related type definitions

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    // Optional rich content for AI messages
    richContent?: {
        type: 'stats' | 'chart' | 'table';
        data: Record<string, unknown>;
    };
}

export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    isSending: boolean;
    error: string | null;
}

export interface SendMessageRequest {
    content: string;
}

export interface ChatResponse {
    messages: ChatMessage[];
}

export interface SendMessageResponse {
    message: ChatMessage;
    aiResponse: ChatMessage;
}

// Suggestion chips for quick actions
export interface ChatSuggestion {
    id: string;
    label: string;
    prompt: string;
}

export const DEFAULT_SUGGESTIONS: ChatSuggestion[] = [
    { id: '1', label: 'Show market trends', prompt: 'Show me the current market trends' },
    { id: '2', label: 'Optimize my portfolio', prompt: 'Help me optimize my portfolio' },
    { id: '3', label: 'Predict next month', prompt: 'What are your predictions for next month?' },
    { id: '4', label: 'Risk analysis', prompt: 'Perform a risk analysis on my investments' },
];
