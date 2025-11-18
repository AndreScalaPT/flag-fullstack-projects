import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

export default function IconGroup({ scrolled }) {
  const base = scrolled
    ? "text-slate-700 hover:text-slate-900"
    : "text-white hover:text-sky-300";

  return (
    <div className="flex items-center gap-4">
      <a href="#" className={base}>
        <SiFacebook className="w-5 h-5" />
      </a>
      <a href="#" className={base}>
        <SiInstagram className="w-5 h-5" />
      </a>
      <a href="#" className={base}>
        <SiYoutube className="w-5 h-5" />
      </a>
    </div>
  );
}
