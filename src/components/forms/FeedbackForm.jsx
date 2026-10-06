import { useState } from "react";
import { submitFeedback } from "../../utils/submit";
import FormField from "./FormField";
import SuccessState from "./SuccessState";
import Button from "../common/Button";

const STAR = "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z";
const RATING_WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
const ABOUT = ["Teaching & classes", "Admission process", "Facilities", "Fees & office", "Safety & discipline", "Other"];
const EMPTY = { name: "", phone: "", relation: "", about: "", message: "" };

function FeedbackForm() {
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showError, setShowError] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Feedback is NOT sent to WhatsApp. See utils/submit.js for where it goes.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setShowError(true);
      return;
    }
    setSending(true);
    setError("");
    try {
      await submitFeedback({ ...form, rating, ratingLabel: RATING_WORDS[rating] });
      setDone(true);
    } catch {
      setError("Could not submit right now. Please check your internet and try again.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setRating(0);
    setShowError(false);
    setDone(false);
    setError("");
  };

  if (done) {
    return (
      <SuccessState
        title={`Thank you, ${form.name || "there"}!`}
        action={<Button variant="outline" onClick={reset}>Share more feedback</Button>}
      >
        Your feedback has been received. It helps us make the school better.
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
      {error && <p role="alert" className="text-sm text-maroon-700">{error}</p>}
      <Button type="submit" disabled={sending} className="mt-1 justify-self-start px-7 disabled:opacity-60">
        {sending ? "Submitting..." : "Submit feedback"}
      </Button>
    </form>
  );
}

export default FeedbackForm;
