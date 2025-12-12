import { useState } from "react";
import newsData from "../../data/news.json";
import NewsCard from "./NewsCard";

/**
 * NewsCardList - Lista de cards de notícias com paginação
 * 
 * Importa: useState do React; newsData do JSON; NewsCard
 * Função: Renderiza lista de notícias com opções de limite, ordenação e paginação
 * Exporta: Grid de notícias paginadas, usado em HomePage.jsx e NewsPageList.jsx
 */
export default function NewsCardList({
  news,
  limit = null,
  paginate = false,
  pageSize = 8,
}) {
  // Fonte dos dados (JSON ou via props)
  let list = Array.isArray(news) ? news : newsData;

  // Ordenar por data mais recente
  list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Aplicar limite (página inicial)
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
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Anterior
          </button>

          <span className="py-2 px-4 font-semibold">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Próxima →
          </button>
        </nav>
      )}
    </section>
  );
}
