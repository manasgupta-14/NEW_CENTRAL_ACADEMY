import { FACILITIES } from "../../data/facilities";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";
import AdmissionCTA from "../../components/home/AdmissionCTA";

// Full Facilities page (Navbar > Facilities). Home shows a short list via components/home/FacilitiesSection.jsx
function Facilities() {
  return (
    <>
      <PageHero
        title="Facilities"
        intro="Everything a child needs for a safe, comfortable and active school day."
      />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((item, i) => (
              <Reveal key={item.label} delay={(i % 3) * 100} from={i % 2 ? "right" : "left"}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-navy-900/10 bg-paper-100 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-saffron-500 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-100 text-navy-900 transition-all duration-300 group-hover:rotate-[8deg] group-hover:scale-110 group-hover:bg-saffron-500 group-hover:text-paper-50">
                    <Icon d={item.icon} size={26} />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-navy-900">{item.label}</h2>
                  <p className="mt-2 leading-relaxed text-ink-900/65">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AdmissionCTA />
    </>
  );
}

export default Facilities;
