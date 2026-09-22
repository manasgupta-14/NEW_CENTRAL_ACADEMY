import React from "react";
import heroImg from "../../assets/Hero.jpg";
import "../common/animations.css";
import "./Hero.css";

const FACTS = [
  { label: "Playway to Class 8th" },
  { label: "English Medium" },
  { label: "Knowledge, discipline & values" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper-50">
      {/* faint dotted texture, grounded in the notion of a rangoli/marigold pattern rather than a generic gradient wash */}
      <div className="hero-texture" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] items-center gap-14">
          {/* Left content */}
          <div>
            <span className="hero-anim delay-1 inline-flex items-center gap-2 rounded-full bg-saffron-100 text-saffron-600 px-4 py-1.5 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />
              Admissions open &middot; Session 2026&ndash;27
            </span>

            <h1 className="hero-anim delay-2 font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-[1.08] mt-6">
              New Central Academy
            </h1>

            <p className="hero-anim delay-3 relative inline-block font-display italic text-xl md:text-2xl text-saffron-600 mt-3">
              Where young minds learn, grow and lead
              <svg
                className="hero-underline"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M2 8 C 80 2, 220 2, 298 8" />
              </svg>
            </p>

            <p className="hero-anim delay-4 text-ink-900/70 mt-6 max-w-lg leading-relaxed">
              A neighbourhood school in Barhalganj, Gorakhpur, building a
              bright future for every child from Playway through Class 8,
              rooted in discipline and values.
            </p>

            <div className="hero-anim delay-5 flex flex-wrap gap-4 mt-8">
              <button className="bg-navy-900 text-paper-50 px-6 py-3 rounded-full font-semibold hover:bg-saffron-600 transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Apply for Admission
              </button>
              <button className="border-2 border-navy-900 text-navy-900 px-6 py-3 rounded-full font-semibold hover:bg-navy-900 hover:text-paper-50 transition-colors duration-300">
                Explore School
              </button>
            </div>

            <div className="hero-anim delay-6 flex flex-wrap gap-x-6 gap-y-3 mt-9 pt-7 border-t border-navy-900/10">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2 text-sm text-ink-900/70">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5 6.2 12 13 4" stroke="#ec8e2c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {fact.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="hero-anim delay-3 flex justify-center relative">
            <div className="hero-ring" aria-hidden="true" />
            <div className="relative w-full max-w-xl rounded-[2rem] overflow-hidden shadow-xl border-4 border-paper-50">
              <img
                src={heroImg}
                alt="Students and teachers of New Central Academy"
                className="w-full h-[340px] md:h-[420px] object-cover"
              />
            </div>
            <div className="hero-badge" aria-hidden="true">
              <span className="font-display font-semibold text-lg text-navy-900">LKG&ndash;8</span>
              <span className="text-[11px] text-ink-900/60 -mt-0.5">Grades taught</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
