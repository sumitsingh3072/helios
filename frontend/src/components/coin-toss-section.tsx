"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";

// Letter H component made with geometry - Bold & Stylish
function LetterH({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
    const goldColor = "#FFD700";
    const darkGold = "#DAA520";

    return (
        <group position={position} rotation={rotation} scale={0.55}>
            {/* Left vertical bar of H - Bold */}
            <mesh position={[-0.6, 0, 0]}>
                <boxGeometry args={[0.35, 2.4, 0.15]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.08} />
            </mesh>

            {/* Right vertical bar of H - Bold */}
            <mesh position={[0.6, 0, 0]}>
                <boxGeometry args={[0.35, 2.4, 0.15]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.08} />
            </mesh>

            {/* Horizontal bar of H - Bold */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.55, 0.4, 0.15]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.08} />
            </mesh>

            {/* Top serif - Left */}
            <mesh position={[-0.6, 1.25, 0]}>
                <boxGeometry args={[0.55, 0.12, 0.12]} />
                <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Top serif - Right */}
            <mesh position={[0.6, 1.25, 0]}>
                <boxGeometry args={[0.55, 0.12, 0.12]} />
                <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Bottom serif - Left */}
            <mesh position={[-0.6, -1.25, 0]}>
                <boxGeometry args={[0.55, 0.12, 0.12]} />
                <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Bottom serif - Right */}
            <mesh position={[0.6, -1.25, 0]}>
                <boxGeometry args={[0.55, 0.12, 0.12]} />
                <meshStandardMaterial color={darkGold} metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}


// Coin component with scroll-based animation
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

        // X Position: Start at center-right (0.8) -> Move to Center (0) by p=0.2
        let targetX = 0.8;
        if (p < 0.2) {
            const t = p / 0.2;
            targetX = THREE.MathUtils.lerp(0.8, 0, t);
        } else {
            targetX = 0;
        }

        // Y Position: Stable at center-top (0.5), roll down to bottom (-1.0)
        let targetY = 0.5;
        if (p < 0.2) {
            targetY = 0.5;
        } else {
            const t = (p - 0.2) / 0.8;
            targetY = THREE.MathUtils.lerp(0.5, -1.0, t);
        }

        // Apply Position
        groupRef.current.position.x = targetX;
        groupRef.current.position.y = targetY;

        // Rotations
        groupRef.current.rotation.x = p * Math.PI * 5;
        groupRef.current.rotation.z = p * Math.PI * 2;
        groupRef.current.rotation.y = Math.sin(p * Math.PI) * 0.3;
    });

    const coinColor = "#1a1a1a"; // Black
    const edgeColor = "#2a2a2a"; // Slightly lighter black for edges
    const goldColor = "#FFD700"; // Gold

    return (
        <group
            ref={groupRef}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.5}
        >
            {/* Main Coin Cylinder - Black */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[2.5, 2.5, 0.3, 64]} />
                <meshStandardMaterial
                    color={coinColor}
                    metalness={0.85}
                    roughness={0.2}
                />
            </mesh>

            {/* Edge Ridge - Front - Gold accent */}
            <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.08, 16, 64]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Edge Ridge - Back - Gold accent */}
            <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.08, 16, 64]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Face - Front */}
            <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2.45, 64]} />
                <meshStandardMaterial color={coinColor} metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Gold ring decoration - Front */}
            <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.0, 2.2, 64]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Dollar Sign - Front */}
            <LetterH position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} />

            {/* Face - Back */}
            <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2.45, 64]} />
                <meshStandardMaterial color={coinColor} metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Gold ring decoration - Back */}
            <mesh position={[0, -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.0, 2.2, 64]} />
                <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Dollar Sign - Back */}
            <LetterH position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

function Scene({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 7]} intensity={2} color="#ffffff" />
            <directionalLight position={[-5, -5, 5]} intensity={0.8} color="#fffacd" />
            <pointLight position={[0, 5, 5]} intensity={1} color="#fff8dc" />
            <spotLight position={[3, 3, 5]} intensity={1.5} angle={0.5} penumbra={0.5} color="#ffd700" />
            <Coin sectionRef={sectionRef} />
        </>
    );
}

export default function CoinTossSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="w-full h-[150vh] bg-[#F3F0E7] relative z-10 px-0">
            <div className="sticky top-0 w-full h-screen overflow-hidden z-30">

                {/* Gradient Overlay (Background) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F3F0E7]/80 via-transparent to-transparent z-0 pointer-events-none w-full" />

                {/* 3D Scene */}
                <div className="absolute inset-0 z-30 h-full w-full pointer-events-none">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-black">Loading 3D...</div>}>
                        <Canvas
                            camera={{ position: [0, 0, 5], fov: 35 }}
                            style={{ width: '100%', height: '100%', background: 'transparent' }}
                            gl={{ alpha: true, antialias: true }}
                        >
                            <Scene sectionRef={sectionRef} />
                        </Canvas>
                    </Suspense>
                </div>

            </div>

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
