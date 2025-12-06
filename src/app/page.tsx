"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";

// Dynamically import the Scene component to avoid SSR issues with Three.js
const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-[#f5f0eb] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff5a36] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">Loading experience...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Scene>
        <div className="w-screen">
          <Hero />
          <Journey />
          <Services />
          <About />
          <CTA />
        </div>
      </Scene>
    </main>
  );
}
