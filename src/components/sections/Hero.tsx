"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animation
    const entranceTl = gsap.timeline();

    entranceTl
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );

    // Scroll-based fade out
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1,
      },
    });

    scrollTl
      .to(titleRef.current, { opacity: 0, y: -100, ease: "power2.in" })
      .to(
        subtitleRef.current,
        { opacity: 0, y: -50, ease: "power2.in" },
        "<0.1"
      )
      .to(
        ctaRef.current,
        { opacity: 0, y: -30, ease: "power2.in" },
        "<"
      )
      .to(
        scrollIndicatorRef.current,
        { opacity: 0, ease: "power2.in" },
        "<"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen flex items-center justify-center px-4 md:px-12 lg:px-20"
    >
      {/* Text content - more centered */}
      <div className="w-full md:w-2/3 lg:w-[55%] flex flex-col items-start text-left md:ml-[10%] lg:ml-[15%]">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-neutral-800"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          saivetime
        </h1>
        <p
          ref={subtitleRef}
          className="mt-6 text-2xl md:text-3xl lg:text-4xl text-neutral-600 max-w-2xl leading-relaxed"
        >
          AI-powered automation that gives you back your most valuable asset
        </p>
        <a
          ref={ctaRef}
          href="https://calendly.com/your-calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-lg font-medium hover:bg-neutral-800 transition-colors"
        >
          Let&apos;s talk
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
        <div
          ref={scrollIndicatorRef}
          className="mt-12 flex flex-col items-start gap-2 text-neutral-400"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll to explore</span>
          <div className="flex items-center gap-2">
            <div className="w-px h-8 bg-neutral-300 animate-pulse" />
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Right side is empty - the 3D hourglass renders there via the Scene */}
      <div className="hidden md:block w-1/2" />
    </section>
  );
}
