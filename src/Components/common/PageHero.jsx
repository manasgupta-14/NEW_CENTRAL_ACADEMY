import { Link } from "react-router-dom";

const dots = {
  backgroundImage: "radial-gradient(circle, rgba(236,142,44,0.22) 1.5px, transparent 1.5px)",
  backgroundSize: "26px 26px",
  WebkitMaskImage: "radial-gradient(ellipse 60% 90% at 85% 30%, black, transparent)",
  maskImage: "radial-gradient(ellipse 60% 90% at 85% 30%, black, transparent)",
};

// Top banner shared by every inner page: breadcrumb, animated title, short intro.
export default function PageHero({ title, intro, crumb }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-paper-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={dots} />
      <div aria-hidden="true" className="absolute -right-16 -top-24 h-72 w-72 animate-float rounded-full border-[3px] border-saffron-500/45" />
      <div aria-hidden="true" className="absolute -bottom-16 right-28 h-40 w-40 animate-float-delay rounded-full bg-saffron-500/15" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="animate-hero-in text-sm text-paper-50/60">
          <Link to="/" className="transition-colors hover:text-saffron-500">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-paper-50/90">{crumb ?? title}</span>
        </nav>
        <h1
          className="mt-4 max-w-3xl animate-hero-in font-display text-4xl font-semibold leading-[1.08] md:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-xl animate-hero-in leading-relaxed text-paper-50/70" style={{ animationDelay: "240ms" }}>
            {intro}
          </p>
        )}
        <span className="mt-8 block h-1 w-24 origin-left animate-draw-x rounded-full bg-saffron-500" aria-hidden="true" />
      </div>
    </section>
  );
}
