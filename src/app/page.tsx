"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/ui/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AboutSaivetime } from "@/components/sections/AboutSaivetime";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
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
      <Scene>
        <div className="w-screen">
          <Navigation />
          <Hero />
          <AboutSaivetime />
          <About />
          <Services />
          <Testimonials />
          <CTA />
        </div>
      </Scene>
    </main>
  );
}
