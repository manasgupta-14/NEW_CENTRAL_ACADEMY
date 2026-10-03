import { FACILITIES } from "../../data/facilities";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import Icon from "../common/Icon";

function FacilitiesSection() {
  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeading eyebrow="On campus" title="Facilities" />

        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 90}>
              <div className="group flex items-center gap-4 border-t-2 border-navy-900/10 pt-5 transition-colors duration-300 hover:border-saffron-500">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-navy-900 transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:text-paper-50">
                  <Icon d={item.icon} size={20} />
                </div>
                <span className="font-medium text-navy-900">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FacilitiesSection;
