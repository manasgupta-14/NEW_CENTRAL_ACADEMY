import React from "react";
import Reveal from "../common/Reveal";

const FACILITIES = [
  { label: "Library", icon: <path d="M4 19V5a1 1 0 0 1 1-1h5v16H5a1 1 0 0 1-1-1Zm9 1V4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5Z" /> },
  { label: "Playground", icon: <path d="M12 3v18M5 21c0-4 3-6 7-6s7 2 7 6M9 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" /> },
  { label: "Smart Classrooms", icon: <path d="M3 5h18v11H3V5Zm5 15h8m-4-4v4" /> },
  { label: "Drinking Water", icon: <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" /> },
  { label: "Transport", icon: <path d="M3 16V8a1 1 0 0 1 1-1h13l4 4v5a1 1 0 0 1-1 1h-2M3 16a2 2 0 1 0 4 0M3 16h4m10 0a2 2 0 1 0 4 0m-4 0h4M13 7v9" /> },
  { label: "First-Aid & Care", icon: <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10ZM9.5 11h5M12 8.5v5" /> },
];

function Facilities() {
  return (
    <section className="bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <p className="text-saffron-600 font-medium text-sm tracking-wide">On campus</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3">
            Facilities
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mt-12">
          {FACILITIES.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 90}>
              <div className="flex items-center gap-4 border-t-2 border-navy-900/10 pt-5 group">
                <div className="shrink-0 w-11 h-11 rounded-full bg-saffron-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-saffron-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16233f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 group-hover:stroke-[#fbf6ec]">
                    {item.icon}
                  </svg>
                </div>
                <span className="font-medium text-navy-900">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Facilities;
