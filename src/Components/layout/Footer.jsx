import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { SCHOOL } from "../../data/school";
import SocialLinks from "../common/SocialLinks";

const QUICK_LINKS = [
  { to: "/about", label: "About" },
  { to: "/facilities", label: "Facilities" },
  { to: "/admissions", label: "Admissions" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/notice", label: "Notice" },
  { to: "/career", label: "Career" },
];

const linkClass = "inline-block transition-all duration-300 hover:translate-x-1 hover:text-saffron-500";

function Footer() {
  return (
    <footer className="bg-navy-950 text-paper-50/80">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-12 object-contain" />
              <span className="font-display text-lg font-semibold text-paper-50">{SCHOOL.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A place where young minds learn, grow and build a bright future with knowledge, discipline and values.
            </p>
            <p className="mb-3 mt-6 text-sm font-medium tracking-wide text-paper-50">Follow us</p>
            <SocialLinks />
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-paper-50">Quick links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={({ isActive }) => `${linkClass} ${isActive ? "text-saffron-500" : ""}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-paper-50">Reach us</h4>
            <ul className="space-y-2.5 text-sm">
              {SCHOOL.address.map((line) => <li key={line}>{line}</li>)}
              {SCHOOL.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className={linkClass}>{p.label}</a>
                </li>
              ))}
              <li>
                <NavLink to="/contact" className={linkClass}>Send us a message</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-paper-50/10 pt-6 text-xs text-paper-50/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</p>
          <p>{SCHOOL.classes} &middot; {SCHOOL.medium}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
