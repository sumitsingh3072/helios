"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    Cpu,
    Globe,
    ShieldCheck,
    Zap,
    Activity,
    TrendingUp,
    Share2,
    Bell,
    Lock
} from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";

export default function FeaturesSection() {
    return (
        <section className="w-full py-32 bg-[#050505] text-white overflow-hidden px-4 md:px-8 relative">
            {/* Ambient Background - Metallic Sheen */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="mb-24 max-w-3xl">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                        Cold. Calculated. <br />
                        <span className="text-white/40 font-serif italic">Perfect.</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light max-w-lg border-l border-white/20 pl-6">
                        Precision engineering meets raw computational power.
                        The financial stack for the post-human economy.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[350px]">

                    {/* Card 1: Real-Time Analytics (Large) */}
                    <div className="md:col-span-6 lg:col-span-8 row-span-1 group relative">
                        <ShinyCard>
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <div className="flex justify-between items-start">
                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md">
                                        <Activity size={24} className="text-cyan-400" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-3xl font-bold tracking-tight mb-2 text-white">Neural Market Feed</h3>
                                    <p className="text-white/40 font-mono text-sm tracking-wide">LATENCY: 4ms // STREAM: ACTIVE</p>
                                </div>
                            </div>

                            {/* Holographic Animation */}
                            <div className="absolute inset-0 z-0 mask-gradient-b">
                                <HolographicLineChart />
                            </div>
                        </ShinyCard>
                    </div>

                    {/* Card 2: Global Sync (Tall) */}
                    <div className="md:col-span-3 lg:col-span-4 row-span-2 group relative">
                        <ShinyCard>
                            <div className="relative z-10 h-full flex flex-col p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center backdrop-blur-md">
                                        <Globe size={20} className="text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-400/80 tracking-widest uppercase border border-emerald-500/20 px-2 py-1 rounded bg-emerald-500/5">
                                        Planetary Grid
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-2">Omni-Sync</h3>
                                <p className="text-white/40 text-sm font-medium mb-12">
                                    140+ Exchanges. <br />
                                    Zero Friction. <br />
                                    Absolute Liquidity.
                                </p>

                                <div className="flex-1 relative flex items-center justify-center">
                                    <WireframeGlobe />
                                </div>
                            </div>
                        </ShinyCard>
                    </div>

                    {/* Card 3: Vault Security (Medium) */}
                    <div className="md:col-span-3 lg:col-span-4 row-span-1 group relative">
                        <ShinyCard>
                            <div className="relative z-10 h-full flex flex-col justify-between p-6">
                                <div>
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                                        <Lock size={20} className="text-rose-500" />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight">Cold Storage</h3>
                                </div>
                                <p className="text-white/40 text-sm font-medium mt-2">
                                    Cryptographic isolation protocols.
                                    <span className="block text-rose-500/60 font-mono text-xs mt-1">Status: SEALED</span>
                                </p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-rose-500/10 to-transparent mix-blend-screen pointer-events-none" />
                            <SecurityGrid />
                        </ShinyCard>
                    </div>

                    {/* Card 4: Tax Optimization (Resized to fit) */}
                    <div className="md:col-span-3 lg:col-span-4 row-span-1 group relative">
                        <ShinyCard>
                            <div className="relative z-10 h-full flex flex-col justify-between p-6">
                                <div>
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                                        <ShieldCheck size={20} className="text-amber-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight mb-2">Fiscal Immunity</h3>
                                    <p className="text-white/40 text-sm font-medium">
                                        Automated loss harvesting.
                                    </p>
                                </div>

                                <div className="w-full relative bg-black/40 rounded-lg border border-white/10 overflow-hidden backdrop-blur-sm mt-4 p-3">
                                    <div className="flex justify-between text-xs font-mono text-amber-500 mb-1">
                                        <span>SAVED</span>
                                        <CountUp end={12840} prefix="$" />
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "65%" }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="h-full bg-amber-500 shadow-[0_0_20px_#f59e0b]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ShinyCard>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ------------------------------------
// UI Components
// ------------------------------------

function ShinyCard({ children }: { children: React.ReactNode }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative h-full w-full rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.15),
                        transparent 80%
                        )
                    `,
                }}
            />
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        400px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.1),
                        transparent 80%
                        )
                    `,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            {children}
        </div>
    );
}

function CountUp({ end, prefix = "" }: { end: number, prefix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = end / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [end]);

    return <span>{prefix}{count.toLocaleString()}</span>;
}

// ------------------------------------
// Animation Components
// ------------------------------------

function HolographicLineChart() {
    return (
        <div className="absolute inset-0 flex items-end opacity-60 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.5)" />
                        <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                    </linearGradient>
                </defs>

                {/* Fill Area */}
                <motion.path
                    d="M0,150 Q50,100 100,130 T200,80 T300,120 T400,60 V200 H0 Z"
                    fill="url(#lineGradient)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* The Line */}
                <motion.path
                    d="M0,150 Q50,100 100,130 T200,80 T300,120 T400,60"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }}
                />

                {/* Moving dot on the line */}
                <motion.circle
                    r="4"
                    fill="#fff"
                    style={{ offsetPath: "path('M0,150 Q50,100 100,130 T200,80 T300,120 T400,60')", offsetDistance: "0%" }}
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    )
}

function WireframeGlobe() {
    return (
        <div className="relative w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border border-emerald-500/10 border-t-emerald-500/50 rotate-45" />
            <div className="absolute inset-4 rounded-full border border-emerald-500/10 border-b-emerald-500/50 -rotate-45" />
            <div className="absolute inset-8 rounded-full border border-emerald-500/10 border-l-emerald-500/50 rotate-90" />

            {/* Scanning Line */}
            <div className="absolute left-0 top-0 w-full h-[1px] bg-emerald-400/50 animate-[scan_4s_linear_infinite]" />

            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399]" />

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
             `}</style>
        </div>
    )
}

function SecurityGrid() {
    return (
        <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1 opacity-30">
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-rose-500/40 rounded-[1px]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        repeatDelay: Math.random()
                    }}
                />
            ))}
        </div>
    )
}
