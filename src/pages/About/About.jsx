import heroImg from "../../assets/Hero.jpg";
import { SCHOOL } from "../../data/school";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";
import WhyUsSection from "../../components/home/WhyUsSection";
import ProgramsSection from "../../components/home/ProgramsSection";
import AdmissionCTA from "../../components/home/AdmissionCTA";

const PILLARS = [
  { title: "Knowledge", text: "A steady, well-paced syllabus taught in English medium from Playway to Class 8.", icon: "M4 19V5a1 1 0 0 1 1-1h5v16H5a1 1 0 0 1-1-1Zm9 1V4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5Z" },
  { title: "Discipline", text: "Punctuality, respect and routine that children carry beyond the school gate.", icon: "M12 3 4 7v5c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V7l-8-4Z" },
  { title: "Values", text: "Honesty, kindness and responsibility taught alongside every subject.", icon: "M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10Z" },
];

// Full About page (Navbar > About). The short teaser on Home is components/home/AboutSection.jsx
function About() {
  return (
    <>
      <PageHero
        title={`About ${SCHOOL.name}`}
        crumb="About"
        intro="An English medium school in Barhalganj, Gorakhpur, built on knowledge, discipline and values."
      />

      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
          <Reveal from="left">
            <div className="group relative">
              <div className="overflow-hidden rounded-[1.75rem] shadow-lg">
                <img src={heroImg} alt="Students and teachers at New Central Academy" className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[440px]" />
              </div>
              <div aria-hidden="true" className="absolute -bottom-6 -left-6 -z-10 hidden h-32 w-32 rounded-2xl border-4 border-saffron-500 sm:block" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">Our story</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-900/70">
                {SCHOOL.name} serves families of Barhalganj and nearby villages with a school that feels close to home.
                Children are taught {SCHOOL.classes} in an English medium setting, with teachers who know each child
                by name.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-900/70">
                We believe good schooling is more than marks. It is a daily habit of learning, discipline and good
                character, and that is what we work on with every class.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <blockquote className="mt-6 border-l-2 border-saffron-500 pl-5">
                <p className="font-display text-lg italic leading-relaxed text-ink-900/80">&ldquo;{SCHOOL.quote.text}&rdquo;</p>
                <cite className="mt-2 block text-sm not-italic text-ink-900/50">{SCHOOL.quote.by}</cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-navy-900 md:text-4xl">What we stand for</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} from="zoom">
                <div className="group h-full rounded-2xl border border-navy-900/10 bg-paper-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-100 text-navy-900 transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:text-paper-50">
                    <Icon d={p.icon} size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-900/65">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyUsSection />
      <ProgramsSection />
      <AdmissionCTA />
    </>
  );
}

export default About;
