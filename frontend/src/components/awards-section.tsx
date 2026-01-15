"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AwardsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slight floating animation for the sphere
            gsap.to(sphereRef.current, {
                y: -15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Parallax effect on scroll
            if (sphereRef.current && containerRef.current) {
                gsap.to(sphereRef.current, {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-24 px-6 bg-black text-white border-t border-white/10 overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                {/* Left Typography */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-6xl md:text-8xl font-serif leading-none tracking-tight">
                        Built for <br />
                        <span className="font-sans font-normal bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600">& Impact</span>
                    </h2>

                    <div className="mt-16 space-y-8">
                        <div className="border-t border-white/20 pt-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-bold text-lg uppercase tracking-wider">Hackathon <br /> Edition</span>
                                <span className="text-xs font-bold border border-white/30 px-2 py-1 text-white/70">v1.0</span>
                            </div>
                            <p className="text-xs uppercase opacity-50 tracking-widest">OPEN SOURCE FINANCIAL INTELLIGENCE</p>
                        </div>
                    </div>
                </div>

                {/* Right Visual: Realistic Chrome Sphere */}
                <div className="w-full md:w-1/2 flex justify-center relative min-h-[600px] items-center">

                    {/* The Chrome Sphere */}
                    <div
                        ref={sphereRef}
                        className="relative w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl z-20"
                        style={{
                            background: "radial-gradient(circle at 30% 30%, #ffffff 0%, #d1d5db 20%, #9ca3af 40%, #4b5563 60%, #1f2937 80%, #000000 100%)",
                            boxShadow: "inset -10px -10px 40px rgba(0,0,0,0.8), inset 10px 10px 40px rgba(255,255,255,0.8), 0 0 50px rgba(255,255,255,0.15)"
                        }}
                    >
                        {/* Reflection / Specular Highlight */}
                        <div className="absolute top-[15%] left-[15%] w-[20%] h-[15%] bg-white/40 blur-xl rounded-[100%] rotate-[-45deg]" />

                        {/* Inner Mechanical Ring (Subtle) */}
                        <div className="absolute inset-[15%] border-[1px] border-white/20 rounded-full" />
                        <div className="absolute inset-[35%] border-[1px] border-black/30 rounded-full" />

                        {/* Core Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.8)] animate-pulse" />
                    </div>

                    {/* Feature Pointers (Diagram Style) */}

                    {/* 1. Real-Time AI */}
                    <div className="absolute top-[20%] right-[0%] md:-right-[5%] flex items-center gap-4 z-30 group">
                        <div className="text-right transition-transform group-hover:-translate-x-2 duration-300">
                            <span className="block text-2xl font-medium tracking-tight">Real-Time AI</span>
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Live Analysis</span>
                        </div>
                        <div className="w-24 h-[1px] bg-gradient-to-l from-white to-transparent relative opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                        </div>
                    </div>

                    {/* 2. Portfolio Sync */}
                    <div className="absolute top-[50%] -translate-y-1/2 right-[-5%] md:-right-[15%] flex items-center gap-4 z-30 group">
                        <div className="text-right transition-transform group-hover:-translate-x-2 duration-300">
                            <span className="block text-2xl font-medium tracking-tight">Universal Sync</span>
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Connects All Banks</span>
                        </div>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-white to-transparent relative opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                        </div>
                    </div>

                    {/* 3. Tax Optimization */}
                    <div className="absolute bottom-[20%] right-[0%] md:-right-[5%] flex items-center gap-4 z-30 group">
                        <div className="text-right transition-transform group-hover:-translate-x-2 duration-300">
                            <span className="block text-2xl font-medium tracking-tight">Tax Harvesting</span>
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Zero Cost Logic</span>
                        </div>
                        <div className="w-24 h-[1px] bg-gradient-to-l from-white to-transparent relative opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
