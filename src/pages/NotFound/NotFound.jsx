import Button from "../../components/common/Button";

function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper-50">
      <div aria-hidden="true" className="absolute right-10 top-10 h-40 w-40 animate-float rounded-full border-[3px] border-saffron-500/50" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-36">
        <p className="animate-hero-in font-display text-8xl font-semibold text-saffron-500 md:text-9xl">404</p>
        <h1 className="mt-4 animate-hero-in font-display text-3xl font-semibold text-navy-900 md:text-4xl" style={{ animationDelay: "100ms" }}>
          This page isn&rsquo;t on our timetable
        </h1>
        <p className="mx-auto mt-4 max-w-md animate-hero-in leading-relaxed text-ink-900/70" style={{ animationDelay: "200ms" }}>
          The link may be old or mistyped. Head back to the home page and try the menu.
        </p>
        <div className="mt-8 animate-hero-in" style={{ animationDelay: "300ms" }}>
          <Button to="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
