import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SCHOOL } from "../../data/school";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";

const FAQS = [
  { q: "Which classes does the school teach?", a: `${SCHOOL.name} teaches ${SCHOOL.classes} in ${SCHOOL.medium}.` },
  { q: "How do I apply for admission?", a: "Use the Admissions page or the Apply button anywhere on the site, or call the school office. We will call you back to guide the next steps." },
  { q: "Where is the school located?", a: `${SCHOOL.address.join(", ")}. You can get directions from the Contact page.` },
  { q: "How can I check fee, attendance or result?", a: "Open Student Side in the menu and choose Fee, Attendance or Result. If online details are not available yet, the school office will help." },
  { q: "How do I reach the school office?", a: `Call ${SCHOOL.phones.map((p) => p.label).join(" or ")}, or send a message from the Contact page.` },
];

function Help() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero title="Help" intro="Quick answers for parents and students. Can't find yours? Call or message the office." />
      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_0.7fr] md:py-20">
          <div className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 70}>
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold text-navy-900 transition-colors hover:text-saffron-600"
                    >
                      {f.q}
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-saffron-500 text-navy-950" : "bg-saffron-100 text-navy-900 group-hover:bg-saffron-500"}`}>
                        <Icon d={ICONS.plus} size={18} />
                      </span>
                    </button>
                  </h2>
                  <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-5 leading-relaxed text-ink-900/70">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal from="right" delay={120}>
            <aside className="self-start rounded-3xl bg-navy-900 p-8 text-paper-50 md:sticky md:top-40">
              <h2 className="font-display text-xl font-semibold">Still need help?</h2>
              <p className="mt-3 leading-relaxed text-paper-50/70">Our office will be glad to help you.</p>
              <ul className="mt-6 space-y-3">
                {SCHOOL.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="inline-flex items-center gap-3 transition-colors hover:text-saffron-500">
                      <Icon d={ICONS.phone} size={18} />
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
              <NavLink to="/contact" className="mt-6 inline-block rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-saffron-600">
                Send a message
              </NavLink>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Help;
