"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const services = [
  {
    title: "Outbound Lead Generation",
    description:
      "Automated outreach systems that book meetings while you sleep. We build cold email infrastructure and LinkedIn automation that consistently fills your pipeline with qualified prospects.",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: ["Cold Email Systems", "LinkedIn Outreach", "Email Deliverability"],
  },
  {
    title: "Inbound Lead Management",
    description:
      "Never let a hot lead go cold. We build intelligent systems that qualify, route, and nurture inbound leads automatically, integrating seamlessly with your CRM and sales process.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    features: ["Lead Qualification", "CRM Automation", "Smart Routing"],
  },
  {
    title: "Custom AI Solutions",
    description:
      "Purpose-built AI systems designed around your unique business challenges. Every solution is crafted to integrate perfectly with your existing tools and workflows.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    features: ["AI Agents", "Process Automation", "Custom Integrations"],
  },
];

export function Services() {
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
      id="services"
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-4"
        >
          Our Services
        </h2>
        <p className="text-neutral-500 mb-6 text-base">
          End-to-end automation solutions
        </p>
        <div ref={cardsRef} className="flex flex-col gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md border border-white/50 hover:border-neutral-300 transition-all duration-500 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                    d={service.icon}
                  />
                </svg>
              </div>

              <h3 className="text-lg md:text-xl font-medium text-neutral-800 mb-2 pr-16">
                {service.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-3 pr-6 line-clamp-2">
                {service.description}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-1.5">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-neutral-500 bg-neutral-100/80 px-2.5 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
