"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="h-screen flex flex-col items-center justify-center px-4 py-12 relative"
    >
      <div
        ref={contentRef}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-800 mb-6">
          Ready to save time?
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
          Let&apos;s discuss how AI automation can transform your business
          and give you back the hours you&apos;ve been losing.
        </p>
        <a
          href="https://calendly.com/your-calendar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff5a36] text-white rounded-full font-medium hover:bg-[#ff8a6c] hover:shadow-lg hover:shadow-[#ff5a36]/25 transition-all duration-300"
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

      {/* Footer */}
      <footer className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} saivetime. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
