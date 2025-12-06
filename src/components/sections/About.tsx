"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const founders = [
  {
    name: "Leo Tsantarliotis",
    role: "Co-Founder",
    initials: "LT",
  },
  {
    name: "Spilios Spiliopoulos",
    role: "Co-Founder",
    initials: "SS",
  },
];

export function About() {
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
        end: "top 30%",
        scrub: 1,
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 }
    );

    Array.from(cards).forEach((card) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1 },
        "-=0.3"
      );
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
        Meet the team
      </h2>
      <div
        ref={cardsRef}
        className="flex flex-col md:flex-row gap-12 md:gap-16"
      >
        {founders.map((founder, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            {/* Avatar placeholder */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center mb-6 border-4 border-white shadow-lg">
              <span className="text-3xl md:text-4xl font-light text-neutral-500">
                {founder.initials}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-neutral-800">
              {founder.name}
            </h3>
            <p className="text-neutral-500 mt-2">{founder.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
