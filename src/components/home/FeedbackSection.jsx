import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import FeedbackForm from "../forms/FeedbackForm";

// Home: standalone feedback form (separate from admissions). Not sent to WhatsApp.
function FeedbackSection() {
  return (
    <section id="feedback" className="scroll-mt-24 bg-paper-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <div>
          <SectionHeading
            eyebrow="We are listening"
            title="Share your feedback"
            intro="Tell us what we are doing well and where we can improve. Parents, students and visitors are all welcome."
          />
        </div>
        <Reveal from="right" delay={100}>
          <div className="rounded-3xl border border-navy-900/10 bg-paper-100 p-6 sm:p-9">
            <FeedbackForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FeedbackSection;
