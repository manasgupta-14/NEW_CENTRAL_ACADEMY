import { useEffect } from "react";
import { ICONS } from "../../data/icons";
import Icon from "../common/Icon";

const NAV_BTN =
  "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper-50/10 text-paper-50 transition-all duration-300 hover:bg-paper-50/25";

// Full-screen photo viewer. Esc closes, left/right arrows move between photos.
export default function Lightbox({ photos, index, onClose, onChange }) {
  const photo = photos[index];
  const many = photos.length > 1;

  useEffect(() => {
    const go = (step) => onChange((index + step + photos.length) % photos.length);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (many && e.key === "ArrowLeft") go(-1);
      if (many && e.key === "ArrowRight") go(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos.length, many, onClose, onChange]);

  const step = (e, s) => {
    e.stopPropagation();
    onChange((index + s + photos.length) % photos.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[70] flex animate-fade items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-paper-50/10 text-paper-50 transition-all duration-300 hover:rotate-90 hover:bg-paper-50/20"
      >
        <Icon d={ICONS.close} size={22} />
      </button>

      {many && (
        <>
          <button type="button" aria-label="Previous photo" onClick={(e) => step(e, -1)} className={`left-3 sm:left-6 ${NAV_BTN}`}>
            <Icon d={ICONS.arrow} size={22} className="rotate-180" />
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => step(e, 1)} className={`right-3 sm:right-6 ${NAV_BTN}`}>
            <Icon d={ICONS.arrow} size={22} />
          </button>
        </>
      )}

      <figure key={photo.src} className="max-h-full max-w-4xl animate-pop" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} className="max-h-[78vh] rounded-2xl object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-paper-50/80">
          {photo.caption}
          {many && <span className="ml-2 text-paper-50/50">({index + 1}/{photos.length})</span>}
        </figcaption>
      </figure>
    </div>
  );
}
