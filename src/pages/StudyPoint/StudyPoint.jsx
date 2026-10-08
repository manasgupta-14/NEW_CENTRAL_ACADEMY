import { Link } from "react-router-dom";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";
import { PLAYWAY_GROUP } from "../../data/study/playwayLkgUkg";
import { CLASS_1_5_GROUP } from "../../data/study/class1to5";
import { CLASS_6_8_GROUP } from "../../data/study/class6to8";

const GROUPS = [
  { group: PLAYWAY_GROUP, note: "Alphabets, numbers, shapes, rhymes and drawing, made for little learners.", icon: ICONS.book },
  { group: CLASS_1_5_GROUP, note: "Matra, tables, maths practice, units and English vocabulary.", icon: ICONS.book },
  { group: CLASS_6_8_GROUP, note: "Mental maths, squares and cubes, unit conversion and vocabulary.", icon: ICONS.book },
];

function StudyPoint() {
  return (
    <>
      <PageHero title="Study Point" intro="Interactive learning for every stage. Pick your class and start." />
      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {GROUPS.map(({ group, note, icon }, i) => (
              <Reveal key={group.slug} delay={i * 110} from="zoom">
                <Link
                  to={group.basePath}
                  className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-paper-100 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600">
                    <Icon d={icon} />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-navy-900">{group.title}</h2>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-900/65">{note}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
                    Explore <Icon d={ICONS.arrow} size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
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

export default StudyPoint;
