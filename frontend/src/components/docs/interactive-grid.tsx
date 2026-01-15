"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    ChevronDown,
    Check,
    Shield,
    Zap,
    Activity,
    Lock,
    TrendingUp,
    AlertTriangle,
    Wallet,
    Terminal,
    Fingerprint
} from "lucide-react";

export default function InteractiveDocsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {/* Card 1: Neural Settings (Dropdowns) */}
            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 text-white border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col group">
                {/* Glass/Metal Background */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal size={20} className="text-cyan-400" />
                        <h3 className="text-xl font-bold tracking-tight">Neural Configuration</h3>
                    </div>
                    <p className="text-white/40 text-sm font-mono">Adjust parameters for the Helios trading engine.</p>
                </div>

                <div className="relative z-10 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md flex-1 flex flex-col justify-center gap-5 shadow-inner">
                    <AnimatedDropdown
                        label="RISK TOLERANCE"
                        options={["Conservative (Low Alpha)", "Balanced (Standard)", "Aggressive (Max Yield)"]}
                        defaultValue="Balanced (Standard)"
                        icon={<Shield size={12} />}
                    />
                    <AnimatedDropdown
                        label="EXECUTION MODEL"
                        options={["Llama-3-Fin", "Helios-V2 (Proprietary)", "GPT-4-Turbo"]}
                        defaultValue="Helios-V2 (Proprietary)"
                        icon={<Zap size={12} />}
                    />
                    <AnimatedDropdown
                        label="LIQUIDITY SOURCE"
                        options={["Decentralized (DEX)", "Hybrid Aggregation", "Dark Pools Only"]}
                        defaultValue="Hybrid Aggregation"
                        icon={<Activity size={12} />}
                    />
                </div>
            </div>

            {/* Card 2: Encrypted Identity (Profile) */}
            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 text-white border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Fingerprint size={20} className="text-purple-400" />
                        <h3 className="text-xl font-bold tracking-tight">Encrypted Identity</h3>
                    </div>
                    <p className="text-white/40 text-sm font-mono">Zero-knowledge proof verification status.</p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm bg-gradient-to-b from-white/10 to-black rounded-xl border border-white/10 overflow-hidden backdrop-blur-xl group hover:border-purple-500/30 transition-colors duration-500">
                        {/* Header Bar */}
                        <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-[10px] font-mono text-white/30 flex items-center gap-2">
                                <Lock size={8} /> ID_VERIFIED
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 bg-black flex items-center justify-center relative shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                    <span className="text-2xl font-bold text-purple-400">H</span>
                                    <div className="absolute inset-0 rounded-full border border-purple-500/50 animate-[spin_10s_linear_infinite] opacity-50" />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg tracking-wide">OPERATOR 7</h4>
                                    <div className="text-xs font-mono text-purple-400 mt-1">CLEARANCE: LEVEL 5</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center text-xs font-mono group/item hover:bg-white/10 transition-colors cursor-default">
                                    <span className="text-white/50">WALLET HASH</span>
                                    <span className="text-white/80">0x7F...3A92</span>
                                </div>
                                <div className="p-3 bg-white/5 rounded border border-white/5 flex justify-between items-center text-xs font-mono group/item hover:bg-white/10 transition-colors cursor-default">
                                    <span className="text-white/50">2FA STATUS</span>
                                    <span className="text-green-400 flex items-center gap-1"><Check size={10} /> ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 3: Liquidity Map (Chart) */}
            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 text-white border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 mb-2 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp size={20} className="text-green-400" />
                            <h3 className="text-xl font-bold tracking-tight">Liquidity Map</h3>
                        </div>
                        <p className="text-white/40 text-sm font-mono">Real-time asset flow visualization.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="flex-1 relative mt-6 bg-black/50 border border-white/10 rounded-xl overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    {/* Chart Container */}
                    <div className="absolute inset-0 flex items-end">
                        <LiquidityChart />
                    </div>

                    {/* Overlay Stats */}
                    <div className="absolute top-4 left-4 flex flex-col">
                        <span className="text-[10px] text-white/40 font-mono mb-1">CURRENT APY</span>
                        <span className="text-xl font-bold text-green-400 font-mono">12.84%</span>
                    </div>
                </div>
            </div>

            {/* Card 4: Market Alerts (Notifications) */}
            <div className="relative bg-[#0A0A0A] rounded-3xl p-8 text-white border border-white/10 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle size={20} className="text-amber-400" />
                        <h3 className="text-xl font-bold tracking-tight">Market Alerts</h3>
                    </div>
                    <p className="text-white/40 text-sm font-mono">Autonomous surveillance signals.</p>
                </div>

                <div className="flex-1 relative flex items-center justify-center">
                    <AlertStack />
                </div>
            </div>
        </div>
    );
}

// ----------------------
// Sub-components
// ----------------------

function AnimatedDropdown({ label, options, defaultValue, icon }: { label: string, options: string[], defaultValue: string, icon: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue);

    useEffect(() => {
        const timer = setInterval(() => {
            if (Math.random() > 0.8) {
                setIsOpen(prev => !prev);
            }
        }, 4000 + Math.random() * 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white/60 tracking-wider">
                {icon} {label}
            </div>
            <div className="relative">
                <button
                    className="w-full flex items-center justify-between bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white shadow hover:border-cyan-500/50 transition-colors font-mono"
                >
                    {selected}
                    <ChevronDown size={14} className={`transition-transform text-white/50 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-2xl z-20 overflow-hidden"
                        >
                            {options.map((opt) => (
                                <div
                                    key={opt}
                                    className="px-4 py-3 text-sm hover:bg-white/5 cursor-pointer flex justify-between items-center text-white/80 font-mono transition-colors"
                                    onClick={() => { setSelected(opt); setIsOpen(false); }}
                                >
                                    {opt}
                                    {selected === opt && <Check size={12} className="text-cyan-400" />}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

function LiquidityChart() {
    return (
        <div className="w-full h-32 relative">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path
                    d="M0,40 L0,30 C10,35 20,10 30,15 C40,20 50,5 60,10 C70,15 80,0 90,5 L100,0 V40 Z"
                    fill="url(#liquidityGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.path
                    d="M0,30 C10,35 20,10 30,15 C40,20 50,5 60,10 C70,15 80,0 90,5 L100,0"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                    <linearGradient id="liquidityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(74, 222, 128, 0.2)" />
                        <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}

function AlertStack() {
    return (
        <div className="relative w-full max-w-xs h-32 flex items-center justify-center">
            {/* Front Card */}
            <motion.div
                className="absolute z-30 w-full bg-[#111] p-4 rounded-xl border-l-2 border-l-amber-500 border-y border-r border-white/5 shadow-2xl flex gap-3 items-start"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
                    <Activity size={16} />
                </div>
                <div>
                    <div className="text-xs font-bold text-white mb-1 tracking-wide">WHALE ALERT</div>
                    <p className="text-[10px] text-white/50 font-mono leading-tight">Wallet 0x82...9F moved 500 BTC to Cold Storage.</p>
                </div>
                <span className="text-[10px] text-white/30 ml-auto whitespace-nowrap font-mono">2s AGO</span>
            </motion.div>

            {/* Middle Card */}
            <motion.div
                className="absolute z-20 w-[95%] bg-[#111] p-4 rounded-xl border border-white/5 h-full top-3 opacity-60"
                animate={{ scale: [0.95, 0.98, 0.95] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Back Card */}
            <motion.div
                className="absolute z-10 w-[90%] bg-[#111] p-4 rounded-xl border border-white/5 h-full top-6 opacity-30"
                animate={{ scale: [0.9, 0.94, 0.9] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>
    )
}
