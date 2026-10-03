import Icon from "./Icon";
import { ICONS } from "../../data/icons";

export default function ComingSoonTile({ className = "" }) {
  return (
    <div className={`flex h-full min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy-900/15 text-ink-900/40 transition-colors duration-300 hover:border-saffron-500/60 hover:text-saffron-600 ${className}`}>
      <Icon d={ICONS.image} size={26} strokeWidth={1.6} />
      <span className="text-xs">More photos soon</span>
    </div>
  );
}
