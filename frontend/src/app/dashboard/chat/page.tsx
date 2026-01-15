"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Zap, Mic, Paperclip, Bot } from "lucide-react";

export default function ChatPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col relative overflow-hidden text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight">Helios Intelligence</h1>
                    <p className="text-gray-400 text-sm mt-1">Ask anything about your portfolio or market trends.</p>
                </div>
                <div className="bg-[#050A14] border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3B82F6]" />
                    <span className="text-xs font-bold text-blue-200">SYSTEM ONLINE</span>
                </div>
            </div>

            {/* Chat Area */}
            <GlassCard variant="metallic" className="flex-1 flex flex-col p-0 overflow-hidden shadow-2xl border-white/5">
                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Time Divider */}
                    <div className="flex justify-center">
                        <span className="text-[10px] text-gray-600 font-medium uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-white/5">Today</span>
                    </div>

                    {/* AI Message */}
                    <div className="flex gap-4 max-w-2xl group">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/5 transition-all group-hover:scale-105">
                            <Bot className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="p-5 rounded-2xl rounded-tl-none bg-[#050A14] border border-white/5 text-gray-200 shadow-md backdrop-blur-sm">
                                <p>Hello, Somil. I've analyzed your staking portfolio. Your Etherium position is up <strong className="text-blue-400">12.4%</strong> this week.</p>
                                <p className="mt-3 text-gray-400 text-xs font-medium uppercase tracking-wide border-t border-white/5 pt-3">Suggested Action</p>
                                <p className="mt-1 text-sm text-gray-300">Would you like to see a breakdown of the fee rewards?</p>
                            </div>
                            <span className="text-[10px] text-gray-600 ml-2 font-medium">AI • 10:42 AM</span>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <span className="font-bold text-white text-xs">SG</span>
                        </div>
                        <div className="space-y-2">
                            <div className="p-5 rounded-2xl rounded-tr-none bg-blue-600 text-white shadow-lg shadow-blue-600/10">
                                <p className="leading-relaxed">Yes, show me the rewards breakdown and compare it with last month.</p>
                            </div>
                            <span className="text-[10px] text-gray-600 mr-2 text-right block font-medium">You • 10:43 AM</span>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#050A14] border-t border-white/5">
                    <div className="relative max-w-4xl mx-auto">
                        <Input
                            placeholder="Type your query..."
                            className="bg-[#000000] border-white/10 h-14 pl-6 pr-32 rounded-2xl text-white placeholder:text-gray-700 focus-visible:ring-blue-500/50 shadow-inner"
                        />
                        <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1">
                            <Button size="icon" variant="ghost" className="text-gray-600 hover:text-white hover:bg-white/5 h-10 w-10 transition-colors">
                                <Mic className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-gray-600 hover:text-white hover:bg-white/5 h-10 w-10 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button size="icon" className="bg-white hover:bg-gray-200 text-black h-10 w-10 rounded-xl shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)] transition-all">
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p className="text-[10px] text-gray-700">AI can make mistakes. Please verify important financial information.</p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
