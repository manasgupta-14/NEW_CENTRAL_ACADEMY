// Shown after any local form submit. The tick draws itself.
export default function SuccessState({ title, children, action }) {
  return (
    <div className="animate-pop py-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d97a1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5 10 17.5 19 7" pathLength="1" strokeDasharray="1" className="animate-draw" style={{ animationDelay: "0.2s" }} />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm leading-relaxed text-ink-900/70">{children}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
