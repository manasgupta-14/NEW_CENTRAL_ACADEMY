import React from "react";
import Reveal from "../common/Reveal";

const VALUES = [
  {
    title: "Value-based learning",
    text: "Lessons in the classroom go hand in hand with discipline, respect and character, in the spirit New Central Academy was built on.",
    icon: (
      <path d="M12 3 4 7v5c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V7l-8-4Z" />
    ),
  },
  {
    title: "Caring, attentive teachers",
    text: "Small, familiar classrooms from Playway to Class 8 mean every child is known by name, not just by roll number.",
    icon: (
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.3 3.1-6 7-6s7 2.7 7 6" />
    ),
  },
  {
    title: "Safe, welcoming campus",
    text: "A neighbourhood campus on Pohila Road, Mahuapar, where children can learn and play with confidence.",
    icon: (
      <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" />
    ),
  },
  {
    title: "Activities beyond textbooks",
    text: "Co-curricular activities and events run through the year, alongside the everyday classroom syllabus.",
    icon: (
      <path d="M12 2v20M4.5 7.5 12 2l7.5 5.5M4.5 16.5 12 22l7.5-5.5" />
    ),
  },
];

function WhyUs() {
  return (
    <section className="bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-14">
          {/* Left — heading + quote, sticky on desktop */}
          <div className="md:sticky md:top-28 self-start">
            <Reveal>
              <p className="text-saffron-600 font-medium text-sm tracking-wide">Why families choose us</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3 leading-tight">
                Built on knowledge,
                <br />discipline and values
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="mt-8 border-l-2 border-saffron-500 pl-5">
                <p className="font-display italic text-lg text-ink-900/80 leading-relaxed">
                  &ldquo;Arise, awake, and stop not till the goal is reached.&rdquo;
                </p>
                <cite className="block not-italic text-sm text-ink-900/50 mt-2">
                  Swami Vivekananda
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* Right — value list */}
          <div className="divide-y divide-navy-900/10">
            {VALUES.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="flex gap-5 py-7 first:pt-0 group">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center transition-colors duration-300 group-hover:bg-saffron-600">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbf6ec" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="text-ink-900/65 mt-1.5 leading-relaxed max-w-md">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
