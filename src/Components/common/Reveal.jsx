import useInView from "../../hooks/useInView";

const HIDDEN = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
  zoom: "scale-90",
  fade: "",
};

/**
 * Scroll-reveal wrapper. `from` picks the direction it arrives from.
 * Use `delay` (ms) to stagger siblings.
 */
export default function Reveal({ children, from = "up", delay = 0, className = "", as: Tag = "div" }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${HIDDEN[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
