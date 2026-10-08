import { Link } from "react-router-dom";
import PageHero from "../common/PageHero";
import Reveal from "../common/Reveal";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

// The "pick your class" screen of a group, e.g. the 3 cards Playway / LKG / UKG.
export default function ClassPicker({ group, classes, intro }) {
  return (
    <>
      <PageHero title={group.title} intro={intro} crumb={group.title} />
      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link to="/study-point" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-navy-900/70 transition-colors hover:text-saffron-600">
            <Icon d={ICONS.arrow} size={16} className="rotate-180" /> Study Point
          </Link>
          <div className={`grid gap-6 sm:grid-cols-2 ${classes.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>
            {classes.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90} from="zoom">
                <Link
                  to={`${group.basePath}/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-paper-100 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-2xl transition-colors duration-300 group-hover:bg-saffron-600" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-navy-900">{c.title}</h2>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-900/65">{c.note}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
                    {c.tools.length} topics <Icon d={ICONS.arrow} size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
