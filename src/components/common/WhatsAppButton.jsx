import { whatsappLink } from "../../utils/whatsapp";
import { SOCIALS } from "../../data/social";
import Icon from "./Icon";

const WA_ICON = SOCIALS.find((s) => s.key === "whatsapp").icon;
const HELLO = "Hello, I would like to know more about New Central Academy.";

// Floating chat button, fixed to the bottom-right of the window on every page.
function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(HELLO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        animationDelay: "1.2s",
      }}
      className="group fixed z-40 flex animate-pop items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe5a] hover:shadow-[0_12px_30px_rgba(37,211,102,0.55)] focus-visible:-translate-y-1"
    >
      {/* soft pulsing ring */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.6s]" />
      <Icon d={WA_ICON} size={30} strokeWidth={1.8} className="shrink-0 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}

export default WhatsAppButton;
