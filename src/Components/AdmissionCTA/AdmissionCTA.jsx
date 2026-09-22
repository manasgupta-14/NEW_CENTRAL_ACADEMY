import React from "react";
import Reveal from "../common/Reveal";
import "./AdmissionCTA.css";

function AdmissionCTA() {
  return (
    <section className="relative overflow-hidden bg-saffron-500">
      <div className="cta-pattern" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-950 leading-tight">
                Admissions are open for 2026&ndash;27
              </h2>
              <p className="text-navy-950/70 mt-3 max-w-lg">
                Visit the campus at Pohila Road, Mahuapar, Barhalganj, or call
                us to know more about seats for Playway to Class 8th.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <button className="bg-navy-950 text-paper-50 px-7 py-3.5 rounded-full font-semibold hover:bg-navy-800 transition-colors duration-300 shadow-md hover:-translate-y-0.5">
                Apply for Admission
              </button>
              <a
                href="tel:9935217161"
                className="border-2 border-navy-950 text-navy-950 px-7 py-3.5 rounded-full font-semibold hover:bg-navy-950 hover:text-paper-50 transition-colors duration-300"
              >
                Call 9935217161
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AdmissionCTA;
