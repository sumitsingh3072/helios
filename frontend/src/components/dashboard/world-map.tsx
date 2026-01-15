"use client";

import { motion } from "framer-motion";

export function WorldMap() {
    return (
        <div className="relative w-full h-full opacity-60 mix-blend-screen">
            <svg viewBox="0 0 800 400" className="w-full h-full text-blue-900/40 fill-current">
                {/* Simplified World Map Path - Abstract Representation */}
                <path d="M150,100 Q200,50 250,100 T350,150 T450,100 T550,150 T650,100 T750,150 V300 H50 V150 Z" className="opacity-0" /> {/* Hidden path for ref */}

                {/* Abstract Continents (Rectangles/Shapes for tech feel) */}
                <rect x="50" y="80" width="120" height="150" rx="10" className="opacity-20" /> {/* North America */}
                <rect x="80" y="240" width="80" height="100" rx="10" className="opacity-20" /> {/* South America */}
                <rect x="300" y="60" width="150" height="120" rx="10" className="opacity-20" /> {/* Europe */}
                <rect x="300" y="190" width="140" height="140" rx="10" className="opacity-20" /> {/* Africa */}
                <rect x="500" y="60" width="200" height="180" rx="10" className="opacity-20" /> {/* Asia */}
                <rect x="600" y="260" width="100" height="80" rx="10" className="opacity-20" /> {/* Australia */}

                {/* Grid Lines */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Connection Lines */}
                <motion.path
                    d="M110,150 Q300,-50 550,100"
                    fill="none"
                    stroke="#FF6B00"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M350,250 Q450,350 650,280"
                    fill="none"
                    stroke="#0047FF"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                />

                {/* Nodes */}
                {[
                    { x: 110, y: 150 }, // NYC
                    { x: 370, y: 100 }, // London
                    { x: 550, y: 150 }, // Tokyo
                    { x: 650, y: 280 }, // Sydney
                    { x: 350, y: 250 }, // Cape Town
                    { x: 120, y: 280 }, // Rio
                ].map((node, i) => (
                    <g key={i}>
                        <circle cx={node.x} cy={node.y} r="3" className="fill-orange-500" />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="8"
                            className="stroke-orange-500 fill-none"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
