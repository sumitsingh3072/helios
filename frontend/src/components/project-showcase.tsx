"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Global Accounts",
        category: "Banking Infrastructure",
        description: "Unified dashboard for all your international accounts.",
        image: "/feature1.png",
        href: "/features/accounts",
        pill: "FINANCE",
        tagline: "FROM HIRING TO HIRED"
    },
    {
        title: "Smart Insights",
        category: "AI Analysis",
        description: "Automated advice based on spending.",
        image: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D",
        href: "/features/insights",
        pill: "AI ANALYTICS",
        tagline: "ORGANIZED SO YOU DON'T HAVE TO BE"
    },
    {
        title: "Asset Tracking",
        category: "Wealth Management",
        description: "Real-time valuation of your portfolio.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        href: "/features/assets",
        pill: "WEALTH",
        tagline: "TRACK EVERYTHING EVERYWHERE"
    },
    {
        title: "Tax Harvesting",
        category: "Fiscal Optimization",
        description: "Automated loss harvesting algorithms.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        href: "/features/tax",
        pill: "OPTIMIZATION",
        tagline: "KEEP MORE OF WHAT YOU EARN"
    },
    {
        title: "Neural Trading",
        category: "Automated Execution",
        description: "High-frequency trading bot integration.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        href: "/features/trading",
        pill: "TRADING",
        tagline: "ALWAYS ON, ALWAYS PROFITABLE"
    }
];

export default function ProjectShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal animations for projects
            const projectItems = gsap.utils.toArray<HTMLElement>(".project-item");
            projectItems.forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-32 px-4 md:px-8 bg-[#F3F0E7] text-black overflow-hidden">
            {/* Organic Blobs Background */}
            <div className="absolute left-[-20%] top-[40%] w-[60vw] h-[60vh] bg-[#2A86FF] rounded-full blur-[80px] opacity-40 pointer-events-none mix-blend-multiply" />
            <div className="absolute right-[-20%] bottom-[10%] w-[60vw] h-[60vh] bg-[#FF9F1C] rounded-full blur-[80px] opacity-40 pointer-events-none mix-blend-multiply" />

            <div className="container mx-auto max-w-[95vw] relative z-10">

                {/* Header */}
                <div className="flex flex-col mb-20">
                    <h2 className="text-6xl md:text-9xl tracking-tight leading-none mb-4">
                        <span className="font-bold">Our </span>
                        <span className="font-serif italic font-light">Features</span>
                    </h2>
                    <p className="text-xs font-bold tracking-widest uppercase ml-2 opacity-60">
                        GIVING STARTUPS THE UNFAIR ADVANTAGE
                    </p>
                </div>

                {/* Projects Grid (1-2-2 Layout) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={project.href}
                            className={`project-item group relative block ${index === 0 ? "md:col-span-2" : "md:col-span-1"}`}
                        >
                            {/* Card Container */}
                            <div className="relative w-full overflow-hidden rounded-[2rem] border-4 border-[#1A1A1A] bg-white transition-transform duration-500 hover:scale-[1.01]">

                                {/* Top Bar inside Card */}
                                <div className="absolute top-0 left-0 right-0 h-14 border-b-4 border-[#1A1A1A] z-20 bg-white/10 backdrop-blur-sm flex items-center px-6 justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="font-bold text-xs uppercase">{project.title}</span>
                                    <div className="flex gap-2">
                                        <span className="border border-black rounded-full px-3 py-1 text-[10px] font-bold uppercase">{project.pill}</span>
                                    </div>
                                </div>

                                {/* Main Image Area */}
                                <div className="aspect-[4/3] w-full relative flex items-center justify-center overflow-hidden bg-gray-100">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-12">
                                        <div className="relative w-full h-full bg-black/10 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border border-white/20 backdrop-blur-sm">
                                            <div className="text-center text-white p-8">
                                                <ArrowUpRight className="h-16 w-16 mx-auto mb-4" />
                                                <h3 className="text-3xl font-bold uppercase">{project.title}</h3>
                                                <p className="text-[10px] tracking-[0.2em] mt-4 uppercase">{project.tagline}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Strip */}
                                <div className="bg-[#1A1A1A] text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl font-bold uppercase mb-1">{project.title}</h3>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">{project.description}</p>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="border border-white/30 rounded-full px-4 py-1.5 text-[10px] uppercase font-medium hover:bg-white hover:text-black transition-colors">Learn More</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Typography CTA Redesign */}
                <div className="py-32 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                    <span className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight text-right">
                        We do <br />
                        many
                    </span>

                    <Link
                        href="/docs"
                        className="group relative px-14 py-5 bg-black text-white rounded-full overflow-hidden flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 min-w-[200px]"
                    >
                        <div className="flex flex-col items-center">
                            <span className="relative z-10 text-[20px] font-extrabold uppercase tracking-[0.2em] mb-1">SEE ALL</span>
                            <span className="relative z-10 text-[20px] font-bold tracking-[0.2em] font-serif italic">features</span>
                        </div>
                        <ArrowUpRight className="relative z-10 w-12 h-12 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <div className="absolute inset-0 bg-zinc-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>

                    <span className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight text-left">
                        things very <br />
                        well.
                    </span>
                </div>
            </div>
        </section>
    );
}
