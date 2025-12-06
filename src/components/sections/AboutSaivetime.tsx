"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const highlights = [
  {
    stat: "500+",
    label: "Hours saved monthly",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    stat: "98%",
    label: "Client satisfaction",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    stat: "24/7",
    label: "Automation uptime",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

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
          <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-2xl">
            We&apos;re an AI automation agency that helps businesses reclaim their most
            valuable resource — time. By combining cutting-edge artificial intelligence
            with deep process expertise, we transform manual, repetitive workflows into
            intelligent systems that run themselves.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed mb-10 max-w-2xl">
            Whether you&apos;re drowning in data entry, struggling with complex workflows,
            or looking to scale without scaling headcount — we build custom solutions
            that give your team the freedom to focus on what truly matters.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md border border-white/50"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={item.icon}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-light text-neutral-900">{item.stat}</p>
                  <p className="text-sm text-neutral-500">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
