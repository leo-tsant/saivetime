"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const caseStudies = [
  {
    client: "TechCorp Industries",
    industry: "Manufacturing",
    metric: "85%",
    metricLabel: "reduction in manual data entry",
    description:
      "Automated their entire inventory management system, saving 40+ hours per week. Our AI-powered solution seamlessly integrated with their existing ERP.",
    size: "large", // tall card
  },
  {
    client: "Legal Partners LLP",
    industry: "Legal Services",
    metric: "60%",
    metricLabel: "faster document processing",
    description:
      "AI-powered contract review and document automation workflows.",
    size: "small",
  },
  {
    client: "GrowthScale Marketing",
    industry: "Digital Marketing",
    metric: "3x",
    metricLabel: "campaign output",
    description:
      "Custom automation for lead nurturing and client onboarding.",
    size: "small",
  },
  {
    client: "FinServe Solutions",
    industry: "Financial Services",
    metric: "95%",
    metricLabel: "accuracy in reconciliation",
    description:
      "Intelligent automation replacing error-prone manual reconciliation. Processing thousands of transactions daily with near-perfect accuracy.",
    size: "wide", // wide card
  },
];

interface FlipCardProps {
  study: (typeof caseStudies)[0];
  className?: string;
}

function FlipCard({ study, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-600 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md border border-white/60 shadow-lg group-hover:shadow-2xl transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900" />

          <div className="absolute inset-0 p-6 flex flex-col">
            {/* Industry tag */}
            <span className="inline-block self-start px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-500 bg-neutral-100 rounded-full mb-4">
              {study.industry}
            </span>

            {/* Client name */}
            <h3 className="text-xl md:text-2xl font-medium text-neutral-800 mb-2">
              {study.client}
            </h3>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Metric - big and bold */}
            <div className="mb-2">
              <span className="text-4xl md:text-5xl font-light text-neutral-900">
                {study.metric}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              {study.metricLabel}
            </p>

            {/* Click hint */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-neutral-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Details</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5a36] via-[#ff8a6c] to-[#ff5a36]" />

          <div className="absolute inset-0 p-6 flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                {study.industry}
              </span>
              <h3 className="text-lg font-medium text-white mt-1">
                {study.client}
              </h3>
            </div>

            {/* Description */}
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {study.description}
            </p>

            {/* Metric at bottom */}
            <div className="pt-4 border-t border-white/10 mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-white">
                  {study.metric}
                </span>
                <span className="text-neutral-500 text-sm">
                  {study.metricLabel}
                </span>
              </div>
            </div>

            {/* Flip back hint */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-neutral-500 text-xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    if (gridRef.current) {
      gsap.set(gridRef.current.children, { opacity: 1, y: 0 });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="case-studies"
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-3/4 lg:w-2/3 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-6"
        >
          Case Studies
        </h2>

        {/* Asymmetric Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-3 gap-4 h-[420px]">
          {/* Large card - spans 2 rows */}
          <div className="row-span-2">
            <FlipCard study={caseStudies[0]} className="h-full" />
          </div>

          {/* Top right - small */}
          <FlipCard study={caseStudies[1]} className="h-full" />

          {/* Top far right - small */}
          <FlipCard study={caseStudies[2]} className="h-full" />

          {/* Bottom - wide card spanning 2 columns */}
          <div className="col-span-2">
            <FlipCard study={caseStudies[3]} className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
