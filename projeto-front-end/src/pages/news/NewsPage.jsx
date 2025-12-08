import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import newsData from "../../data/news.json";
import ShareButtons from "../../components/ShareButtons";

export default function NewsPage() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const newsItem = newsData.find((item) => {
    const last = item.link.split("/").filter(Boolean).pop();
    return last.toLowerCase() === slug.toLowerCase();
  });

  if (!newsItem)
    return (
      <section className="container mx-auto py-16">
        <h1 className="text-3xl font-bold mb-4">Notícia não encontrada</h1>
        <Link className="btn btn-outline" to="/news">
          Voltar às notícias
        </Link>
      </section>
    );

  const words = Array.isArray(newsItem.content)
    ? newsItem.content.join(" ").split(" ").length
    : newsItem.content
    ? newsItem.content.split(" ").length
    : newsItem.excerpt.split(" ").length;

  const readingTime = Math.ceil(words / 180);

  // Artigos relacionados
  const related = newsData
    .filter(
      (n) =>
        n.id !== newsItem.id &&
        n.categories?.some((cat) => newsItem.categories.includes(cat))
    )
    .slice(0, 3);

  return (
    <section className="container mx-auto py-16 max-w-4xl space-y-12">
      {/* Título */}
      <header>
        <h1 className="text-4xl font-bold mb-3">{newsItem.title}</h1>
        <div className="flex flex-wrap gap-3 text-neutral-600 items-center">
          <span>{newsItem.date}</span>
          <span className="text-xs bg-neutral-200 px-2 py-1 rounded">
            ⏱ {readingTime} min. leitura
          </span>
          {newsItem.categories?.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-neutral-200 px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>
      </header>

      {/* Capa */}
      {newsItem.image && (
        <img
          src={newsItem.image}
          className="rounded-lg shadow-lg mx-auto max-w-[700px] w-full my-6"
        />
      )}

      {/* Galeria + Lightbox */}
      {newsItem.gallery && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {newsItem.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-lg cursor-zoom-in hover:scale-105 transition"
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>

          {lightboxIndex !== null && (
            <div
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <img
                src={newsItem.gallery[lightboxIndex]}
                className="max-h-[90vh] rounded-xl shadow-2xl"
              />
            </div>
          )}
        </>
      )}

      {/* Conteúdo */}
      <article className="prose prose-neutral text-[1.18rem] leading-relaxed max-w-none">
        {Array.isArray(newsItem.content) ? (
          newsItem.content.map((p, i) => <p key={i}>{p}</p>)
        ) : newsItem.content ? (
          <p>{newsItem.content}</p>
        ) : (
          <p>{newsItem.excerpt}</p>
        )}
      </article>

      <ShareButtons title={newsItem.title} url={window.location.href} />

      {/* SECÇÃO PARA APRESENTAR ARTIGOS RELACIONADOS */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Artigos relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={r.link}
                className="block p-3 bg-neutral-50 hover:bg-neutral-100 transition rounded-lg hover:scale-[1.02]"
              >
                <img src={r.image} className="rounded-md mb-3 w-full" />
                <p className="font-semibold">{r.title}</p>
                <span className="text-xs opacity-60">{r.date}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link className="btn btn-outline" to="/news">
        ← Voltar às notícias
      </Link>
    </section>
  );
}
