import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";

export default function ShareButtons({ title, url }) {
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
      link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      color: "#1DA1F2",
      link: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      color: "#25D366",
      link: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      color: "#0A66C2",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("🔗 Link copiado!");
  };

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-lg font-semibold">Partilha este artigo:</h3>

      <div className="flex flex-wrap gap-4 items-center">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-medium shadow-md hover:scale-105 transition"
            style={{ backgroundColor: p.color }}
          >
            {p.icon}
            <span>{p.name}</span>
          </a>
        ))}

        {/* Copiar link */}
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-700 hover:bg-black text-white font-medium shadow-md hover:scale-105 transition"
        >
          <FaLink />
          <span>Copiar link</span>
        </button>
      </div>
    </div>
  );
}
