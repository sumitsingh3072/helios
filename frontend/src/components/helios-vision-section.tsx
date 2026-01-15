"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HeliosVisionSection() {
    return (
        <section className="relative bg-[#050505] text-white overflow-hidden py-20 min-h-[90vh] flex flex-col justify-between">
            {/* Top Marquee */}
            <div className="absolute top-0 left-0 w-full bg-transparent border-b border-white/10 py-3 overflow-hidden flex">
                <MarqueeContent />
                <MarqueeContent />
                <MarqueeContent />
                <MarqueeContent />
            </div>

            {/* Background Blob Placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10 flex-1 flex flex-col justify-center mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content Left */}
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tight mb-8 text-white/90">
                            Create your vision. <br />
                            <span className="text-white/50 italic">Extend your reach.</span>
                        </h2>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 uppercase tracking-wider max-w-md font-mono">
                            Helios isn't just another platform. Helios is an infrastructure.
                            We trade world-class latency, security, and algorithmic execution for efficiency,
                            helping traders move faster, stand out, and scale smarter.
                            No upfront complexity. Just the creative firepower you need to launch.
                        </p>

                        <Link href="/docs" className="inline-flex items-center gap-2 group text-sm font-bold tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity">
                            Learn More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Massive Typography Right - Layered Composition */}
                    <div className="relative h-[400px] md:h-[600px] flex items-center justify-center select-none pointer-events-none w-full">
                        <div className="relative w-full h-full flex items-center justify-center">

                            {/* 1. Base Layer: Massive Dark HELIOS */}
                            <span className="absolute text-[18vw] leading-none font-bold text-[#0A0A0A] tracking-tighter drop-shadow-2xl"
                                style={{ textShadow: "-1px -1px 0 #222, 1px -1px 0 #222, -1px 1px 0 #222, 1px 1px 0 #222" }}>
                                HELIOS
                            </span>

                            {/* 2. Middle Layer: Neon Triangle Geometry */}
                            <svg className="absolute w-[90%] h-[90%] z-10" viewBox="0 0 400 400">
                                <defs>
                                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Triangle Shape */}
                                <motion.path
                                    d="M200,50 L350,350 H50 Z"
                                    fill="none"
                                    stroke="url(#neonGradient)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                                    style={{ filter: "drop-shadow(0 0 8px #0ea5e9)" }}
                                />
                                {/* Inner Line Chart Accents */}
                                <motion.path
                                    d="M50,350 L120,280 L180,310 L250,200 L350,350"
                                    fill="none"
                                    stroke="#22d3ee"
                                    strokeWidth="0.5"
                                    strokeDasharray="5 5"
                                    opacity="0.5"
                                    animate={{ strokeDashoffset: [0, 20] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </svg>

                            {/* 3. Top Layer: Elegant Serif Overlay */}
                            <span className="absolute z-20 text-[8vw] font-serif italic text-white mix-blend-overlay opacity-50 mt-96 ml-10 brightness-150">
                                Finance
                            </span>

                            {/* 4. Notification Badge Accent */}
                            <motion.div
                                className="absolute top-1/4 right-1/4 z-30 bg-[#050505] border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-gray-400">SYS: ONLINE</span>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Brand */}
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="border-t border-white/10 pt-6 flex justify-between items-end">
                    <span className="text-4xl md:text-6xl text-white/30 font-bold">HELIOS FINANCE &copy;</span>
                </div>
            </div>
        </section>
    );
}

function MarqueeContent() {
    return (
        <motion.div
            className="flex items-center gap-4 px-4 whitespace-nowrap text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase"
            animate={{ x: "-100%" }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
            <span>Code Over Capital</span> <span className="text-white/20">•</span>
            <span>Execution Over Emotion</span> <span className="text-white/20">•</span>
            <span>Speed Over Size</span> <span className="text-white/20">•</span>
            <span>Code Over Capital</span> <span className="text-white/20">•</span>
            <span>Execution Over Emotion</span> <span className="text-white/20">•</span>
            <span>Speed Over Size</span> <span className="text-white/20">•</span>
        </motion.div>
    );
}
