import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchActiveFeedback } from "../../utils/submit";
import SectionHeading from "../common/SectionHeading";
import Reveal from "../common/Reveal";

const STAR = "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z";

function Stars({ value }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 24 24" className={`h-5 w-5 ${n <= value ? "fill-saffron-500 text-saffron-500" : "fill-transparent text-navy-900/20"}`} fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
}

// Contact page par footer ke theek upar: manager ke Active kiye hue feedback ka slider.
// Koi active feedback nahi (ya server band) to section poora hide rehta hai.
export default function FeedbackSlider() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchActiveFeedback()
      .then((res) => !cancelled && setItems(res.items || []))
      .catch(() => {}); // slider optional hai, fail hone par page na toote
    return () => { cancelled = true; };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-paper-100" aria-labelledby="feedback-slider-title">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="What people say"
          title="Words from our school family"
          intro="Feedback shared by parents, students and visitors."
        />
        <Reveal delay={100}>
          <Swiper
            className="feedback-swiper mt-10 !pb-12"
            modules={[Autoplay, Pagination, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
            loop={items.length > 3}
            autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            grabCursor
          >
            {items.map((f) => (
              <SwiperSlide key={f._id} className="!h-auto">
                <figure className="flex h-full flex-col rounded-3xl border border-navy-900/10 bg-paper-50 p-6 shadow-sm">
                  <Stars value={f.rating} />
                  <blockquote className="mt-4 line-clamp-6 flex-1 leading-relaxed text-ink-900/80">&ldquo;{f.message}&rdquo;</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-navy-900/10 pt-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display font-semibold text-paper-50" aria-hidden="true">
                      {f.name.trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-navy-900">{f.name}</span>
                      <span className="block truncate text-sm text-ink-900/60">{f.relation} &middot; {f.about}</span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
