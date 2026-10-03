import { ACTIVITIES } from "../../data/activities";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import ActivityCard from "../../components/home/ActivityCard";
import AdmissionCTA from "../../components/home/AdmissionCTA";

function Activities() {
  return (
    <>
      <PageHero
        title="Activities at New Central Academy"
        crumb="Activities"
        intro="Alongside the everyday syllabus, students take part in sports, arts and cultural activities that build confidence, teamwork and curiosity."
      />
      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100}>
                <ActivityCard item={item} tone="dark" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <AdmissionCTA />
    </>
  );
}

export default Activities;
