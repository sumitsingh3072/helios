"use client";

import Link from "next/link";
import { ArrowUpRight, Copyright } from "lucide-react";
import { Logo } from "@/components/logo";

export default function Footer() {
    return (
        <footer className="relative bg-[#F3F0E7] text-black pt-10 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Top Section: Links & 'Let's Chat' */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-20">

                    {/* Left Branding/Links */}
                    <div className="flex flex-col gap-8 mb-12 md:mb-0">
                        <Logo iconClassName="bg-black text-white" showText={false} />

                        <div className="flex flex-col gap-1 text-xs font-bold tracking-widest uppercase">
                            <Link href="#" className="hover:opacity-60 transition-opacity">AI Audit</Link>
                            <Link href="#" className="hover:opacity-60 transition-opacity">Philosophy</Link>
                            <Link href="#" className="hover:opacity-60 transition-opacity">Tax Planning</Link>
                            <Link href="#" className="hover:opacity-60 transition-opacity">Security</Link>
                        </div>
                    </div>

                    {/* Right: Let's Chat */}
                    <div className="flex flex-col items-end text-right">
                        <Link href="/auth/signup" className="group flex items-center gap-4 text-6xl md:text-8xl font-serif leading-none hover:italic transition-all duration-300">
                            Start Advising
                            <ArrowUpRight className="h-10 w-10 md:h-14 md:w-14 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform" />
                        </Link>
                        <p className="mt-4 text-lg md:text-xl font-normal opacity-70">
                            Your personal AI finance expert is waiting.
                        </p>
                    </div>

                    {/* Social List (Absolute Right or Flex) */}
                    <div className="hidden md:flex flex-col items-end justify-between h-full gap-2 text-[10px] font-bold tracking-widest uppercase text-right mt-4 md:mt-0">
                        <Link href="#">LinkedIn</Link>
                        <Link href="#">X (Twitter)</Link>
                        <Link href="#">Instagram</Link>
                    </div>
                </div>

                {/* Giant Footer Text */}
                <div className="w-full flex justify-between items-end border-t border-black pt-2">
                    <h1 className="text-[25vw] leading-[0.8] font-bold tracking-tighter -ml-4 select-none">
                        HELIOS
                    </h1>
                    <div className="mb-4 mr-4 md:mb-8">
                        <Copyright className="h-6 w-6 md:h-10 md:w-10" />
                    </div>
                    <h1 className="text-[25vw] leading-[0.8] font-bold tracking-tighter -mr-4 select-none">
                        AI
                    </h1>
                </div>
            </div>
        </footer>
    );
}
