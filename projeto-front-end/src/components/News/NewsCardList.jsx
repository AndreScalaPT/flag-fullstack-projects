// src/components/News/NewsCardList.jsx
import { useState } from "react";
import newsData from "../../data/news.json";
import NewsCard from "./NewsCard";

export default function NewsCardList({
  news,
  limit = null,
  paginate = false,
  pageSize = 8,
}) {
  // Fonte dos dados (JSON ou via props)
  let list = Array.isArray(news) ? news : newsData;

  // Ordenar por data mais recente (se necessário)
  list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Aplicar limite (homepage)
  if (limit) {
    list = list.slice(0, limit);
  }

  // Paginação (apenas na página /news)
  const [page, setPage] = useState(1);

  const totalPages = paginate ? Math.ceil(list.length / pageSize) : 1;
  const start = (page - 1) * pageSize;
  const paginatedList = paginate ? list.slice(start, start + pageSize) : list;

  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedList.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            date={item.date}
            categories={item.categories}
            excerpt={item.excerpt}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>

      {/* Paginação */}
      {paginate && totalPages > 1 && (
        <nav className="flex justify-center mt-8 gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm btn-outline"
          >
            ← Anterior
          </button>

          <span className="py-2 px-4 font-semibold">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm btn-outline"
          >
            Próxima →
          </button>
        </nav>
      )}
    </section>
  );
}
