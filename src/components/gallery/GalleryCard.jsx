import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";

// One card: cover photo, year badge, title and a small line underneath. Used for years and for functions.
export default function GalleryCard({ to, cover, year, title, meta, delay = 0 }) {
  return (
    <Reveal from="zoom" delay={delay}>
      <Link
        to={to}
        className="group block overflow-hidden rounded-2xl border border-navy-900/10 bg-paper-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={cover.src} alt={cover.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-semibold text-paper-50 backdrop-blur">
            {year}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-navy-900 transition-colors duration-300 group-hover:text-saffron-600">{title}</h3>
          {meta && <p className="mt-1 text-sm text-ink-900/60">{meta}</p>}
        </div>
      </Link>
    </Reveal>
  );
}
