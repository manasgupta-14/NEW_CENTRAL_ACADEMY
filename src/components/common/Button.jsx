import { Link } from "react-router-dom";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

const VARIANTS = {
  primary: "bg-navy-900 text-paper-50 shadow-md hover:bg-saffron-600 hover:shadow-lg",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-paper-50",
  saffron: "bg-saffron-500 text-navy-950 shadow-md hover:bg-saffron-600 hover:shadow-lg",
  dark: "bg-navy-950 text-paper-50 shadow-md hover:bg-navy-800",
  darkOutline: "border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-paper-50",
};

// Renders a router <Link> when `to` is given, an <a> when `href` is given, else a <button>.
export default function Button({ variant = "primary", to, href, className = "", children, ...rest }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>;
  return <button type="button" className={classes} {...rest}>{children}</button>;
}
