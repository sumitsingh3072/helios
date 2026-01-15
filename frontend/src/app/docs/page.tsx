"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { ArrowLeft, Book, Code, Layers, Zap, ArrowUpRight, Cpu, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import InteractiveDocsGrid from "@/components/docs/interactive-grid";

export default function DocsPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 origin-left z-50 mix-blend-screen"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 md:mix-blend-difference text-white pointer-events-none">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 group">
                    <div className="p-2 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-colors backdrop-blur-md">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">Back to Home</span>
                </Link>
                <div className="pointer-events-auto">
                    <Logo className="text-white mix-blend-difference" showText={false} />
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-center max-w-4xl px-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">Documentation v2.0</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30 mb-6">
                        System <br />
                        <span className="font-serif italic font-light text-white/50">Architecture</span>
                    </h1>
                    <p className="text-lg text-white/40 max-w-xl mx-auto font-light leading-relaxed">
                        A comprehensive breakdown of the Helios neural interfaces, cryptographic protocols, and core processing units.
                    </p>
                </motion.div>
            </header>

            {/* Content Grid */}
            <main className="container mx-auto px-4 pb-32">
                <InteractiveDocsGrid />
            </main>

            {/* Footer Area */}
            <footer className="py-20 text-center border-t border-white/10">
                <p className="text-white/20 text-sm font-mono uppercase tracking-widest">End of Documentation</p>
            </footer>
        </div>
    );
}
