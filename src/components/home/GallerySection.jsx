import { Link } from "react-router-dom";
import { LATEST_EVENT } from "../../data/gallery";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import SectionHeading from "../common/SectionHeading";
import ComingSoonTile from "../common/ComingSoonTile";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

const SHOWN = 4;

// Home: only 4 photos, from the newest function. "View full gallery" opens the year-wise gallery.
function GallerySection() {
  const event = LATEST_EVENT;
  const photos = event.photos.slice(0, SHOWN);
  const more = event.photos.length - SHOWN;
  const empty = SHOWN - photos.length;
  const eventUrl = `/gallery/${event.year}/${event.id}`;

  return (
    <section className="bg-paper-100">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeading eyebrow={`Latest function · ${event.dateLabel}`} title={event.title}>
          <Button to="/gallery" variant="outline">
            View full gallery
            <Icon d={ICONS.arrow} size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {photos.map((p, i) => (
            <Reveal key={p.src} from="zoom" delay={i * 90}>
              <Link to={eventUrl} aria-label={`Open ${event.title} photos`} className="group relative block aspect-square overflow-hidden rounded-2xl shadow-md">
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {i === SHOWN - 1 && more > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-navy-950/60 font-display text-2xl font-semibold text-paper-50">
                    +{more} more
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
          {Array.from({ length: empty }).map((_, i) => (
            <Reveal key={`empty-${i}`} from="zoom" delay={(photos.length + i) * 90}>
              <ComingSoonTile className="aspect-square" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
