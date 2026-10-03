import React from "react";
import logo from "../../assets/logo.png";

const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/admissions", label: "Admissions" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/notice", label: "Notice" },
  { to: "/career", label: "Career" },
];

function Footer() {
  return (
    <footer className="bg-navy-950 text-paper-50/80">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="New Central Academy" className="w-12 h-12 object-contain" />
              <span className="font-display text-lg font-semibold text-paper-50">
                New Central Academy
              </span>
            </div>
            <p className="text-sm mt-4 max-w-xs leading-relaxed">
              A place where young minds learn, grow and build a bright
              future with knowledge, discipline and values.
            </p>
          </div>

          <div>
            <h4 className="text-paper-50 font-medium text-sm tracking-wide mb-4">Quick links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <a href={link.to} className="hover:text-saffron-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-paper-50 font-medium text-sm tracking-wide mb-4">Reach us</h4>
            <ul className="space-y-2.5 text-sm">
              <li>Pohila Road, Mahuapar</li>
              <li>Barhalganj, Gorakhpur &ndash; 273402</li>
              <li>
                <a href="tel:9935217161" className="hover:text-saffron-500 transition-colors">
                  9935217161
                </a>
              </li>
              <li>
                <a href="tel:9621323797" className="hover:text-saffron-500 transition-colors">
                  96213 23797
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper-50/10 mt-10 pt-6 text-xs text-paper-50/50 flex flex-col sm:flex-row justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} New Central Academy. All rights reserved.</p>
          <p>Playway to Class 8th &middot; English Medium</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
