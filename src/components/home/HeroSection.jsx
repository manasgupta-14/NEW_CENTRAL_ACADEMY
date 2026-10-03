import { NavLink } from "react-router-dom";
import heroImg from "../../assets/Hero.jpg";
import { SCHOOL } from "../../data/school";
import useAdmission from "../../hooks/useAdmission";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

const FACTS = [SCHOOL.classes, SCHOOL.medium, "Knowledge, discipline & values"];

const dots = {
  backgroundImage: "radial-gradient(circle, rgba(236,142,44,0.16) 1.5px, transparent 1.5px)",
  backgroundSize: "26px 26px",
  WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, black, transparent)",
  maskImage: "radial-gradient(ellipse 70% 60% at 80% 20%, black, transparent)",
};

// One orchestrated entrance: each block rises in, 100ms apart.
const step = (n) => ({ animationDelay: `${n * 110}ms` });

function HeroSection() {
  const { openAdmission } = useAdmission();

  return (
    <section className="relative overflow-hidden bg-paper-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={dots} />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex animate-hero-in items-center gap-2 rounded-full bg-saffron-100 px-4 py-1.5 text-sm font-medium text-saffron-600" style={step(0)}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron-500" />
              </span>
              Admissions open &middot; Session {SCHOOL.session}
            </span>

            <h1 className="mt-6 animate-hero-in font-display text-4xl font-semibold leading-[1.08] text-navy-900 md:text-6xl" style={step(1)}>
              {SCHOOL.name}
            </h1>

            <p className="relative mt-3 inline-block animate-hero-in font-display text-xl italic text-saffron-600 md:text-2xl" style={step(2)}>
              {SCHOOL.tagline}
              <svg className="absolute -bottom-1.5 left-0 h-2.5 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 C 80 2, 220 2, 298 8" pathLength="1" strokeDasharray="1" className="animate-draw" fill="none" stroke="#ec8e2c" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </p>

            <p className="mt-6 max-w-lg animate-hero-in leading-relaxed text-ink-900/70" style={step(3)}>
              A neighbourhood school in Barhalganj, Gorakhpur, building a bright future for every child from Playway
              through Class 8, rooted in discipline and values.
            </p>

            <div className="mt-8 flex animate-hero-in flex-wrap gap-4" style={step(4)}>
              <Button onClick={openAdmission}>Apply for admission</Button>
              <Button variant="outline" to="/about">Explore school</Button>
            </div>

            <ul className="mt-9 flex animate-hero-in flex-wrap gap-x-6 gap-y-3 border-t border-navy-900/10 pt-7" style={step(5)}>
              {FACTS.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-sm text-ink-900/70">
                  <Icon d={ICONS.check} size={16} strokeWidth={2} className="text-saffron-500" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex animate-hero-in justify-center" style={step(2)}>
            <div aria-hidden="true" className="absolute -right-5 -top-6 h-[88%] w-[88%] animate-float rounded-[2.5rem] border-[3px] border-saffron-500/55" />
            <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border-4 border-paper-50 shadow-xl">
              <img
                src={heroImg}
                alt="Students and teachers of New Central Academy"
                className="h-[340px] w-full animate-ken object-cover md:h-[420px]"
              />
            </div>
            <NavLink
              to="/admissions"
              className="absolute -bottom-5 left-2 flex animate-float-delay flex-col rounded-2xl border border-navy-900/10 bg-paper-50 px-4 py-3 shadow-[0_10px_30px_rgba(22,35,63,0.12)] transition-colors hover:bg-saffron-100 md:-left-4"
            >
              <span className="font-display text-lg font-semibold text-navy-900">LKG&ndash;8</span>
              <span className="-mt-0.5 text-[11px] text-ink-900/60">Grades taught</span>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
