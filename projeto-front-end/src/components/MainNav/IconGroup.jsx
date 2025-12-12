import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

/* renderiza links para redes sociais com cores adaptativas ao scroll */

export default function IconGroup({ scrolled }) {
  const baseColor = scrolled ? "text-slate-700" : "text-white";

  return (
    <div className="flex items-center gap-4">
      {/* Facebook */}
      <a
        href="#"
        className={`${baseColor} transition-colors duration-300 hover:text-[#1877F2]`}
      >
        <SiFacebook className="w-5 h-5" />
      </a>

      {/* Instagram */}
      <a
        href="#"
        className={`${baseColor} transition-colors duration-300 hover:text-[#E4405F]`}
      >
        <SiInstagram className="w-5 h-5" />
      </a>

      {/* YouTube */}
      <a
        href="#"
        className={`${baseColor} transition-colors duration-300 hover:text-[#FF0000]`}
      >
        <SiYoutube className="w-5 h-5" />
      </a>
    </div>
  );
}
