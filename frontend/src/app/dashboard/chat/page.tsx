"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowUp, Bot, Sparkles, User, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    actions?: { label: string; action: string }[];
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content:
                "Hello Somil! I'm Helios, your financial co-pilot. I've analyzed your recent transactions. You spent ₹12,000 on dining out last month, which is 20% higher than your average. Would you like to set a budget for this month?",
            timestamp: "10:30 AM",
            actions: [
                { label: "Set Budget", action: "set_budget" },
                { label: "Show Details", action: "show_details" },
            ],
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "I can definitely help with that. Based on your income and fixed expenses, a safe dining budget would be around ₹8,000. This would save you ₹4,000/month which could go into your SIPs.",
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    actions: [
                        { label: "Apply ₹8,000 Budget", action: "apply_budget" },
                        { label: "Adjust Amount", action: "adjust" },
                    ],
                },
            ]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] container max-w-4xl mx-auto">
            <div className="flex-1 overflow-hidden rounded-xl border bg-background shadow-sm flex flex-col">
                <div className="p-4 border-b flex items-center gap-3 bg-muted/20">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold">Helios Co-Pilot</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Online & Ready
                        </p>
                    </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6" ref={scrollRef}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex w-full gap-3 max-w-[80%]",
                                    message.role === "user" ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <Avatar className="h-8 w-8 border">
                                    {message.role === "user" ? (
                                        <div className="bg-muted h-full w-full flex items-center justify-center"><User className="h-4 w-4" /></div>
                                    ) : (
                                        <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary"><Sparkles className="h-4 w-4" /></div>
                                    )}
                                    <AvatarFallback>{message.role === "user" ? "ME" : "AI"}</AvatarFallback>
                                </Avatar>

                                <div className={cn("flex flex-col gap-2", message.role === "user" ? "items-end" : "items-start")}>
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-3 text-sm shadow-sm",
                                            message.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted/50 border rounded-tl-none"
                                        )}
                                    >
                                        {message.content}
                                    </div>
                                    {message.actions && (
                                        <div className="flex flex-wrap gap-2">
                                            {message.actions.map((action, idx) => (
                                                <Button key={idx} variant="outline" size="sm" className="h-7 text-xs rounded-full bg-background hover:bg-muted">
                                                    {action.label}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    <span className="text-[10px] text-muted-foreground px-1">{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex w-full gap-3 max-w-[80%]">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div className="bg-muted/50 border rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1 w-16">
                                    <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="h-1.5 w-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="p-4 bg-background border-t">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="relative flex items-center"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Helios anything about your finances..."
                            className="flex-1 bg-muted/30 border-none rounded-full px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder:text-muted-foreground"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-1.5 h-9 w-9 rounded-full"
                            disabled={!input.trim() || isTyping}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                        {["Summarize my spending", "How much can I invest?", "Analyze my subscriptions"].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setInput(suggestion)}
                                className="whitespace-nowrap rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
