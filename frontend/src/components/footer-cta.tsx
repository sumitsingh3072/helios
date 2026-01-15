"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FooterCTA() {
    return (
        <section className="bg-[#F3F0E7] text-black pt-20 pb-32 px-6 border-t border-black/5">
            <div className="container mx-auto flex flex-col items-center text-center">
                <h2 className="text-[12vw] leading-[0.8] font-serif italic mb-8">
                    We do many
                </h2>
                <div className="relative w-full flex justify-center items-center my-8 md:my-16">
                    <span className="text-[10vw] md:text-[8vw] font-serif leading-none mr-4 md:mr-10">things</span>

                    {/* Pill Button CTA */}
                    <Link href="/work" className="group relative inline-flex items-center justify-center bg-black text-white rounded-full px-8 md:px-12 py-4 md:py-6 overflow-hidden transition-all hover:scale-105">
                        <span className="text-sm md:text-lg font-bold uppercase tracking-widest mr-2">See All Work</span>
                        <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>

                    <span className="text-[10vw] md:text-[8vw] font-serif leading-none ml-4 md:ml-10">very well.</span>
                </div>
            </div>
        </section>
    );
}
