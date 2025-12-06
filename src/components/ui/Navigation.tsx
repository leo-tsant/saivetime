"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? "bg-[#f5f0eb]/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <a
        href="/"
        className="text-xl font-light text-neutral-800 hover:text-[#ff5a36] transition-colors"
      >
        saivetime
      </a>
      <a
        href="https://calendly.com/your-calendar"
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2 bg-[#ff5a36] text-white rounded-full hover:bg-[#ff8a6c] transition-colors text-sm font-medium inline-flex items-center gap-1.5"
      >
        Let&apos;s Talk
        <svg
          className="w-3.5 h-3.5"
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
