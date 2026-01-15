"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function PhilosophySection() {
    return (
        <section className="relative w-full py-20 px-6 bg-[#F3F0E7] text-black border-t border-black/5 overflow-hidden">
            <div className="container mx-auto max-w-6xl">

                {/* Header Graphic */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="flex items-center gap-4 text-center">
                        <span className="text-sm md:text-xl font-sans uppercase tracking-widest font-normal">THE</span>
                        <span className="text-5xl md:text-7xl font-serif italic">Helios</span>
                        <span className="text-sm md:text-xl font-sans uppercase tracking-widest font-normal">ADVISOR</span>
                    </div>

                    {/* Sun Rays Graphic */}
                    <div className="relative w-full max-w-xl mt-4">
                        <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 mb-0 opacity-60">
                            <span>AI-DRIVEN WEALTH</span>
                            <span>EST. 2026</span>
                        </div>
                        {/* CSS Rays */}
                        <div className="relative h-24 w-full overflow-hidden flex justify-center">
                            <div className="absolute top-0 w-[1px] h-full bg-black origin-top" />
                            <div className="absolute top-0 w-[1px] h-[120%] bg-black origin-top rotate-[25deg] md:rotate-[60deg]" />
                            <div className="absolute top-0 w-[1px] h-[120%] bg-black origin-top rotate-[-25deg] md:rotate-[-60deg]" />
                            <div className="absolute top-0 w-[1px] h-[110%] bg-black origin-top rotate-[12deg] md:rotate-[30deg]" />
                            <div className="absolute top-0 w-[1px] h-[110%] bg-black origin-top rotate-[-12deg] md:rotate-[-30deg]" />
                        </div>
                    </div>
                </div>

                {/* Main Headline */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif leading-none shrink-0 max-w-3xl">
                        Your wealth, intelligently managed.
                    </h2>
                </div>

                {/* Two Column Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-16">
                    <div className="space-y-4">
                        <p className="text-base font-medium leading-relaxed">
                            Helios isn't just a tracker; it's an AI financial advisor that never sleeps.
                            It analyzes market trends, your spending habits, and investment opportunities in real-time.
                        </p>
                        <p className="text-base font-medium leading-relaxed">
                            Stop guessing. Let data drive your net worth.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-base font-light leading-relaxed opacity-80">
                            Traditional banking is reactive. Helios is proactive. We identify tax-loss harvesting
                            opportunities, redundant subscriptions, and yield gaps before you even notice them.
                        </p>
                        <p className="text-base font-light leading-relaxed opacity-80">
                            Automation meeting advisory. That is the new standard.
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-12 mb-8">
                    <Link href="/auth/login">
                        <Button className="rounded-full h-16 px-12 bg-black text-white text-lg tracking-widest uppercase hover:bg-black">
                            0 | ? | 0
                            {/* <ArrowUpRight className="ml-2 h-5 w-5" /> */}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
