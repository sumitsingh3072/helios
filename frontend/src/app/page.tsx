"use client";

import Link from "next/link";
import HeroSection from "@/components/hero-section";
import ProjectShowcase from "@/components/project-showcase";
import AwardsSection from "@/components/awards-section";
import FeaturesSection from "@/components/features-section";
import ClientsSection from "@/components/clients-section";
import PhilosophySection from "@/components/philosophy-section";
import HeliosVisionSection from "@/components/helios-vision-section";
import Footer from "@/components/footer";
import { Logo } from "@/components/logo";
import LoadingScreen from "@/components/loading-screen";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3F0E7] text-black overflow-x-hidden selection:bg-black selection:text-white">
      <LoadingScreen />

      {/* Navbar - Reform Style */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full py-6 px-6 md:px-8 flex items-center justify-between pointer-events-none mix-blend-difference text-white">
        {/* Logo */}
        <div className="w-1/3 flex justify-start pointer-events-auto">
          <Logo className="text-white mix-blend-difference" iconClassName="bg-white border-white/20" showText={false} />
        </div>

        {/* Helper Text */}
        <div className="w-1/3 flex justify-center pointer-events-auto">
          <span className="hidden md:block font-serif italic text-lg text-white/90">
            Brainwave
          </span>
        </div>

        {/* Menu / Actions */}
        <div className="w-1/3 flex justify-end items-center gap-4 pointer-events-auto">
          <Link href="/auth/login" className="hidden sm:inline-flex h-9 items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-2 text-xs font-bold uppercase transition-colors hover:bg-white hover:text-black">
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">
        <HeroSection />

        <div id="work">
          <ProjectShowcase />
        </div>

        <AwardsSection />

        <FeaturesSection />

        <ClientsSection />

        <PhilosophySection />

        <HeliosVisionSection />
      </main>

      <Footer />
    </div>
  );
}
