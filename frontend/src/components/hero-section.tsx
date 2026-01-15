"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const shapeLeftRef = useRef<HTMLDivElement>(null);
    const shapeRightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            // Initial Reveal
            gsap.fromTo(textRef.current,
                { y: 150, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: "power4.out" }
            );

            // Shape Floating Animation
            gsap.to(shapeLeftRef.current, {
                y: -50, rotation: 10, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
            gsap.to(shapeRightRef.current, {
                y: 50, rotation: -10, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut"
            });

            // Parallax on Scroll
            tl.to(textRef.current, { y: 200 }, 0);
            tl.to(shapeLeftRef.current, { y: -200 }, 0);
            tl.to(shapeRightRef.current, { y: -150 }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F3F0E7] text-black">
            {/* Organic Shapes - Optimized for Performance */}
            {/* Reduced blur from 100px/120px to 60px/80px and added will-change-transform */}
            <div ref={shapeLeftRef} className="absolute left-[-10%] top-[20%] w-[50vw] h-[60vh] bg-[#2A86FF] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[40px] opacity-80 z-10 mix-blend-multiply will-change-transform transform-gpu" />
            <div ref={shapeRightRef} className="absolute right-[-5%] top-[15%] w-[45vw] h-[65vh] bg-[#FF9F1C] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[40px] opacity-80 z-10 mix-blend-multiply will-change-transform transform-gpu" />

            {/* Giant Typography */}
            <div className="relative z-20 w-full flex justify-center items-center mix-blend-normal pointer-events-none">
                <h1 ref={textRef} className="text-[18vw] leading-none font-bold tracking-tighter text-black select-none z-20">
                    HELIOS
                </h1>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-10 left-0 right-0 px-8 flex justify-between items-end text-[10px] md:text-xs font-medium tracking-widest uppercase z-30 font-sans text-black/80">
                <div className="w-1/3 text-left">
                    EST. 2026
                </div>
                <div className="w-1/3 text-center">
                    ( SCROLL DOWN )
                </div>
                <div className="w-1/3 text-right">
                    WE LIVE IN THE DETAILS ( C )
                </div>
            </div>
        </section>
    );
}
