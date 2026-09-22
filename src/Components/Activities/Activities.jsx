import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import { ACTIVITIES } from "./activitiesData.jsx";

function Activities() {
  const featured = ACTIVITIES.slice(0, 3);

  return (
    <section className="bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-saffron-600 font-medium text-sm tracking-wide">Beyond the classroom</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3">
                Activities
              </h2>
            </div>
            <Link
              to="/activities"
              className="hidden sm:inline-flex items-center gap-2 bg-navy-900 text-paper-50 px-6 py-3 rounded-full font-semibold hover:bg-saffron-600 transition-colors duration-300 shadow-sm hover:-translate-y-0.5"
            >
              View All Activities
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {featured.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="h-full bg-paper-50 border border-navy-900/10 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbf6ec" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900 mt-5">
                  {item.title}
                </h3>
                <p className="text-ink-900/65 mt-2 leading-relaxed">
                  {item.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="flex sm:hidden mt-10">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 bg-navy-900 text-paper-50 px-6 py-3 rounded-full font-semibold hover:bg-saffron-600 transition-colors duration-300 shadow-sm"
          >
            View All Activities
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default Activities;
