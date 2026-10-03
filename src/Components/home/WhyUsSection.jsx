import { SCHOOL } from "../../data/school";
import { VALUES } from "../../data/values";
import Reveal from "../common/Reveal";
import Icon from "../common/Icon";

// Used on Home and on the About page.
function WhyUsSection() {
  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div className="self-start md:sticky md:top-40">
            <Reveal>
              <p className="text-sm font-medium tracking-wide text-saffron-600">Why families choose us</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy-900 md:text-4xl">
                Built on knowledge,
                <br />
                discipline and values
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <blockquote className="mt-8 border-l-2 border-saffron-500 pl-5">
                <p className="font-display text-lg italic leading-relaxed text-ink-900/80">&ldquo;{SCHOOL.quote.text}&rdquo;</p>
                <cite className="mt-2 block text-sm not-italic text-ink-900/50">{SCHOOL.quote.by}</cite>
              </blockquote>
            </Reveal>
          </div>

          <div className="divide-y divide-navy-900/10">
            {VALUES.map((item, i) => (
              <Reveal key={item.title} from="right" delay={i * 90}>
                <div className="group flex gap-5 py-7 first:pt-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-600">
                    <Icon d={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-1.5 max-w-md leading-relaxed text-ink-900/65">{item.text}</p>
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

export default WhyUsSection;
