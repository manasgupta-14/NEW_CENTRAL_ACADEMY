import hero from "../assets/Hero.jpg";

/*
 * GALLERY — photos are picked up automatically from folders. No code change needed.
 *
 *   src/assets/gallery/<year>/<function-folder>/<photos>.jpg
 *
 * Example:
 *   src/assets/gallery/2024/12-annual-day/01.jpg, 02.jpg, 03.jpg ...
 *   src/assets/gallery/2024/08-independence-day/01.jpg ...
 *   src/assets/gallery/2023/03-sports-day/01.jpg ...
 *
 * Folder name rules:
 *   - "12-annual-day"  -> shows as "Annual Day" (the leading 12 = month, used only for ordering,
 *                         newest month first). The month number is optional.
 *   - Photos are shown in file-name order; the first one is the card cover.
 *   - The newest function (latest year, then latest month) feeds the Home page (4 photos).
 */

const files = import.meta.glob("../assets/gallery/*/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const prettify = (slug) =>
  slug
    .replace(/^\d{1,2}-/, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function buildEvents() {
  const map = new Map();

  Object.entries(files).forEach(([path, src]) => {
    const [, year, slug, name] = path.match(/gallery\/([^/]+)\/([^/]+)\/([^/]+)$/) || [];
    if (!year) return;
    const key = `${year}/${slug}`;
    if (!map.has(key)) {
      const m = slug.match(/^(\d{1,2})-/);
      const month = m ? Number(m[1]) : 0;
      map.set(key, {
        id: slug,
        year,
        month,
        title: prettify(slug),
        dateLabel: month >= 1 && month <= 12 ? `${MONTHS[month - 1]} ${year}` : year,
        files: [],
      });
    }
    map.get(key).files.push({ name, src });
  });

  const events = [...map.values()].map(({ files: list, ...e }) => {
    list.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    return {
      ...e,
      photos: list.map((f, i) => ({ src: f.src, alt: `${e.title} ${e.year} - photo ${i + 1}`, caption: `${e.title}, ${e.dateLabel}` })),
    };
  });

  // Nothing added yet: show one sample function so the pages are not empty.
  if (!events.length) {
    events.push({
      id: "our-campus",
      year: "2026",
      month: 0,
      title: "Our Campus",
      dateLabel: "2026",
      photos: [{ src: hero, alt: "Students and teachers of New Central Academy", caption: "Students and teachers together on campus" }],
    });
  }

  // Newest first: year, then month.
  return events.sort((a, b) => b.year.localeCompare(a.year) || b.month - a.month || b.id.localeCompare(a.id));
}

export const EVENTS = buildEvents();

// Newest function. Home page shows 4 of its photos.
export const LATEST_EVENT = EVENTS[0];

// [{ year, events: [...], cover, count }], newest year first.
export const YEARS = [...new Set(EVENTS.map((e) => e.year))].map((year) => {
  const events = EVENTS.filter((e) => e.year === year);
  return { year, events, cover: events[0].photos[0], count: events.length };
});

export const getYear = (year) => YEARS.find((y) => y.year === year);
export const getEvent = (year, id) => EVENTS.find((e) => e.year === year && e.id === id);
