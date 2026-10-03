const ITEMS = ["English Medium", "Playway to Class 8th", "Knowledge", "Discipline", "Values", "Caring teachers", "Safe campus"];

// A slow ribbon between the hero and the first section. Decorative only.
function HighlightsMarquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-navy-900/10 bg-saffron-500 py-3.5">
      <div className="flex w-max animate-marquee whitespace-nowrap [animation-duration:40s]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {ITEMS.map((t) => (
              <span key={t} className="px-6 font-display text-lg font-semibold text-navy-950">
                {t}
                <span className="ml-12 text-navy-950/50">&#10022;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightsMarquee;
