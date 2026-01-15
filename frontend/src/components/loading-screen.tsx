"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setIsVisible(false)
            });

            // Initial State - Screen covers everything
            gsap.set(containerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });

            // Text Character Animation (Scramble/Reveal)
            const chars = textRef.current?.textContent?.split("") || [];
            if (textRef.current && chars.length > 0) {
                // Wrap each character in a span
                textRef.current.innerHTML = chars.map(char => `<span class="inline-block opacity-0 translate-y-10">${char}</span>`).join("");

                // Animate characters
                tl.to(textRef.current.children, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power4.out"
                });
            } else {
                // Fallback if text splitting fails
                tl.fromTo(textRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" }
                );
            }

            // Hold
            tl.to({}, { duration: 1.5 });

            // Exit Animation - Reveal Content
            tl.to(containerRef.current, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.8,
                ease: "power4.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden cursor-wait text-white">
            {/* Background: Dark Orange */}
            <div className="absolute inset-0 bg-black" />

            {/* Blue Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl" />

            <h1 ref={textRef} className="relative z-10 text-[15vw] font-bold tracking-tighter leading-none select-none  text-white">
                HELIOS
            </h1>
        </div>
    );
}
