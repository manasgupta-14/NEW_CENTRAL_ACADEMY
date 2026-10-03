import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";

const GROUPS = [
  { title: "Playway & LKG\u2013UKG", note: "Rhymes, alphabets, numbers and drawing sheets." },
  { title: "Class 1 \u2013 5", note: "Worksheets, notes and revision material by subject." },
  { title: "Class 6 \u2013 8", note: "Chapter notes, practice questions and syllabus." },
];

function StudyPoint() {
  return (
    <>
      <PageHero title="Study Point" intro="Notes, worksheets and revision material for every stage, in one place." />
      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 110} from="zoom">
                <div className="group h-full rounded-2xl border border-navy-900/10 bg-paper-100 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600">
                    <Icon d={ICONS.book} />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-navy-900">{g.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink-900/65">{g.note}</p>
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-saffron-100 px-3 py-1 text-xs font-medium text-saffron-600">
                    <Icon d={ICONS.lock} size={14} />
                    Coming soon
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default StudyPoint;
