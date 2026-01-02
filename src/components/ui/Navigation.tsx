"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

// Page positions: Hero=0, AboutSaivetime=1, About(Team)=2, Services=3, Testimonials=4, CTA=5
const navLinks = [
  { label: "About", href: "#about-saivetime", page: 1.0 },
  { label: "Team", href: "#about", page: 2.0 },
  { label: "Services", href: "#services", page: 3.0 },
  { label: "Testimonials", href: "#testimonials", page: 4.0 },
];

const TOTAL_PAGES = 6;

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  // Find the scroll container on mount
  useEffect(() => {
    const findScrollContainer = () => {
      // ScrollControls from drei creates a div with overflow: auto
      // It's inside the fixed canvas container
      const fixedContainer = document.querySelector(".fixed.inset-0");
      if (fixedContainer) {
        const allDivs = fixedContainer.querySelectorAll("div");
        for (const div of allDivs) {
          const style = window.getComputedStyle(div);
          if (style.overflow === "auto" || style.overflowY === "auto" || style.overflowY === "scroll") {
            if (div.scrollHeight > div.clientHeight) {
              setScrollContainer(div as HTMLElement);
              return;
            }
          }
        }
      }
    };

    // Try immediately and also after a delay (for when scene loads)
    findScrollContainer();
    const timeout = setTimeout(findScrollContainer, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetPage: number
  ) => {
    e.preventDefault();

    if (!scrollContainer) {
      // Try to find it again
      const fixedContainer = document.querySelector(".fixed.inset-0");
      if (fixedContainer) {
        const allDivs = fixedContainer.querySelectorAll("div");
        for (const div of allDivs) {
          const style = window.getComputedStyle(div);
          if (style.overflow === "auto" || style.overflowY === "auto") {
            if (div.scrollHeight > div.clientHeight) {
              animateScroll(div as HTMLElement, targetPage);
              return;
            }
          }
        }
      }
      return;
    }

    animateScroll(scrollContainer, targetPage);
  };

  const animateScroll = (container: HTMLElement, targetPage: number) => {
    const totalHeight = container.scrollHeight - container.clientHeight;
    // Each section is 1 page (100vh), so targetPage directly maps to section
    const targetScroll = (targetPage / (TOTAL_PAGES - 1)) * totalHeight;
    const startScroll = container.scrollTop;
    const distance = targetScroll - startScroll;
    const duration = 1200;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      container.scrollTop = startScroll + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50 px-8 lg:px-12 py-6 flex justify-between items-center"
    >
      <a
        href="/"
        className="hover:opacity-80 transition-opacity -mt-4"
      >
        <Image
          src="/logo.png"
          alt="Saivetime"
          width={427}
          height={193}
          className="h-16 w-auto object-contain"
          priority
        />
      </a>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.page)}
            className="text-base text-neutral-600 hover:text-neutral-900 transition-colors font-light cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="https://calendly.com/saivetime/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2.5 bg-[#ff5a36] text-white rounded-full hover:bg-[#ff8a6c] transition-colors text-base font-medium inline-flex items-center gap-2"
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
    </nav>
  );
}
