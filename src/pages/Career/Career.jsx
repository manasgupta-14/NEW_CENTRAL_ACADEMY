import { useRef, useState } from "react";
import { SCHOOL } from "../../data/school";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Button from "../../components/common/Button";
import FormField from "../../components/forms/FormField";
import SuccessState from "../../components/forms/SuccessState";
import Icon from "../../components/common/Icon";
import { ICONS } from "../../data/icons";
import { submitApplication } from "../../utils/submit";

const EMPTY = { name: "", phone: "", role: "", about: "" };

const MAX_MB = 5;
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

const formatSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

// Returns an error message, or "" when the file is fine.
function checkResume(file) {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) return "Please upload a PDF, DOC or DOCX file.";
  if (file.size > MAX_MB * 1024 * 1024) return `File is too large. Maximum size is ${MAX_MB} MB.`;
  return "";
}

function Career() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const problem = checkResume(file);
    setResumeError(problem);
    setResume(problem ? null : file);
    if (problem) e.target.value = "";
  };

  const removeFile = () => {
    setResume(null);
    setResumeError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const reset = () => {
    setForm(EMPTY);
    removeFile();
    setError("");
    setSent(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await submitApplication(form, resume);
      setSent(true);
    } catch {
      setError("Could not submit right now. Please check your internet and try again.");
    } finally {
      setSending(false);
    }
  };

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
                  action={<Button variant="outline" onClick={reset}>Send another</Button>}
                >
                  We&rsquo;ve noted your details, {form.name || "there"}. The school office will contact you if a suitable position opens.
                </SuccessState>
              ) : (
                <form className="grid gap-4" onSubmit={onSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Full name" name="name" required value={form.name} onChange={onChange} />
                    <FormField label="Phone number" type="tel" name="phone" required pattern="[0-9]{10}" title="Enter a 10-digit phone number" value={form.phone} onChange={onChange} />
                  </div>
                  <FormField label="Position or subject" name="role" required value={form.role} onChange={onChange} placeholder="e.g. Maths teacher, Class 6-8" />
                  <FormField label="Qualification and experience" as="textarea" rows={4} name="about" required value={form.about} onChange={onChange} />

                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-navy-900">Resume (optional)</span>
                    <input
                      ref={fileRef}
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={onFile}
                      className="sr-only"
                    />
                    {resume ? (
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-saffron-500/40 bg-saffron-100/60 px-4 py-3">
                        <span className="flex min-w-0 items-center gap-3 text-sm text-navy-900">
                          <Icon d={ICONS.check} size={18} strokeWidth={2.2} className="shrink-0 text-saffron-600" />
                          <span className="truncate">{resume.name}</span>
                          <span className="shrink-0 text-ink-900/50">{formatSize(resume.size)}</span>
                        </span>
                        <button type="button" onClick={removeFile} aria-label="Remove resume" className="shrink-0 rounded-full p-1 text-navy-900/60 transition-colors hover:text-maroon-700">
                          <Icon d={ICONS.close} size={18} />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="resume"
                        className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-navy-900/20 bg-paper-50 px-4 py-6 text-center transition-colors duration-300 hover:border-saffron-500 hover:bg-saffron-100/40 focus-within:border-saffron-500"
                      >
                        <Icon d={ICONS.plus} size={22} className="text-saffron-600" />
                        <span className="text-sm font-medium text-navy-900">Click to upload your resume</span>
                        <span className="text-xs text-ink-900/55">PDF, DOC or DOCX, up to {MAX_MB} MB</span>
                      </label>
                    )}
                    {resumeError && <p role="alert" className="mt-1.5 text-sm text-maroon-700">{resumeError}</p>}
                  </div>

                  {error && <p role="alert" className="text-sm text-maroon-700">{error}</p>}
                  <Button type="submit" disabled={sending} className="mt-1 justify-self-start px-7 disabled:opacity-60">
                    {sending ? "Submitting..." : "Register interest"}
                  </Button>
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
