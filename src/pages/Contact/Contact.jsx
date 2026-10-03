import { useState } from "react";
import { SCHOOL } from "../../data/school";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import FormField from "../../components/forms/FormField";
import SuccessState from "../../components/forms/SuccessState";
import MapSection from "../../components/home/MapSection";

const EMPTY = { name: "", phone: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero title="Contact us" intro="Call, visit or send a message. We usually reply within the school day." />

      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 md:grid-cols-[0.8fr_1.2fr] md:pt-20">
          <div className="space-y-5">
            <Reveal from="left">
              <div className="group flex gap-4 rounded-2xl border border-navy-900/10 bg-paper-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600"><Icon d={ICONS.pin} /></span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-navy-900">Visit</h2>
                  <p className="mt-1 text-ink-900/70">{SCHOOL.address[0]}<br />{SCHOOL.address[1]}</p>
                </div>
              </div>
            </Reveal>
            <Reveal from="left" delay={100}>
              <div className="group flex gap-4 rounded-2xl border border-navy-900/10 bg-paper-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600"><Icon d={ICONS.phone} /></span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-navy-900">Call</h2>
                  <ul className="mt-1 text-ink-900/70">
                    {SCHOOL.phones.map((p) => (
                      <li key={p.tel}><a href={`tel:${p.tel}`} className="transition-colors hover:text-saffron-600">{p.label}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal from="right" delay={80}>
            <div className="rounded-3xl border border-navy-900/10 bg-paper-100 p-6 sm:p-9">
              {sent ? (
                <SuccessState
                  title="Message received"
                  action={<Button variant="outline" onClick={() => { setForm(EMPTY); setSent(false); }}>Send another</Button>}
                >
                  Thank you, {form.name || "there"}. We will call you on {form.phone || "your number"} soon.
                </SuccessState>
              ) : (
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <h2 className="font-display text-2xl font-semibold text-navy-900">Send a message</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Your name" name="name" required value={form.name} onChange={onChange} />
                    <FormField label="Phone number" type="tel" name="phone" required pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={form.phone} onChange={onChange} />
                  </div>
                  <FormField label="Message" as="textarea" rows={5} name="message" required value={form.message} onChange={onChange} />
                  <Button type="submit" className="justify-self-start px-7">Send message</Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <MapSection heading={false} />
    </>
  );
}

export default Contact;
