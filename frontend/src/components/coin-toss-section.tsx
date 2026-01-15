"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { PiggyBank, Coins, Banknote } from 'lucide-react';

// Passed down ref to access the DOM section
function Coin({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    const groupRef = useRef<THREE.Group>(null);
    const scrollProgress = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current || !sectionRef.current) return;

        const el = sectionRef.current;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollDistance = rect.height - viewportHeight;

        const rawProgress = Math.max(0, Math.min(1, -rect.top / totalScrollDistance));

        // Smooth dampening
        scrollProgress.current = THREE.MathUtils.lerp(scrollProgress.current, rawProgress, delta * 5);
        const p = scrollProgress.current;

        // --- ANIMATION TIMELINE ---
        // 0.0 -> 0.2: Entrance (Right Side -> Center) 
        // 0.2 -> 1.0: The Long Roll (Center Top -> Center Bottom)
        // We stretch it to 1.0 to eliminate the "gap" at the end where nothing happens.

        // X Position: Start at Right (1.5) -> Move to Center (0) by p=0.2
        let targetX = 1.5;
        if (p < 0.2) {
            const t = p / 0.2;
            targetX = THREE.MathUtils.lerp(1.5, 0, t);
        } else {
            targetX = 0;
        }

        // Y Position: 
        // 0..0.2: Stable at top (1.0)
        // 0.2..1.0: Roll all the way down to just off screen (-3.5)
        let targetY = 1.0;
        if (p < 0.2) {
            targetY = 1.0;
        } else {
            // From 0.2 to 1.0
            const t = (p - 0.2) / 0.8;
            targetY = THREE.MathUtils.lerp(1.0, -3.5, t);
        }

        // Apply Position
        groupRef.current.position.x = targetX;
        groupRef.current.position.y = targetY;

        // Rotations - SLOWER per request
        // Reduced multipliers significantly

        // X Rotation (Tumble): 
        groupRef.current.rotation.x = p * Math.PI * 5; // Was 12

        // Z Rotation (Spin): 
        groupRef.current.rotation.z = p * Math.PI * 2; // Was 4

        // Y Rotation (Face direction): 
        groupRef.current.rotation.y = Math.sin(p * Math.PI) * 0.3;

    });

    const coinColor = "#F4D03F";

    return (
        <group
            ref={groupRef}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.4} // Reduced size per request
        >
            {/* Main Coin Cylinder */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[2.5, 2.5, 0.25, 64]} />
                <meshStandardMaterial
                    color={coinColor}
                    metalness={0.95}
                    roughness={0.1}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Edge Ridge - Front */}
            <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.1, 16, 64]} />
                <meshStandardMaterial color={coinColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Edge Ridge - Back */}
            <mesh position={[0, -0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.1, 16, 64]} />
                <meshStandardMaterial color={coinColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Face Content: HEADS ($) */}
            <group position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                {/* Inner Circle Decoration */}
                <mesh position={[0, 0, -0.01]}>
                    <ringGeometry args={[0, 2.4, 64]} />
                    <meshStandardMaterial color={coinColor} metalness={0.8} roughness={0.3} />
                </mesh>
                <Text
                    position={[0, 0, 0.02]}
                    fontSize={1.8}
                    color="#8B6914"
                    anchorX="center"
                    anchorY="middle"
                >
                    $
                </Text>
            </group>

            {/* Face Content: TAILS (FINANCE) */}
            <group position={[0, -0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh position={[0, 0, -0.01]}>
                    <ringGeometry args={[0, 2.4, 64]} />
                    <meshStandardMaterial color={coinColor} metalness={0.8} roughness={0.3} />
                </mesh>
                <Text
                    position={[0, 0, 0.02]}
                    fontSize={0.6}
                    color="#8B6914"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#F4D03F"
                >
                    HELIOS
                </Text>
            </group>
        </group>
    );
}

function Scene({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    return (
        <>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
            <pointLight position={[-10, -5, -10]} intensity={1} color="white" />
            <Environment preset="city" />

            <Float
                speed={2}
                rotationIntensity={0.1}
                floatIntensity={0.2}
                floatingRange={[-0.1, 0.1]}
            >
                <Coin sectionRef={sectionRef} />
            </Float>
        </>
    )
}

export default function CoinTossSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="w-full h-[150vh] bg-[#F3F0E7] relative z-10 px-0">
            {/* Height set to 150vh */}

            <div className="sticky top-0 w-full h-screen overflow-hidden z-30">

                {/* Gradient Overlay (Background) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3F0E7]/80 via-transparent to-transparent z-0 pointer-events-none w-full" />

                {/* 3D Scene (Foreground) - High Z-index to stand out over text backgrounds */}
                <div className="absolute inset-0 z-30 h-full w-full pointer-events-none">
                    <Suspense fallback={null}>
                        <Canvas
                            shadows
                            dpr={[1, 2]}
                            camera={{ position: [0, 0, 5], fov: 35 }}
                            className="w-full h-full"
                            style={{ background: 'transparent' }}
                        >
                            <Scene sectionRef={sectionRef} />
                        </Canvas>
                    </Suspense>
                </div>

            </div>
            {/* --- Text Content (Scrolling Naturally) ---
                Placed absolutely relative to the section (h-[150vh]), so they will scroll up as the user scrolls down.
            */}

            {/* Text 1: Near top */}
            <div className="absolute top-[20vh] left-[10vw] max-w-xs md:max-w-md z-20 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-serif italic mb-4 text-black/80">
                    Flip the<br />Odds.
                </h2>
                <p className="text-xl text-black/60">
                    The future favors the bold. Start your journey now.
                </p>
            </div>

            {/* Text 2: Middle */}
            <div className="absolute top-[75vh] right-[10vw] max-w-xs md:max-w-md text-right z-20 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-serif italic mb-4 text-black/80">
                    Invest<br />Wisely.
                </h2>
                <p className="text-xl text-black/60">
                    Every spin is a new opportunity. Make it count.
                </p>
            </div>

            {/* Text 3: Near bottom with Mesh Background */}
            <div className="absolute top-[120vh] left-0 w-full flex items-center justify-start pl-[10vw] gap-8 z-20 pointer-events-auto bg-black p-10 overflow-hidden">
                {/* Mesh Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-xs md:max-w-md">
                    <h2 className="text-5xl md:text-7xl font-serif italic mb-4 text-white">
                        Your<br />Turn.
                    </h2>
                    <p className="text-xl text-white">
                        Take control of your financial destiny.
                    </p>
                </div>
            </div>
        </section>
    );
}
