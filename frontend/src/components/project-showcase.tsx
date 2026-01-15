"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Fingerprint, Globe, Activity, Shield } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";

export default function ProjectShowcase() {
    return (
        <section className="w-full py-32 bg-[#F8FAFC] text-slate-900 overflow-hidden px-4 md:px-8 relative">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 brightness-100 contrast-150 pointer-events-none mix-blend-multiply" />

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4 text-slate-900">
                            System <br />
                            <span className="text-slate-400 font-serif italic">Architecture</span>
                        </h2>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-mono text-blue-600 mb-2">/// INDEX: 001-ALPHA</p>
                        <Link href="/docs" className="group flex items-center gap-2 text-slate-900 border-b border-slate-300 pb-1 hover:border-slate-900 transition-colors">
                            <span className="text-sm font-bold tracking-widest uppercase">View All Systems</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* 10-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-10 gap-6 auto-rows-[450px]">

                    {/* Card 1: 30% - Identity */}
                    <Link href="/features/identity" className="md:col-span-3 group relative block h-full">
                        <GlassCard>
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                            <Fingerprint className="text-blue-600 w-6 h-6" />
                                        </div>
                                        <ArrowUpRight className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Identity</h3>
                                    <p className="text-slate-500 text-sm">Biometric-grade authentication protocols.</p>
                                </div>
                                <div className="relative flex items-center justify-center py-8">
                                    <FingerprintScan />
                                </div>
                            </div>
                        </GlassCard>
                    </Link>

                    {/* Card 2: 70% - Banking Infrastructure */}
                    <Link href="/features/banking" className="md:col-span-7 group relative block h-full">
                        <GlassCard>
                            <div className="relative z-10 h-full flex flex-col p-8 overflow-hidden">
                                <div className="flex justify-between items-start mb-8 relative z-20">
                                    <div>
                                        <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                                            <Globe className="text-indigo-600 w-6 h-6" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2 text-slate-900">Global Infrastructure</h3>
                                        <p className="text-slate-500 max-w-md">Unified liquidity layer connecting 140+ fiat currencies and 50+ blockchains.</p>
                                    </div>
                                    <ArrowUpRight className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                </div>

                                <div className="absolute inset-0 top-0 left-0 w-full h-full opacity-60">
                                    <NetworkMap />
                                </div>
                            </div>
                        </GlassCard>
                    </Link>

                    {/* Card 3: 60% - Wealth Management */}
                    <Link href="/features/wealth" className="md:col-span-6 group relative block h-full">
                        <GlassCard>
                            <div className="relative z-10 h-full flex flex-col p-8">
                                <div className="flex justify-between items-start mb-auto">
                                    <div>
                                        <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-100">
                                            <Activity className="text-emerald-600 w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-slate-900">Wealth OS</h3>
                                        <p className="text-slate-500 text-sm">Automated portfolio rebalancing.</p>
                                    </div>
                                    <ArrowUpRight className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                </div>

                                <div className="mt-8 relative h-48 w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                    <TradingChart />
                                </div>
                            </div>
                        </GlassCard>
                    </Link>

                    {/* Card 4: 40% - Tax Optimization */}
                    <Link href="/features/tax" className="md:col-span-4 group relative block h-full">
                        <GlassCard>
                            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                            <Shield className="text-amber-500 w-6 h-6" />
                                        </div>
                                        <ArrowUpRight className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Fiscal Shield</h3>
                                    <p className="text-slate-500 text-sm">Regulatory compliance engine.</p>
                                </div>

                                <div className="relative flex items-center justify-center h-40">
                                    <ShieldScan />
                                </div>
                            </div>
                        </GlassCard>
                    </Link>

                </div>
            </div>
        </section>
    );
}

// ------------------------------------
// UI Components
// ------------------------------------

function GlassCard({ children }: { children: React.ReactNode }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative h-full w-full rounded-[20px] bg-white/60 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl overflow-hidden transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(255,255,255,0.8),
                        transparent 80%
                        )
                    `,
                }}
            />
            {children}
        </div>
    );
}

// ------------------------------------
// Animation Components
// ------------------------------------

function FingerprintScan() {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <Fingerprint className="w-full h-full text-slate-200" strokeWidth={1} />
            <div className="absolute inset-0 overflow-hidden animate-[scan_3s_ease-in-out_infinite]">
                <Fingerprint className="w-full h-full text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]" strokeWidth={1} />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-600 shadow-[0_0_15px_#2563EB]" />
            </div>
            <style jsx>{`
                @keyframes scan {
                    0%, 100% { clip-path: inset(0 0 100% 0); }
                    50% { clip-path: inset(0 0 0 0); }
                }
             `}</style>
        </div>
    )
}

function NetworkMap() {
    return (
        <svg className="w-full h-full opacity-60" viewBox="0 0 800 400">
            {/* Abstract connections */}
            <motion.path
                d="M100,200 Q250,50 400,200 T700,200"
                fill="none"
                stroke="#6366f1" // Indigo
                strokeWidth="2"
                strokeDasharray="10 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2 }}
            />
            <motion.path
                d="M100,200 Q250,350 400,200 T700,200"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="10 10"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, delay: 0.5 }}
            />

            {/* Nodes */}
            {[100, 400, 700].map((cx, i) => (
                <g key={i}>
                    <circle cx={cx} cy="200" r="4" fill="#6366f1" />
                    <circle cx={cx} cy="200" r="20" fill="none" stroke="#6366f1" strokeOpacity="0.2">
                        <animate attributeName="r" from="20" to="40" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                </g>
            ))}
        </svg>
    )
}

function TradingChart() {
    return (
        <div className="absolute inset-0 flex items-end">
            <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                        <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M0,150 L50,140 L100,160 L150,120 L200,130 L250,80 L300,100 L350,50 L400,70 L450,30 L500,60 L550,20 L600,40"
                    fill="none"
                    stroke="#059669" // Emerald 600
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />
                <motion.path
                    d="M0,150 L50,140 L100,160 L150,120 L200,130 L250,80 L300,100 L350,50 L400,70 L450,30 L500,60 L550,20 L600,40 V200 H0 Z"
                    fill="url(#chartGradLight)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                />
            </svg>
        </div>
    )
}

function ShieldScan() {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <Shield className="w-16 h-16 text-amber-500/20" />

            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="absolute w-20 h-20 rounded-full border border-amber-500/50"
                    animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-20 h-20 rounded-full border border-amber-500/30"
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                />
            </div>

            <Shield className="absolute w-16 h-16 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
        </div>
    )
}
