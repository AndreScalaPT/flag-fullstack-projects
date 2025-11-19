import { Link } from "react-router-dom";

export default function NavItem({ to, scrolled, label }) {
  return (
    <Link
      to={to}
      className={`
        group relative transition-all duration-300 text-sm tracking-widest font-normal
        ${
          scrolled
            ? "text-slate-700 hover:text-slate-900"
            : "text-white hover:text-sky-300"
        }
      `}
    >
      {label}

      <span
        className="
          pointer-events-none absolute -bottom-1 left-0 
          h-0.5 w-0 bg-current transition-all duration-300 
          group-hover:w-full
        "
      />
    </Link>
  );
}
