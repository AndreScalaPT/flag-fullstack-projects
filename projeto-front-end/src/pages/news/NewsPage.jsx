// src/pages/news/NewsPage.jsx
import { useParams, Link } from "react-router-dom";
import newsData from "../../data/news.json";

export default function NewsPage() {
  const { slug } = useParams();

  // Encontrar a notícia que corresponde ao slug
  const newsItem = newsData.find((item) => {
    const last = item.link.split("/").filter(Boolean).pop();
    return last.toLowerCase() === slug.toLowerCase();
  });

  if (!newsItem) {
    return (
      <section className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Notícia não encontrada</h1>
        <Link className="btn btn-outline" to="/news">
          Voltar às notícias
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-16 max-w-4xl">
      {/* Título */}
      <h1 className="section-title">{newsItem.title}</h1>

      {/* Data e categorias */}
      <div className="flex flex-wrap gap-3 items-center text-neutral-600 mb-6">
        <span className="text-sm">{newsItem.date}</span>

        <div className="flex gap-2">
          {newsItem.categories?.map((cat, i) => (
            <span
              key={i}
              className="text-xs bg-neutral-200 px-2 py-1 rounded-md"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Imagem */}
      {newsItem.image && (
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="rounded-lg mb-8 w-full"
        />
      )}

      {/* Conteúdo (no futuro) */}
      {newsItem.content ? (
        <p className="text-lg leading-relaxed whitespace-pre-line">
          {newsItem.content}
        </p>
      ) : (
        <>
          <p className="text-lg leading-relaxed mb-8">{newsItem.excerpt}</p>
          <p className="text-neutral-500 italic">
            (Nota: esta notícia ainda não tem conteúdo completo no JSON.)
          </p>
        </>
      )}

      {/* Link voltar */}
      <div className="mt-10">
        <Link to="/news" className="btn btn-outline">
          ← Voltar às notícias
        </Link>
      </div>
    </section>
  );
}
