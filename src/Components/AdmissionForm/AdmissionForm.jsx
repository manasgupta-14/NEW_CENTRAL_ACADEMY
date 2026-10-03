import React, { useEffect, useState } from "react";
import "./AdmissionForm.css";

const CLASS_OPTIONS = [
  "Playway",
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
];

function AdmissionForm({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    className: "",
    parentName: "",
    phone: "",
    email: "",
    message: "",
  });

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Reset state each time the modal is freshly opened.
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setForm({
        studentName: "",
        className: "",
        parentName: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend is wired up yet — record locally and show a confirmation.
    setSubmitted(true);
  };

  return (
    <div
      className="admission-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-form-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="admission-panel">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admission form"
          className="admission-close"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-saffron-100 text-saffron-600 flex items-center justify-center mx-auto text-2xl">
              &#10003;
            </div>
            <h3 className="font-display text-2xl font-semibold text-navy-900 mt-4">
              Thank you, {form.studentName || "there"}!
            </h3>
            <p className="text-ink-900/70 mt-2 max-w-sm mx-auto">
              We&rsquo;ve received your admission enquiry for{" "}
              {form.className || "your child"}. Our team will call you on{" "}
              {form.phone || "your number"} shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 bg-navy-900 text-paper-50 px-6 py-2.5 rounded-full font-medium text-sm hover:bg-saffron-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p
              id="admission-form-title-eyebrow"
              className="text-saffron-600 font-medium text-sm tracking-wide"
            >
              Admissions 2026&ndash;27
            </p>
            <h3
              id="admission-form-title"
              className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mt-1"
            >
              Apply for Admission
            </h3>
            <p className="text-ink-900/60 text-sm mt-2">
              Fill in a few details and our team will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="admission-field">
                  <span>Student Name</span>
                  <input
                    type="text"
                    name="studentName"
                    required
                    value={form.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Singh"
                  />
                </label>

                <label className="admission-field">
                  <span>Class Applying For</span>
                  <select
                    name="className"
                    required
                    value={form.className}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select class
                    </option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="admission-field">
                  <span>Parent / Guardian Name</span>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={form.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Singh"
                  />
                </label>

                <label className="admission-field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </label>
              </div>

              <label className="admission-field">
                <span>Email (optional)</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>

              <label className="admission-field">
                <span>Message (optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything you'd like us to know"
                />
              </label>

              <button
                type="submit"
                className="mt-2 bg-navy-900 text-paper-50 px-7 py-3 rounded-full font-semibold hover:bg-saffron-600 transition-colors duration-300 shadow-md justify-self-start"
              >
                Submit Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;
