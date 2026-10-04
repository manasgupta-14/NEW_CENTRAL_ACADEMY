import { SCHOOL } from "../../data/school";
import Reveal from "../common/Reveal";
import Button from "../common/Button";

const dots = {
  backgroundImage: "radial-gradient(circle, rgba(22,35,63,0.14) 2px, transparent 2px)",
  backgroundSize: "28px 28px",
  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)",
  maskImage: "linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)",
};

// Used on Home, About and Activities.
function AdmissionCTA() {
  return (
    <section className="relative overflow-hidden bg-saffron-500">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={dots} />
      <div aria-hidden="true" className="absolute -left-10 -top-16 h-44 w-44 animate-float rounded-full border-[3px] border-navy-950/20" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-navy-950 md:text-4xl">
                Admissions are open for {SCHOOL.session}
              </h2>
              <p className="mt-3 max-w-lg text-navy-950/70">
                Visit the campus at Pohila Road, Mahuapar, Barhalganj, or call us to know more about seats for{" "}
                {SCHOOL.classes}.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-4">
              <Button variant="dark" to="/admissions" className="px-7 py-3.5">Apply for admission</Button>
              <Button variant="darkOutline" href={`tel:${SCHOOL.phones[0].tel}`} className="px-7 py-3.5">
                Call {SCHOOL.phones[0].label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AdmissionCTA;
