"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div
        ref={contentRef}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-800 mb-6">
          Ready to save time?
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
          Let's discuss how AI automation can transform your business
          and give you back the hours you've been losing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#" variant="primary">
            Let's Talk
          </Button>
          <Button href="mailto:hello@saivetime.com" variant="secondary">
            Send Email
          </Button>
        </div>
      </div>
    </section>
  );
}
