import { useState } from "react";
import { SCHOOL } from "../../data/school";
import { openWhatsApp } from "../../utils/whatsapp";
import FormField from "./FormField";
import SuccessState from "./SuccessState";
import Button from "../common/Button";

const STAR = "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z";
const RATING_WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
const ABOUT = ["Teaching & classes", "Admission process", "Facilities", "Fees & office", "Safety & discipline", "Other"];
// What the school receives on WhatsApp.
const buildMessage = (f, rating) =>
  [
    `*New Feedback* - ${SCHOOL.name}`,
    "",
    `Name: ${f.name} (${f.relation})`,
    f.phone ? `Phone: ${f.phone}` : null,
    `About: ${f.about}`,
    `Rating: ${rating}/5 (${RATING_WORDS[rating]})`,
    `Feedback: ${f.message}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

const EMPTY = { name: "", phone: "", relation: "", about: "", message: "" };

function FeedbackForm() {
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showError, setShowError] = useState(false);
  const [waLink, setWaLink] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setShowError(true);
      return;
    }
    // Opens WhatsApp with the feedback already typed in. The person taps Send there.
    setWaLink(openWhatsApp(buildMessage(form, rating)));
  };

  const reset = () => {
    setForm(EMPTY);
    setRating(0);
    setShowError(false);
    setWaLink("");
  };

  if (waLink) {
    return (
      <SuccessState
        title={`Thank you, ${form.name || "there"}!`}
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="saffron" href={waLink} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
            </Button>
            <Button variant="outline" onClick={reset}>Share more feedback</Button>
          </div>
        }
      >
        WhatsApp has opened with your feedback. Please tap{" "}
        <strong className="font-semibold text-navy-900">Send</strong> there to share it with the school. If it did not
        open, use the button below.
      </SuccessState>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Your name" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Ramesh Singh" />
        <FormField label="You are a" as="select" name="relation" required value={form.relation} onChange={handleChange}>
          <option value="" disabled>Select</option>
          <option>Parent</option>
          <option>Student</option>
          <option>Visitor</option>
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Feedback about" as="select" name="about" required value={form.about} onChange={handleChange}>
          <option value="" disabled>Select topic</option>
          {ABOUT.map((a) => <option key={a}>{a}</option>)}
        </FormField>
        <FormField label="Phone number (optional)" type="tel" name="phone" pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
      </div>

      <div>
        <span id="rating-label" className="mb-1.5 block text-sm font-medium text-navy-900">Your rating</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-labelledby="rating-label" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}, ${RATING_WORDS[n]}`}
              onClick={() => { setRating(n); setShowError(false); }}
              onMouseEnter={() => setHover(n)}
              className={`rounded-lg p-1 transition-transform duration-200 hover:scale-125 active:scale-95 ${n <= shown ? "text-saffron-500" : "text-navy-900/20"}`}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill={n <= shown ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                <path d={STAR} />
              </svg>
            </button>
          ))}
          <span className="ml-3 min-w-24 text-sm text-ink-900/60" aria-live="polite">{RATING_WORDS[shown]}</span>
        </div>
        {showError && <p role="alert" className="mt-1.5 text-sm text-maroon-700">Please choose a star rating.</p>}
      </div>

      <FormField label="Your feedback" as="textarea" name="message" rows={4} required value={form.message} onChange={handleChange} placeholder="Tell us what went well and what we can improve" />
      <Button type="submit" className="mt-1 justify-self-start px-7">Submit on WhatsApp</Button>
      <p className="text-xs leading-relaxed text-ink-900/55">
        Submitting opens WhatsApp with your feedback filled in. Tap Send there to reach the school.
      </p>
    </form>
  );
}

export default FeedbackForm;
