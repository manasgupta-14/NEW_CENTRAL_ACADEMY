import React from "react";
import Reveal from "../common/Reveal";
import "./Programs.css";

const STAGES = [
  { step: "01", stage: "Playway & LKG\u2013UKG", note: "Pre-primary" },
  { step: "02", stage: "Class 1 \u2013 5", note: "Primary" },
  { step: "03", stage: "Class 6 \u2013 8", note: "Middle school" },
];

function Programs() {
  return (
    <section className="bg-navy-900 text-paper-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <p className="text-saffron-500 font-medium text-sm tracking-wide">The journey through school</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-3">
            Playway to Class 8th, one stage at a time
          </h2>
        </Reveal>

        <div className="programs-track mt-14">
          {STAGES.map((item, i) => (
            <Reveal key={item.step} delay={i * 120} className="programs-item">
              <div className="flex items-start gap-5">
                <span className="font-display text-3xl text-saffron-500/80">{item.step}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{item.stage}</h3>
                  <p className="text-paper-50/60 text-sm mt-1">{item.note}</p>
                </div>
              </div>
              {i < STAGES.length - 1 && <span className="programs-connector" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;
