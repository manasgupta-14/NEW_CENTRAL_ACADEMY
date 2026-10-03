import Icon from "../common/Icon";

// One activity tile. Shared by the Home preview and the Activities page.
function ActivityCard({ item, tone = "light" }) {
  return (
    <div className={`group relative h-full overflow-hidden rounded-2xl border border-navy-900/10 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${tone === "light" ? "bg-paper-50" : "bg-paper-100"}`}>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-saffron-500 transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-paper-50 transition-all duration-300 group-hover:rotate-[8deg] group-hover:bg-saffron-600">
        <Icon d={item.icon} />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{item.title}</h3>
      <p className="mt-2 leading-relaxed text-ink-900/65">{item.blurb}</p>
    </div>
  );
}

export default ActivityCard;
