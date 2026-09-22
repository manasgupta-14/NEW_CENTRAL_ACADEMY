import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/admissions", label: "Admissions" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/notice", label: "Notice" },
];

const STUDENT_LINKS = [
  { to: "/fee", label: "Fee" },
  { to: "/attendance", label: "Attendance" },
  { to: "/result", label: "Result" },
  { to: "/study-point", label: "Study Point" },
];

const MORE_LINKS = [
  { to: "/career", label: "Career" },
  { to: "/help", label: "Help" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Notice strip */}
      <div className="bg-navy-950 text-paper-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center h-9">
          <div className="bg-saffron-500 text-navy-950 font-semibold px-4 h-9 flex items-center shrink-0 text-sm tracking-wide">
            Notice
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-block animate-marquee pl-full text-sm text-paper-100/90">
              Admission open for session 2026&ndash;27 &nbsp;&#10022;&nbsp;
              Welcome to New Central Academy &nbsp;&#10022;&nbsp;
              Important school updates &nbsp;&#10022;&nbsp;
              Playway to Class 8th
            </div>
          </div>
        </div>
      </div>

      {/* Top header */}
      <div className="bg-paper-50 border-b border-navy-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3.5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:rotate-6">
                <img
                  src={logo}
                  alt="New Central Academy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-display text-lg md:text-xl font-semibold text-navy-900 leading-tight">
                  New Central Academy
                </h1>
                <p className="text-xs text-ink-900/60">
                  Playway to Class 8th &middot; English Medium
                </p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-7">
              <div className="text-right leading-tight">
                <p className="text-sm font-medium text-ink-900/80">
                  Pohila Road, Mahuapar
                </p>
                <p className="text-xs text-ink-900/50">
                  Barhalganj, Gorakhpur &ndash; 273402
                </p>
              </div>

              <a
                href="tel:9935217161"
                className="text-right leading-tight hover:text-saffron-600 transition-colors"
              >
                <p className="text-sm font-medium text-ink-900/80">
                  9935217161
                </p>
                <p className="text-xs text-ink-900/50">96213 23797</p>
              </a>

              <Link
                to="/login"
                className="bg-navy-900 text-paper-50 px-5 py-2.5 rounded-full font-medium text-sm hover:bg-saffron-600 transition-colors duration-300 shadow-sm"
              >
                Login
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/login"
                className="bg-navy-900 text-paper-50 px-4 py-2 rounded-full font-medium text-sm"
              >
                Login
              </Link>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 shrink-0"
              >
                <span
                  className={`block h-0.5 w-6 bg-navy-900 rounded-full transition-transform duration-300 ${
                    menuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-navy-900 rounded-full transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-navy-900 rounded-full transition-transform duration-300 ${
                    menuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav — desktop */}
      <nav className="hidden md:block bg-navy-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 h-14">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative py-4 text-paper-50/90 hover:text-saffron-500 font-medium text-sm transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-saffron-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative py-4"
              onMouseEnter={() => setStudentOpen(true)}
              onMouseLeave={() => setStudentOpen(false)}
            >
              <button className="flex items-center gap-1 text-paper-50/90 hover:text-saffron-500 font-medium text-sm transition-colors">
                Student Side
                <span
                  className={`text-[10px] transition-transform duration-300 ${
                    studentOpen ? "rotate-180" : ""
                  }`}
                >
                  &#9660;
                </span>
              </button>

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full w-44 bg-paper-50 rounded-xl shadow-xl border border-navy-900/10 overflow-hidden transition-all duration-200 origin-top ${
                  studentOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
              >
                {STUDENT_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-5 py-2.5 text-sm text-ink-900/80 hover:bg-saffron-100 hover:text-saffron-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {MORE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative py-4 text-paper-50/90 hover:text-saffron-500 font-medium text-sm transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-saffron-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main nav — mobile */}
      <div
        className={`md:hidden bg-navy-900 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col">
          {[...NAV_LINKS, ...STUDENT_LINKS, ...MORE_LINKS].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-paper-50/90 hover:text-saffron-500 font-medium text-sm py-2.5 border-b border-paper-50/10 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
