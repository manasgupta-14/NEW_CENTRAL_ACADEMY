import { useEffect, useState } from "react";
import { GALLERY } from "../../data/gallery";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import ComingSoonTile from "../../components/common/ComingSoonTile";
import Icon from "../../components/common/Icon";

const SLOTS = 8;

function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const empty = Math.max(0, SLOTS - GALLERY.length);

  return (
    <>
      <PageHero title="Gallery" intro="Moments from classrooms, events and the playground. Tap a photo to see it larger." />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} from="zoom" delay={i * 80} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => setActive(g)}
                  aria-label={`Open photo: ${g.caption}`}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-md"
                >
                  <img src={g.src} alt={g.alt} className="h-full min-h-[290px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-navy-950/85 to-transparent p-4 text-left text-sm text-paper-50 transition-transform duration-300 group-hover:translate-y-0">
                    {g.caption}
                  </span>
                </button>
              </Reveal>
            ))}
            {Array.from({ length: empty }).map((_, i) => (
              <Reveal key={i} from="zoom" delay={120 + (i % 4) * 70}>
                <ComingSoonTile className="min-h-[180px]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[70] flex animate-fade items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close photo"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-paper-50/10 text-paper-50 transition-all duration-300 hover:rotate-90 hover:bg-paper-50/20"
          >
            <Icon d={ICONS.close} size={22} />
          </button>
          <figure className="max-h-full max-w-4xl animate-pop" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.alt} className="max-h-[78vh] rounded-2xl object-contain shadow-2xl" />
            <figcaption className="mt-3 text-center text-sm text-paper-50/80">{active.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

export default Gallery;
