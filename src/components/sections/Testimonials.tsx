"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
  {
    quote:
      "SaiveTime transformed how we operate. What used to take our team 20 hours a week now runs automatically. The ROI was visible within the first month.",
    author: "Sarah Chen",
    role: "COO",
    company: "TechCorp Industries",
    initials: "SC",
    color: "from-blue-500 to-indigo-600",
  },
  {
    quote:
      "Their approach is different — they actually understand our business before building anything. The automation they created feels like it was made specifically for us, because it was.",
    author: "Michael Rodriguez",
    role: "Managing Partner",
    company: "Legal Partners LLP",
    initials: "MR",
    color: "from-amber-500 to-orange-600",
  },
  {
    quote:
      "We were skeptical about AI automation, but SaiveTime made believers out of us. Our team now focuses on creative work while the mundane tasks handle themselves.",
    author: "Emily Watson",
    role: "Director of Operations",
    company: "GrowthScale Marketing",
    initials: "EW",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote:
      "The level of customization and attention to detail exceeded our expectations. They didn't just automate our processes—they improved them.",
    author: "David Park",
    role: "CEO",
    company: "FinServe Solutions",
    initials: "DP",
    color: "from-purple-500 to-pink-600",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-8"
        >
          What our clients say
        </h2>

        {/* Main testimonial display */}
        <div className="relative h-[280px] mb-8">
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            const isPrev =
              index ===
              (activeIndex - 1 + testimonials.length) % testimonials.length;
            const isNext = index === (activeIndex + 1) % testimonials.length;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`absolute inset-0 transition-all duration-600 ease-out ${
                  isActive
                    ? "opacity-100 translate-x-0 scale-100 z-20"
                    : isPrev
                      ? "opacity-40 -translate-x-8 scale-95 z-10"
                      : isNext
                        ? "opacity-40 translate-x-8 scale-95 z-10"
                        : "opacity-0 scale-90 z-0"
                }`}
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="relative h-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-8 flex flex-col">
                  {/* Decorative gradient blob */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${testimonial.color} rounded-full blur-3xl opacity-20`}
                  />
                  <div
                    className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${testimonial.color} rounded-full blur-3xl opacity-10`}
                  />

                  {/* Large quote mark */}
                  <div
                    className={`absolute top-6 right-8 text-8xl font-serif bg-gradient-to-br ${testimonial.color} bg-clip-text text-transparent opacity-20`}
                  >
                    &ldquo;
                  </div>

                  {/* Quote */}
                  <p className="relative text-lg md:text-xl text-neutral-700 leading-relaxed flex-1 pr-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="relative flex items-center gap-4 mt-6 pt-6 border-t border-neutral-200/50">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-lg font-medium">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-neutral-800">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation dots with progress */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`relative transition-all duration-300 ${
                index === activeIndex ? "w-12" : "w-3"
              } h-3 rounded-full overflow-hidden`}
            >
              <div
                className={`absolute inset-0 ${
                  index === activeIndex
                    ? `bg-gradient-to-r ${testimonial.color}`
                    : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
              {index === activeIndex && (
                <div
                  className="absolute inset-0 bg-white/30 origin-left animate-progress"
                  style={{
                    animation: "progress 5s linear forwards",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CSS for progress animation */}
        <style jsx>{`
          @keyframes progress {
            from {
              transform: scaleX(0);
            }
            to {
              transform: scaleX(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
