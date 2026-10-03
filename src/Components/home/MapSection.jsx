import { SCHOOL } from "../../data/school";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import SectionHeading from "../common/SectionHeading";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

const MAP_QUERY = encodeURIComponent(SCHOOL.fullAddress);

// Used on Home and on the Contact page.
function MapSection({ heading = true }) {
  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        {heading && <SectionHeading eyebrow="Visit us" title="Find us" />}

        <Reveal delay={100}>
          <div className={`grid items-stretch gap-8 md:grid-cols-[1fr_1.4fr] ${heading ? "mt-10" : ""}`}>
            <div className="flex flex-col justify-between rounded-2xl bg-navy-900 p-8 text-paper-50">
              <div>
                <h3 className="font-display text-xl font-semibold">{SCHOOL.name}</h3>
                <p className="mt-3 leading-relaxed text-paper-50/70">
                  {SCHOOL.address[0]}
                  <br />
                  {SCHOOL.address[1]}
                </p>
                <p className="mt-4 text-paper-50/70">{SCHOOL.phones.map((p) => p.label).join(" \u00b7 ")}</p>
              </div>
              <Button
                variant="saffron"
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-fit"
              >
                Get directions
                <Icon d={ICONS.arrow} size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="min-h-[280px] overflow-hidden rounded-2xl shadow-md">
              <iframe
                title="New Central Academy location map"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default MapSection;
