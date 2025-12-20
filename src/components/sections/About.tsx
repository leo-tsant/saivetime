"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const founders = [
  {
    name: "Leo Tsantarliotis",
    role: "Co-Founder",
    image: "/leo.png",
    imagePosition: "center",
    bio: "Drives business strategy and client relationships. Leo focuses on understanding what businesses truly need and translating that into automation solutions that deliver measurable results.",
  },
  {
    name: "Spilios Spiliopoulos",
    role: "Co-Founder",
    image: "/spilios.jpg",
    imagePosition: "top",
    bio: "Leads technical development and system architecture. Spilios builds the AI and automation infrastructure that powers our solutions, ensuring reliability and performance at scale.",
  },
];

export function About() {
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
      id="about"
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-8"
        >
          Meet the team
        </h2>
        <div ref={cardsRef} className="flex flex-col gap-8">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-5 items-start"
            >
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 shadow-xl overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: founder.imagePosition }}
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neutral-900 rounded-md" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
                  {founder.role}
                </p>
                <h3 className="text-xl md:text-2xl font-medium text-neutral-800 mb-2">
                  {founder.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm line-clamp-3">
                  {founder.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
