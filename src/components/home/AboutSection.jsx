import heroImg from "../../assets/Hero.jpg";
import { SCHOOL } from "../../data/school";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

// Short teaser on the Home page. The full story lives in pages/About/About.jsx
function AboutSection() {
  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal from="left">
            <div className="group relative">
              <div className="overflow-hidden rounded-[1.75rem] shadow-lg">
                <img
                  src={heroImg}
                  alt="New Central Academy campus"
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[380px]"
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-6 -right-6 -z-10 hidden h-28 w-28 rounded-2xl border-4 border-saffron-500 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 sm:block" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-medium tracking-wide text-saffron-600">About us</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                A neighbourhood school built on values
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-900/70">
                {SCHOOL.name} is an English medium school in Barhalganj, Gorakhpur, teaching {SCHOOL.classes}. We
                bring together attentive teaching, discipline and a caring campus so every child can learn, grow and
                build a bright future.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <blockquote className="mt-6 border-l-2 border-saffron-500 pl-5">
                <p className="font-display text-lg italic leading-relaxed text-ink-900/80">&ldquo;{SCHOOL.quote.text}&rdquo;</p>
                <cite className="mt-2 block text-sm not-italic text-ink-900/50">{SCHOOL.quote.by}</cite>
              </blockquote>
            </Reveal>
            <Reveal delay={260}>
              <Button to="/about" variant="outline" className="mt-8">
                Read our story
                <Icon d={ICONS.arrow} size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
