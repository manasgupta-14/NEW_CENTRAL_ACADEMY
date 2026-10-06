import { YEARS } from "../../data/gallery";
import PageHero from "../../components/common/PageHero";
import GalleryCard from "../../components/gallery/GalleryCard";

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

// Step 1: pick a year.
function Gallery() {
  return (
    <>
      <PageHero title="Gallery" intro="Moments from our functions, year by year. Choose a year to see what happened." />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {YEARS.map((y, i) => (
              <GalleryCard
                key={y.year}
                to={`/gallery/${y.year}`}
                cover={y.cover}
                year={y.year}
                title={y.year}
                meta={plural(y.count, "function")}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
