import { Link, useParams } from "react-router-dom";
import { getYear } from "../../data/gallery";
import { ICONS } from "../../data/icons";
import PageHero from "../../components/common/PageHero";
import Icon from "../../components/common/Icon";
import GalleryCard from "../../components/gallery/GalleryCard";
import NotFound from "../NotFound/NotFound";

export function BackLink({ to, children }) {
  return (
    <Link to={to} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-navy-900 transition-colors hover:text-saffron-600">
      <Icon d={ICONS.arrow} size={16} className="rotate-180" />
      {children}
    </Link>
  );
}

// Step 2: every function of the chosen year, one card each.
function GalleryYear() {
  const { year } = useParams();
  const data = getYear(year);
  if (!data) return <NotFound />;

  return (
    <>
      <PageHero title={`Gallery ${data.year}`} crumb={data.year} intro="Tap a function to see all its photos." />

      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <BackLink to="/gallery">All years</BackLink>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.events.map((e, i) => (
              <GalleryCard
                key={e.id}
                to={`/gallery/${e.year}/${e.id}`}
                cover={e.photos[0]}
                year={e.year}
                title={e.title}
                meta={`${e.dateLabel} · ${e.photos.length} photo${e.photos.length === 1 ? "" : "s"}`}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default GalleryYear;
