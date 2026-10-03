import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SCHOOL } from "../../data/school";
import { MAIN_LINKS, STUDENT_LINKS, MORE_LINKS } from "../../data/navLinks";
import { TICKER } from "../../data/notices";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

const desktopLink = ({ isActive }) =>
  `relative py-4 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-saffron-500 after:transition-all after:duration-300 after:content-[''] ${
    isActive ? "text-saffron-500 after:w-full" : "text-paper-50/90 after:w-0 hover:text-saffron-500 hover:after:w-full"
  }`;

const dropdownLink = ({ isActive }) =>
  `block px-5 py-2.5 text-sm transition-all duration-200 hover:pl-6 hover:bg-saffron-100 hover:text-saffron-600 ${
    isActive ? "bg-saffron-100 text-saffron-600" : "text-ink-900/80"
  }`;

const mobileLink = ({ isActive }) =>
  `block border-b border-paper-50/10 py-3 text-sm font-medium transition-colors last:border-none ${
    isActive ? "text-saffron-500" : "text-paper-50/90 hover:text-saffron-500"
  }`;

function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const inStudentSide = STUDENT_LINKS.some((l) => pathname.startsWith(l.to));

  return (
    <>
      {/* Notice strip — scrolls away; text loops without a jump */}
      <div className="overflow-hidden bg-navy-950 text-paper-50">
        <div className="mx-auto flex h-9 max-w-7xl items-center">
          <NavLink
            to="/notice"
            className="flex h-9 shrink-0 items-center bg-saffron-500 px-4 text-sm font-semibold tracking-wide text-navy-950 transition-colors hover:bg-saffron-600"
          >
            Notice
          </NavLink>
          <div className="flex-1 overflow-hidden">
            <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                  {TICKER.map((t) => (
                    <span key={t} className="px-4 text-sm text-paper-100/90">
                      {t}
                      <span className="ml-8 text-saffron-500">&#10022;</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky block: brand row + main nav */}
      <header className="sticky top-0 z-50">
        <div className={`border-b border-navy-900/10 bg-paper-50/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-1.5" : "py-3.5"}`}>
              <Link to="/" className="group flex items-center gap-3">
                <img
                  src={logo}
                  alt="New Central Academy logo"
                  className={`shrink-0 object-contain transition-all duration-300 group-hover:rotate-6 ${scrolled ? "h-10 w-10" : "h-14 w-14"}`}
                />
                <div>
                  <p className="font-display text-lg font-semibold leading-tight text-navy-900 md:text-xl">{SCHOOL.name}</p>
                  <p className="text-xs text-ink-900/60">{SCHOOL.classes} &middot; {SCHOOL.medium}</p>
                </div>
              </Link>

              <div className="hidden items-center gap-7 md:flex">
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium text-ink-900/80">{SCHOOL.address[0]}</p>
                  <p className="text-xs text-ink-900/50">{SCHOOL.address[1]}</p>
                </div>
                <a href={`tel:${SCHOOL.phones[0].tel}`} className="text-right leading-tight transition-colors hover:text-saffron-600">
                  <p className="text-sm font-medium text-ink-900/80">{SCHOOL.phones[0].label}</p>
                  <p className="text-xs text-ink-900/50">{SCHOOL.phones[1].label}</p>
                </a>
                <NavLink to="/login" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-medium text-paper-50 shadow-sm transition-colors duration-300 hover:bg-saffron-600">
                  Login
                </NavLink>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <NavLink to="/login" onClick={closeMenu} className="rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-paper-50">
                  Login
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5"
                >
                  <span className={`block h-0.5 w-6 rounded-full bg-navy-900 transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                  <span className={`block h-0.5 w-6 rounded-full bg-navy-900 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`block h-0.5 w-6 rounded-full bg-navy-900 transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden bg-navy-900 shadow-md md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-center gap-5 lg:gap-8">
              {MAIN_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={desktopLink}>{l.label}</NavLink>
              ))}

              <div className="group relative py-4">
                <button
                  type="button"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-saffron-500 ${inStudentSide ? "text-saffron-500" : "text-paper-50/90"}`}
                >
                  Student Side
                  <Icon d={ICONS.chevron} size={14} className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-44 origin-top -translate-x-1/2 scale-95 overflow-hidden rounded-xl border border-navy-900/10 bg-paper-50 opacity-0 shadow-xl transition-all duration-200 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  {STUDENT_LINKS.map((l) => (
                    <NavLink key={l.to} to={l.to} className={dropdownLink}>{l.label}</NavLink>
                  ))}
                </div>
              </div>

              {MORE_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className={desktopLink}>{l.label}</NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile nav — height animates open/closed */}
        <div className={`grid bg-navy-900 transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <nav aria-label="Mobile" className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 py-2">
              {[...MAIN_LINKS, ...STUDENT_LINKS, ...MORE_LINKS].map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} onClick={closeMenu} className={mobileLink} tabIndex={menuOpen ? 0 : -1}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
