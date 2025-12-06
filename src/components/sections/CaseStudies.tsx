"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const caseStudies = [
  {
    client: "TechCorp Industries",
    industry: "Manufacturing",
    metric: "85%",
    metricLabel: "reduction in manual data entry",
    description:
      "Automated their entire inventory management system, saving 40+ hours per week. Our AI-powered solution seamlessly integrated with their existing ERP, eliminating repetitive tasks and human error.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    client: "Legal Partners LLP",
    industry: "Legal Services",
    metric: "60%",
    metricLabel: "faster document processing",
    description:
      "Implemented AI-powered contract review and document automation workflows. Lawyers now spend time on strategy instead of paperwork, with automated extraction and analysis of key clauses.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    client: "GrowthScale Marketing",
    industry: "Digital Marketing",
    metric: "3x",
    metricLabel: "increase in campaign output",
    description:
      "Built custom automation for lead nurturing, reporting, and client onboarding. Their team now handles triple the client load with the same resources, all while improving response times.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.set(Array.from(cards), { opacity: 1, y: 0 });
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
          Case Studies
        </h2>
        <p className="text-neutral-500 mb-6 text-base">
          Real results from real clients
        </p>
        <div ref={cardsRef} className="flex flex-col gap-4">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Main card */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

                {/* Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={study.icon}
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium text-neutral-800 mb-2 pr-14">
                    {study.client}
                  </h3>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-3 pr-12 line-clamp-2">
                    {study.description}
                  </p>

                  {/* Metric highlight */}
                  <div className="flex items-end gap-2 pt-3 border-t border-neutral-200/50">
                    <span className="text-3xl md:text-4xl font-light text-neutral-900">
                      {study.metric}
                    </span>
                    <span className="text-neutral-500 text-sm pb-1">
                      {study.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
