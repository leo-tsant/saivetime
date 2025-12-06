"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into your current workflows, mapping every process to identify where time is being lost and where AI can make the biggest impact.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our architects craft a custom automation blueprint, designing intelligent systems that integrate seamlessly with your existing tools and team.",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop and deploy AI-powered automation systems, rigorously testing each component to ensure reliability and performance at scale.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "Continuous monitoring, refinement, and support ensure your automation evolves with your business, maximizing ROI over time.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    const stepElements = stepsRef.current?.children;
    if (stepElements) {
      gsap.set(Array.from(stepElements), { opacity: 1, x: 0 });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-4"
        >
          How it works
        </h2>
        <p className="text-neutral-500 mb-6 text-base">
          From discovery to deployment in weeks, not months
        </p>

        <div ref={stepsRef} className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent hidden md:block" />

          <div className="flex flex-col gap-5">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start group">
                {/* Step indicator */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={step.icon}
                      />
                    </svg>
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-neutral-600">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-medium text-neutral-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
