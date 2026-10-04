import Reveal from "../common/Reveal";

// One leader: photo with name card on one side, their message on the other.
// `flip` swaps the sides so the two leaders alternate down the page.
function LeaderMessage({ leader, flip = false }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
      <Reveal from={flip ? "right" : "left"} className={flip ? "md:order-2" : ""}>
        <div className="group relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            <img
              src={leader.photo}
              alt={leader.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent px-6 pb-5 pt-14 text-paper-50">
              <p className="font-display text-xl font-semibold">{leader.name}</p>
              <p className="text-sm text-saffron-100">{leader.role}</p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className={`absolute -bottom-5 -z-10 hidden h-32 w-32 rounded-2xl border-4 border-saffron-500 transition-transform duration-500 sm:block ${
              flip ? "-left-5 group-hover:-translate-x-2 group-hover:translate-y-2" : "-right-5 group-hover:translate-x-2 group-hover:translate-y-2"
            }`}
          />
        </div>
      </Reveal>

      <div className={flip ? "md:order-1" : ""}>
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-saffron-600">Message from the {leader.role}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-navy-900 md:text-3xl">
            {leader.heading}
          </h3>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5 max-w-xl space-y-4 leading-relaxed text-ink-900/70">
            {leader.message.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 font-display text-lg italic text-navy-900">
            {leader.name}
            <span className="block text-sm not-italic text-ink-900/55">{leader.role}, New Central Academy</span>
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default LeaderMessage;
