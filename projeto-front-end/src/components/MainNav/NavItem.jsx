import { Link } from "react-router-dom";

export default function NavItem({ to, scrolled, label }) {
  return (
    <Link
      to={to}
      className={`transition-all duration-300 text-sm tracking-widest ${
        scrolled
          ? "text-slate-700 hover:text-slate-900"
          : "text-white hover:text-sky-300"
      }`}
    >
      {label}
    </Link>
  );
}
