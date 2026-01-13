"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AnalyticsCard() {
    const data = [
        { name: "Mon", value: 400 },
        { name: "Tue", value: 300 },
        { name: "Wed", value: 550 },
        { name: "Thu", value: 450 },
        { name: "Fri", value: 600 },
        { name: "Sat", value: 700 },
        { name: "Sun", value: 480 },
    ];

    return (
        <div className="h-full w-full flex flex-col justify-end p-4">
            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Tooltip
                            cursor={{ fill: "transparent" }}
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                borderRadius: "8px",
                                border: "1px solid hsl(var(--border))",
                                fontSize: "12px",
                            }}
                        />
                        <Bar
                            dataKey="value"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function SecurityCard() {
    return (
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute h-32 w-32 rounded-full bg-green-500/20"
            />
            <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute h-24 w-24 rounded-full bg-green-500/30"
            />
            <div className="relative z-10 bg-background p-4 rounded-full border shadow-lg text-green-500">
                <Shield className="h-8 w-8" />
            </div>
            <div className="absolute bottom-4 text-xs font-mono text-green-600 bg-green-500/10 px-2 py-1 rounded">
                AES-256 ENCRYPTED
            </div>
        </div>
    );
}

export function AiCard() {
    const [text, setText] = useState("");
    const fullText = "Analyzing your spending patterns...";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                i = 0; // Loop it
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full p-4 flex flex-col justify-center">
            <div className="bg-muted/50 rounded-lg p-3 rounded-tl-none border relative">
                <div className="absolute -top-3 -left-1 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Wand2 className="h-3 w-3" />
                </div>
                <p className="text-sm font-mono">{text}<span className="animate-pulse">|</span></p>
            </div>
            <div className="mt-2 flex gap-2">
                <div className="h-2 w-12 bg-primary/20 rounded-full animate-pulse" />
                <div className="h-2 w-8 bg-primary/20 rounded-full animate-pulse delay-75" />
            </div>
        </div>
    )
}
