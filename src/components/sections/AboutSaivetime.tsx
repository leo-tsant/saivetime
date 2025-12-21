"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutSaivetime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(contentRef.current, { opacity: 1, y: 0 });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about-saivetime"
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-4"
        >
          What is SaiveTime?
        </h2>
        <div ref={contentRef}>
          <p className="text-neutral-600 text-lg leading-relaxed mb-6 max-w-2xl">
            Two founders, one mission: help businesses reclaim their most valuable
            resource. Time.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed mb-6 max-w-2xl">
            We&apos;re an AI automation agency specializing in lead generation and sales
            automation. From cold email systems and LinkedIn outreach to inbound lead
            qualification and CRM workflows, we build the infrastructure that fills
            your pipeline and keeps it moving.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed mb-8 max-w-2xl">
            Every day, we work to deliver real value to our clients. No fluff, no
            overcomplicated solutions. Just automation that works and results you
            can measure.
          </p>

          <a
            href="https://calendly.com/saivetime/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
          >
            Let&apos;s Talk
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
