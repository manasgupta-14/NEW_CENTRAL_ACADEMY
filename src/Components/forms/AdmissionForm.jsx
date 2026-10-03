import { useState } from "react";
import { CLASS_OPTIONS } from "../../data/values";
import FormField from "./FormField";
import SuccessState from "./SuccessState";
import Button from "../common/Button";

const EMPTY = { studentName: "", className: "", parentName: "", phone: "", email: "", message: "" };

// Used inside the popup AND on the Admissions page.
export default function AdmissionForm({ onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet: show the confirmation. Connect your API here later.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessState
        title={`Thank you, ${form.studentName || "there"}!`}
        action={
          <Button onClick={() => { setForm(EMPTY); setSubmitted(false); onDone?.(); }}>
            {onDone ? "Close" : "Send another enquiry"}
          </Button>
        }
      >
        We&rsquo;ve received your admission enquiry for {form.className || "your child"}. Our team will call you
        on {form.phone || "your number"} shortly.
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
      <Button type="submit" className="mt-1 justify-self-start px-7">Submit enquiry</Button>
    </form>
  );
}
