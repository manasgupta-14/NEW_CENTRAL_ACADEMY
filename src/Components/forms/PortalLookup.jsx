import { useState } from "react";
import { SCHOOL } from "../../data/school";
import { ICONS } from "../../data/icons";
import PageHero from "../common/PageHero";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import Icon from "../common/Icon";
import FormField from "./FormField";
import { api } from "../../utils/api";

// Shared layout for Fee / Attendance / Result. Data backend se aata hai: POST /api/portal/<endpoint>.
function PortalLookup({ title, intro, icon, fields, submitLabel, help, endpoint, renderData }) {
  const [values, setValues] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
              {data ? (
                <div className="mt-6 animate-pop">
                  <h2 className="font-display text-xl font-semibold text-navy-900">{data.student.name}</h2>
                  <p className="text-sm text-ink-900/60">{data.student.className} &middot; {data.student.studentId}</p>
                  <div className="mt-5">{renderData(data)}</div>
                  <Button variant="outline" className="mt-6" onClick={() => setData(null)}>Search again</Button>
                </div>
              ) : (
                <form
                  className="mt-6 grid gap-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    try {
                      setData(await api(`/portal/${endpoint}`, { method: "POST", body: values }));
                    } catch (err) {
                      setError(err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
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
                  {error && <p role="alert" className="text-sm text-maroon-700">{error}</p>}
                  <Button type="submit" disabled={loading} className="mt-1 justify-self-start px-7 disabled:opacity-60">{loading ? "Please wait..." : submitLabel}</Button>
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
