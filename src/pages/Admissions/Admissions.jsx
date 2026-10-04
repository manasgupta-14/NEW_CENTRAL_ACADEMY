import { useState } from "react";
import { SCHOOL } from "../../data/school";
import { CLASS_OPTIONS } from "../../data/values";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Icon from "../../components/common/Icon";
import AdmissionForm from "../../components/forms/AdmissionForm";
import FeedbackForm from "../../components/forms/FeedbackForm";

const TABS = [
  { key: "enquiry", label: "Admission Enquiry" },
  { key: "feedback", label: "Feedback" },
];

const STEPS = [
  { title: "Send an enquiry", text: "Fill the form on this page or call the school office." },
  { title: "Visit the campus", text: "Meet the teachers and see the classrooms and playground." },
  { title: "Confirm admission", text: "The office guides you through the remaining formalities." },
];

const FEEDBACK_POINTS = [
  "Tell us what we are doing well.",
  "Point out where we can improve.",
  "Suggestions from parents and students are shared with the school team.",
];

function CallCard({ title }) {
  return (
    <div className="rounded-2xl bg-navy-900 p-7 text-paper-50">
      <p className="font-display text-lg font-semibold">{title}</p>
      <ul className="mt-4 space-y-2.5">
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
  );
}

// "Admission Desk": one place for admission enquiries and general feedback.
function Admissions() {
  const [tab, setTab] = useState("enquiry");
  const isEnquiry = tab === "enquiry";

  return (
    <>
      <PageHero
        title="Admission Desk"
        crumb="Admissions"
        intro={`Seats are open for ${SCHOOL.session} from ${SCHOOL.classes}. Send an enquiry, or share your feedback with us.`}
      />

      <section className="bg-paper-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <Reveal from="left">
            <div className="rounded-3xl border border-navy-900/10 bg-paper-100 p-6 sm:p-9">
              {/* Enquiry / Feedback switch with a sliding pill */}
              <div className="relative mb-7 grid grid-cols-2 rounded-full bg-paper-50 p-1" role="group" aria-label="Choose form">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/2)] rounded-full bg-navy-900 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(${TABS.findIndex((t) => t.key === tab) * 100}%)` }}
                />
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    aria-pressed={tab === t.key}
                    onClick={() => setTab(t.key)}
                    className={`relative z-10 rounded-full py-2.5 text-sm font-medium transition-colors duration-300 ${tab === t.key ? "text-paper-50" : "text-navy-900"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div key={tab} className="animate-pop">
                <h2 className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">
                  {isEnquiry ? "Admission enquiry" : "Share your feedback"}
                </h2>
                <p className="mb-6 mt-2 text-sm text-ink-900/60">
                  {isEnquiry ? "It takes about a minute to fill." : "Your words help us make the school better."}
                </p>
                {isEnquiry ? <AdmissionForm /> : <FeedbackForm />}
              </div>
            </div>
          </Reveal>

          <div key={`side-${tab}`} className="animate-pop space-y-10">
            {isEnquiry ? (
              <>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-900">How it works</h2>
                  <ol className="mt-6 space-y-6">
                    {STEPS.map((s, i) => (
                      <li key={s.title} className="group flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-navy-900">{s.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-ink-900/65">{s.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-900">Classes available</h2>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {CLASS_OPTIONS.map((c) => (
                      <li key={c} className="rounded-full border border-navy-900/15 px-4 py-1.5 text-sm text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron-500 hover:bg-saffron-100">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <CallCard title="Prefer to talk?" />
              </>
            ) : (
              <>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-900">Why your feedback matters</h2>
                  <ul className="mt-6 space-y-4">
                    {FEEDBACK_POINTS.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed text-ink-900/70">
                        <Icon d={ICONS.check} size={18} strokeWidth={2.2} className="mt-1 shrink-0 text-saffron-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <CallCard title="Want to speak to someone?" />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Admissions;
