import React from "react";
import heroImg from "../../assets/Hero.jpg";
import Reveal from "../common/Reveal";

function ComingSoonTile() {
  return (
    <div className="h-full min-h-[140px] rounded-2xl border-2 border-dashed border-navy-900/15 flex flex-col items-center justify-center gap-2 text-ink-900/40">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8h3l2-2h6l2 2h3v11H4V8Z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </svg>
      <span className="text-xs">More photos soon</span>
    </div>
  );
}

function Gallery() {
  return (
    <section className="bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-saffron-600 font-medium text-sm tracking-wide">A peek inside</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3">
                Gallery
              </h2>
            </div>
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 text-navy-900 font-semibold hover:text-saffron-600 transition-colors"
            >
              View Full Gallery
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          <Reveal className="col-span-2 row-span-2">
            <div className="rounded-2xl overflow-hidden shadow-md h-full">
              <img
                src={heroImg}
                alt="School event at New Central Academy"
                className="w-full h-full min-h-[290px] object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={90}><ComingSoonTile /></Reveal>
          <Reveal delay={140}><ComingSoonTile /></Reveal>
          <Reveal delay={190}><ComingSoonTile /></Reveal>
          <Reveal delay={240}><ComingSoonTile /></Reveal>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
