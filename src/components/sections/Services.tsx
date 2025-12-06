"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const services = [
  {
    title: "Workflow Automation",
    description: "Eliminate manual processes and let AI handle the repetitive work.",
  },
  {
    title: "Custom AI Solutions",
    description: "Tailored automation systems designed for your specific needs.",
  },
  {
    title: "Process Optimization",
    description: "Identify bottlenecks and implement intelligent improvements.",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: 1,
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 }
    );

    Array.from(cards).forEach((card, index) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        `-=${0.3}`
      );
    });

    // Fade out
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 1,
      },
    });

    fadeOutTl.to([titleRef.current, ...Array.from(cards)], {
      opacity: 0,
      y: -30,
      stagger: 0.1,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-16 text-center"
      >
        What we do
      </h2>
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/50 hover:border-[#ff5a36]/30 transition-colors"
          >
            <h3 className="text-xl font-medium text-neutral-800 mb-4">
              {service.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
