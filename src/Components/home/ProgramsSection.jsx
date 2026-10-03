import { STAGES } from "../../data/values";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

// Used on Home and on the About page. The numbers are real: it's a 3-step journey.
function ProgramsSection() {
  return (
    <section className="bg-navy-900 text-paper-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeading light eyebrow="The journey through school" title="Playway to Class 8th, one stage at a time" />

        <div className="mt-14 grid gap-7 md:grid-cols-3 md:gap-10">
          {STAGES.map((item, i) => (
            <Reveal key={item.stage} delay={i * 140}>
              <div className="group relative border-t-2 border-paper-50/15 pt-6">
                {/* saffron line sweeps across on hover */}
                <span aria-hidden="true" className="absolute -top-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-saffron-500 transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start gap-5">
                  <span className="font-display text-3xl text-saffron-500/80 transition-transform duration-300 group-hover:-translate-y-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.stage}</h3>
                    <p className="mt-1 text-sm text-paper-50/60">{item.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
