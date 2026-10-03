import { useState } from "react";
import { SCHOOL } from "../../data/school";
import { ICONS } from "../../data/icons";
import PageHero from "../common/PageHero";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import Icon from "../common/Icon";
import FormField from "./FormField";
import SuccessState from "./SuccessState";

// Shared layout for Fee / Attendance / Result. Online records aren't connected yet,
// so submitting shows an honest "ask the office" message instead of fake data.
function PortalLookup({ title, intro, icon, fields, submitLabel, help }) {
  const [values, setValues] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero title={title} intro={intro} />
      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <Reveal from="left">
            <div className="rounded-3xl border border-navy-900/10 bg-paper-100 p-6 sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-paper-50">
                <Icon d={icon} />
              </div>
              {sent ? (
                <SuccessState
                  title="Online records are being set up"
                  action={<Button variant="outline" onClick={() => setSent(false)}>Search again</Button>}
                >
                  We couldn&rsquo;t fetch details for {values.admissionNo || "this admission number"} online yet.
                  Please call the school office on {SCHOOL.phones[0].label} and we&rsquo;ll help right away.
                </SuccessState>
              ) : (
                <form
                  className="mt-6 grid gap-4"
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                >
                  {fields.map((f) => (
                    <FormField key={f.name} {...f} required value={values[f.name] ?? ""} onChange={onChange}>
                      {f.options && (
                        <>
                          <option value="" disabled>Select</option>
                          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </>
                      )}
                    </FormField>
                  ))}
                  <Button type="submit" className="mt-1 justify-self-start px-7">{submitLabel}</Button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="rounded-3xl bg-navy-900 p-8 text-paper-50">
              <h2 className="font-display text-xl font-semibold">Need help?</h2>
              <p className="mt-3 leading-relaxed text-paper-50/70">{help}</p>
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default PortalLookup;
