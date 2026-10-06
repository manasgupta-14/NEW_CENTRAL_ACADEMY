import { useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../data/gallery";
import PageHero from "../../components/common/PageHero";
import Reveal from "../../components/common/Reveal";
import Lightbox from "../../components/gallery/Lightbox";
import NotFound from "../NotFound/NotFound";
import { BackLink } from "./GalleryYear";

// Step 3: all photos of one function. Tap a photo to open it large.
function GalleryEvent() {
  const { year, eventId } = useParams();
  const event = getEvent(year, eventId);
  const [active, setActive] = useState(null);
  if (!event) return <NotFound />;

  return (
    <>
      <PageHero title={event.title} crumb={event.title} intro={`${event.dateLabel} · Tap a photo to see it larger.`} />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <BackLink to={`/gallery/${event.year}`}>All functions of {event.year}</BackLink>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {event.photos.map((p, i) => (
              <Reveal key={p.src} from="zoom" delay={(i % 4) * 70}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Open photo ${i + 1} of ${event.photos.length}`}
                  className="group relative block aspect-square w-full overflow-hidden rounded-2xl shadow-md"
                >
                  <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {active !== null && <Lightbox photos={event.photos} index={active} onClose={() => setActive(null)} onChange={setActive} />}
    </>
  );
}

export default GalleryEvent;
