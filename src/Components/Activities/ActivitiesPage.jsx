import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Reveal from "../common/Reveal";
import { ACTIVITIES } from "./activitiesData.jsx";

function ActivitiesPage() {
  return (
    <>
      <Navbar />

      <section className="bg-navy-900 text-paper-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <Reveal>
            <p className="text-saffron-500 font-medium text-sm tracking-wide">Beyond the classroom</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mt-3">
              Activities at New Central Academy
            </h1>
            <p className="text-paper-50/70 mt-4 max-w-xl leading-relaxed">
              Alongside the everyday syllabus, students take part in sports,
              arts and cultural activities that build confidence, teamwork
              and curiosity.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100}>
                <div className="h-full bg-paper-100 border border-navy-900/10 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ActivitiesPage;
