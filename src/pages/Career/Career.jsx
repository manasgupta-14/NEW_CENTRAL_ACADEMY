import { useState } from "react";
import { SCHOOL } from "../../data/school";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";
import SuccessState from "../../components/forms/SuccessState";

const EMPTY = { name: "", phone: "", role: "", about: "" };

function Career() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <>
      <PageHero
        title="Careers"
        intro="Love working with children? Tell us about yourself and we will keep your details for upcoming vacancies."
      />
      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <Reveal from="left">
            <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">Teach at {SCHOOL.name}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-900/70">
              We look for patient, well-prepared teachers who care about discipline and values as much as marks.
              There are no vacancies listed online right now, but you can register your interest here.
            </p>
            <p className="mt-4 max-w-md leading-relaxed text-ink-900/70">
              You can also visit the school office at {SCHOOL.address[0]} or call {SCHOOL.phones[0].label}.
            </p>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div className="rounded-3xl border border-navy-900/10 bg-paper-100 p-6 sm:p-9">
              {sent ? (
                <SuccessState
                  title="Thank you for your interest"
                  action={<Button variant="outline" onClick={() => { setForm(EMPTY); setSent(false); }}>Send another</Button>}
                >
                  We&rsquo;ve noted your details, {form.name || "there"}. The school office will contact you if a suitable position opens.
                </SuccessState>
              ) : (
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Full name" name="name" required value={form.name} onChange={onChange} />
                    <FormField label="Phone number" type="tel" name="phone" required pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={form.phone} onChange={onChange} />
                  </div>
                  <FormField label="Position or subject" name="role" required value={form.role} onChange={onChange} placeholder="e.g. Maths teacher, Class 6-8" />
                  <FormField label="Qualification and experience" as="textarea" rows={4} name="about" required value={form.about} onChange={onChange} />
                  <Button type="submit" className="mt-1 justify-self-start px-7">Register interest</Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Career;
