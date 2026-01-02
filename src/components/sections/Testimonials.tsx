"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
  {
    quote:
      "Reliable professionals who will get it done no matter what. Outstanding technical expertise and problem-solving approach. I can always count on them to deliver quality results on time.",
    author: "Danny McMillan",
    role: "Director",
    company: "DATAbrill UK Limited",
    initials: "DM",
    color: "from-blue-500 to-indigo-600",
    image: "/testimonials/danny-mcmillan.jpg",
    linkedin: "https://www.linkedin.com/in/dannymac1000/",
  },
  {
    quote:
      "Working with SAIVETIME was a game-changer for our business. They understood exactly what we needed and delivered automation solutions that exceeded our expectations.",
    author: "Shaz Mathew",
    role: "Founder",
    company: "AttractAI",
    initials: "SM",
    color: "from-amber-500 to-orange-600",
    image: "/testimonials/shaz-mathew.jpg",
    video: "/testimonials/shaz-mathew-testimonial.mp4",
    poster: "/testimonials/shaz-mathew-thumbnail.jpg",
    linkedin: "https://www.linkedin.com/in/shaz-mathew/",
  },
  {
    quote:
      "Highly competent and reliable. They quickly resolved critical technical challenges that were blocking our progress. Communication was prompt and professional throughout the entire process.",
    author: "Flora Rubingh",
    role: "CEO & Founder",
    company: "LUNAI",
    initials: "FR",
    color: "from-emerald-500 to-teal-600",
    image: "/testimonials/flora-rubingh.jpg",
    linkedin: "https://www.linkedin.com/in/florarubingh/",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
  }, []);

  const videoTestimonial = testimonials.find((t) => "video" in t && t.video);
  const textTestimonials = testimonials.filter(
    (t) => !("video" in t && t.video)
  );

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="min-h-screen flex items-center px-4 md:px-12 lg:px-20 py-12 overflow-hidden"
    >
      <div className="w-full md:w-2/3 lg:w-3/5 md:ml-[5%] lg:ml-[8%]">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-10"
        >
          What our clients say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video testimonial - featured */}
          {videoTestimonial && (
            <div className="lg:row-span-2">
              <div className="relative h-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-6 flex flex-col">
                {/* Video */}
                <div className="relative flex-1 mb-4">
                  <video
                    className="w-full h-full rounded-2xl object-cover"
                    controls
                    preload="metadata"
                    poster={"poster" in videoTestimonial ? videoTestimonial.poster : videoTestimonial.image}
                  >
                    <source src={videoTestimonial.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-200/50">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={videoTestimonial.image}
                      alt={videoTestimonial.author}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <a
                      href={videoTestimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-neutral-800 hover:text-neutral-600 transition-colors"
                    >
                      {videoTestimonial.author}
                    </a>
                    <p className="text-sm text-neutral-500">
                      {videoTestimonial.role} at {videoTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Text testimonials */}
          {textTestimonials.map((testimonial, index) => (
            <div key={index}>
              <div className="relative h-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-6 flex flex-col">
                {/* Decorative gradient blob */}
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${testimonial.color} rounded-full blur-3xl opacity-20`}
                />

                {/* Large quote mark */}
                <div
                  className={`absolute top-4 right-6 text-6xl font-serif bg-gradient-to-br ${testimonial.color} bg-clip-text text-transparent opacity-20`}
                >
                  &ldquo;
                </div>

                {/* Quote */}
                <p className="relative text-base md:text-lg text-neutral-700 leading-relaxed flex-1 pr-6 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author info */}
                <div className="relative flex items-center gap-4 pt-4 border-t border-neutral-200/50">
                  {"image" in testimonial && testimonial.image ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-sm font-medium">
                        {testimonial.initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-neutral-800 hover:text-neutral-600 transition-colors"
                    >
                      {testimonial.author}
                    </a>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
