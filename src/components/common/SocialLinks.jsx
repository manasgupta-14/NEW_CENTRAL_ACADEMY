import { SOCIALS } from "../../data/social";
import Icon from "./Icon";

// Round icon buttons for the footer. Open in a new tab.
function SocialLinks({ className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {SOCIALS.filter((s) => s.url).map((s) => (
        <li key={s.key}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            title={s.label}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-paper-50/20 text-paper-50 transition-all duration-300 hover:-translate-y-1 hover:border-saffron-500 hover:bg-saffron-500 hover:text-navy-950"
          >
            <Icon d={s.icon} size={20} className="transition-transform duration-300 group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
