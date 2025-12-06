"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 }
    ).fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 },
      "<0.2"
    );

    // Fade out animation
    const fadeOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 1,
      },
    });

    fadeOutTl.to([titleRef.current, textRef.current], {
      opacity: 0,
      y: -50,
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen flex items-center px-4 md:px-12 lg:px-20"
    >
      {/* Content on left side - leaving space for hourglass on right */}
      <div className="w-full md:w-2/3 lg:w-1/2 md:ml-[5%] lg:ml-[10%]">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-800 mb-8"
        >
          Enter the future
        </h2>
        <p
          ref={textRef}
          className="text-lg md:text-xl text-neutral-600 max-w-xl leading-relaxed"
        >
          We harness the power of AI to automate repetitive tasks, streamline
          workflows, and unlock hours of productive time for your team.
        </p>
      </div>
    </section>
  );
}
