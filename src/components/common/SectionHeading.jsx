import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, intro, light = false, as: Tag = "h2", children }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          {eyebrow && (
            <p className={`text-sm font-medium tracking-wide ${light ? "text-saffron-500" : "text-saffron-600"}`}>
              {eyebrow}
            </p>
          )}
          <Tag className={`mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl ${light ? "text-paper-50" : "text-navy-900"}`}>
            {title}
          </Tag>
          {intro && (
            <p className={`mt-4 max-w-xl leading-relaxed ${light ? "text-paper-50/70" : "text-ink-900/70"}`}>{intro}</p>
          )}
        </div>
        {children}
      </div>
    </Reveal>
  );
}
