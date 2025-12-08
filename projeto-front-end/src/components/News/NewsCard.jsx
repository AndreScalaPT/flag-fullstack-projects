import { Link } from "react-router-dom";

const buildNewsRoute = (link = "") => {
  const slug = link.split("/").filter(Boolean).pop();
  return slug ? `/news/${slug.toLowerCase()}` : "/news";
};

export default function NewsCard({
  title,
  date,
  categories,
  excerpt,
  image,
  link,
}) {
  const newsPath = buildNewsRoute(link);

  return (
    <div className="flex flex-col lg:flex-row bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4 lg:p-6 h-full">
      {/* IMAGEM */}
      <figure className="w-full lg:w-48 shrink-0 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-60 lg:h-full object-cover rounded-xl"
        />
      </figure>

      {/* CONTEÚDO */}
      <div className="flex flex-col justify-between flex-1 mt-4 lg:mt-0 lg:ml-6">
        {/* DATA */}
        <span className="text-neutral-500 font-medium text-sm">{date}</span>

        {/* TÍTULO */}
        <h2 className="text-xl lg:text-2xl font-semibold leading-snug mt-1">
          {title}
        </h2>

        {/* TEXTO */}
        <p className="mt-2 text-neutral-600 leading-relaxed line-clamp-3 text-[0.95rem]">
          {excerpt}
        </p>

        {/* BADGES + LER MAIS */}
        <div className="flex items-center justify-between mt-4">
          {/* BADGES GRANDES (PILL) */}
          <div className="flex gap-3 flex-wrap">
            {categories?.map((cat) => (
              <span
                key={cat}
                className="px-5 py-2 border rounded-full text-sm font-medium text-neutral-700 shadow-sm bg-white"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* LER MAIS */}
          <Link
            to={newsPath}
            className="text-sm font-semibold text-neutral-800 hover:underline"
          >
            ler mais…
          </Link>
        </div>
      </div>
    </div>
  );
}
