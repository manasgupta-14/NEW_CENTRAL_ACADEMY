import { useState } from "react";
import { CLASS_OPTIONS } from "../../data/values";
import { SCHOOL } from "../../data/school";
import { openWhatsApp } from "../../utils/whatsapp";
import { submitAdmission } from "../../utils/submit";
import FormField from "./FormField";
import SuccessState from "./SuccessState";
import Button from "../common/Button";

const EMPTY = { studentName: "", className: "", parentName: "", phone: "", email: "", message: "" };

// What the school receives on WhatsApp.
const buildMessage = (f) =>
  [
    `*New Admission Enquiry* - ${SCHOOL.name}`,
    "",
    `Student name: ${f.studentName}`,
    `Class: ${f.className}`,
    `Parent/Guardian: ${f.parentName}`,
    `Phone: ${f.phone}`,
    f.email ? `Email: ${f.email}` : null,
    f.message ? `Message: ${f.message}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

function AdmissionForm() {
  const [form, setForm] = useState(EMPTY);
  const [waLink, setWaLink] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Enquiry pehle database me save hoti hai, phir WhatsApp khulta hai (tap Send there).
  // Agar server band ho to bhi WhatsApp khul jata hai, enquiry kho nahi jaati.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAdmission(form);
    } catch {
      /* server down: WhatsApp fallback neeche */
    }
    setWaLink(openWhatsApp(buildMessage(form)));
  };

  if (waLink) {
    return (
      <SuccessState
        title={`Thank you, ${form.parentName || "there"}!`}
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="saffron" href={waLink} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
            </Button>
            <Button variant="outline" onClick={() => { setForm(EMPTY); setWaLink(""); }}>
              New enquiry
            </Button>
          </div>
        }
      >
        WhatsApp has opened with your enquiry for {form.studentName || "your child"} ({form.className}). Please tap{" "}
        <strong className="font-semibold text-navy-900">Send</strong> there to share it with the school. If it did not
        open, use the button below.
      </SuccessState>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Student name" name="studentName" required value={form.studentName} onChange={handleChange} placeholder="e.g. Aarav Singh" />
        <FormField label="Class applying for" as="select" name="className" required value={form.className} onChange={handleChange}>
          <option value="" disabled>Select class</option>
          {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Parent / guardian name" name="parentName" required value={form.parentName} onChange={handleChange} placeholder="e.g. Ramesh Singh" />
        <FormField label="Phone number" type="tel" name="phone" required pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
      </div>
      <FormField label="Email (optional)" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      <FormField label="Message (optional)" as="textarea" name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Anything you'd like us to know" />
      <Button type="submit" className="mt-1 justify-self-start px-7">Submit on WhatsApp</Button>
      <p className="text-xs leading-relaxed text-ink-900/55">
        Submitting opens WhatsApp with your details filled in. Tap Send there to reach the school.
      </p>
    </form>
  );
}

export default AdmissionForm;
