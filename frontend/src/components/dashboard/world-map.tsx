"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WorldMap() {
    return (
        <div className="relative w-full h-full">
            {/* World Map Image */}
            <Image
                src="/map1.png"
                alt="World Map"
                fill
                className="object-cover opacity-70"
                priority
            />

            {/* Animated overlay nodes and connections */}
            <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Connection Lines */}
                <motion.path
                    d="M110,150 Q300,-50 550,100"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M350,250 Q450,350 650,280"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                <motion.path
                    d="M200,100 Q400,200 600,150"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }}
                />

                {/* Animated Nodes */}
                {[
                    { x: 110, y: 150, color: "#FFD700" }, // NYC
                    { x: 370, y: 100, color: "#3B82F6" }, // London
                    { x: 550, y: 150, color: "#FFD700" }, // Tokyo
                    { x: 650, y: 280, color: "#3B82F6" }, // Sydney
                    { x: 350, y: 250, color: "#FFD700" }, // Cape Town
                    { x: 120, y: 280, color: "#3B82F6" }, // Rio
                    { x: 480, y: 200, color: "#FFD700" }, // Singapore
                ].map((node, i) => (
                    <g key={i}>
                        <circle cx={node.x} cy={node.y} r="4" fill={node.color} />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="8"
                            stroke={node.color}
                            fill="none"
                            strokeWidth="1"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
