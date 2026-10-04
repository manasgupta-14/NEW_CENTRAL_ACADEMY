import { VISION, MISSION } from "../../data/leadership";
import Reveal from "../common/Reveal";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

const EYE = "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z";
const TARGET = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-2.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z";

function VisionMission() {
  return (
    <section className="bg-navy-900 text-paper-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 md:py-24">
        <Reveal from="left">
          <div className="group h-full rounded-3xl border border-paper-50/10 bg-navy-800/60 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-saffron-500/50 md:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-500 text-navy-950 transition-transform duration-300 group-hover:scale-110">
              <Icon d={EYE} size={26} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold">{VISION.title}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-paper-50/75">{VISION.text}</p>
          </div>
        </Reveal>

        <Reveal from="right" delay={100}>
          <div className="group h-full rounded-3xl border border-paper-50/10 bg-navy-800/60 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-saffron-500/50 md:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-500 text-navy-950 transition-transform duration-300 group-hover:scale-110">
              <Icon d={TARGET} size={26} />
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold">{MISSION.title}</h2>
            <ul className="mt-4 space-y-3.5">
              {MISSION.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-paper-50/75">
                  <Icon d={ICONS.check} size={18} strokeWidth={2.2} className="mt-1 shrink-0 text-saffron-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default VisionMission;
