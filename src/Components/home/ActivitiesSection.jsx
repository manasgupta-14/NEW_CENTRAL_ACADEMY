import { ACTIVITIES } from "../../data/activities";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import SectionHeading from "../common/SectionHeading";
import ActivityCard from "./ActivityCard";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

function ActivitiesSection() {
  const featured = ACTIVITIES.slice(0, 3);

  return (
    <section className="bg-paper-100">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeading eyebrow="Beyond the classroom" title="Activities">
          <Button to="/activities" className="hidden sm:inline-flex">
            View all activities
            <Icon d={ICONS.arrow} size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <ActivityCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 flex sm:hidden">
          <Button to="/activities">View all activities</Button>
        </Reveal>
      </div>
    </section>
  );
}

export default ActivitiesSection;
