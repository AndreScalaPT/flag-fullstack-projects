/*
TODO: separar este ficheiro em múltiplos componentes para melhor leitura

ProducoesSection 
HistoriaSection
ItineranciaSection
MeritosSection
ColaboradoresSection
MoradasSection
FiltersBar (pesquisa + dropdowns)
Timeline
TimelineYear

TODO: separar a lógica do UI ?!!
TODO: optimizar o UI, não estou convencido
TODO: lazy loading ?

 */

import {
  useMemo,
  useState,
  useEffect,
} from "react"; /* https://react.dev/reference/react/useMemo  guardar em cache o cálculo entre renderizações*/
import historyData from "../data/history.json";
import AddressMap from "../components/AddressMap";

const TABS = [
  { id: "historia", label: "História" },
  { id: "producoes", label: "Produções" },
  { id: "itinerancia", label: "Itinerância" },
  { id: "meritos", label: "Méritos" },
  { id: "colaboradores", label: "Colaboradores e Construtores" },
  { id: "moradas", label: "Moradas" },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("historia");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [yearFilter, setYearFilter] = useState("todos");
  const [foco, setFoco] = useState(null); // índice da morada focada
  const [isTourPlaying, setIsTourPlaying] = useState(false);

  const {
    pagina,
    historia,
    producoes,
    eventos,
    itinerancia,
    meritos,
    secao_construtores,
    moradas,
  } = historyData;

  /* Animação automática das moradas */
  useEffect(() => {
    if (!isTourPlaying || !moradas || moradas.length === 0) return;

    let i = 0;
    setFoco(0); /* Primeira posição/morada */

    const id = setInterval(() => {
      i += 1;
      if (i >= moradas.length) {
        clearInterval(id);
        setIsTourPlaying(false);
        return;
      }
      setFoco(i);
    }, 2500);

    return () => clearInterval(id);
  }, [isTourPlaying, moradas]);

  /* Sempre que usamos o hook useMemo memoriza para não estar sempre a recalcular */
  const anos = useMemo(
    () => [...new Set(producoes.map((p) => p.ano))].sort((a, b) => a - b),
    [producoes]
  );

  const categorias = useMemo(
    () =>
      [...new Set(producoes.map((p) => p.categoria).filter(Boolean))].sort(),
    [producoes]
  );

  const producoesFiltradas = useMemo(() => {
    return producoes
      .filter((p) =>
        (p.titulo + (p.autor || ""))
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((p) =>
        categoryFilter === "todas" ? true : p.categoria === categoryFilter
      )
      .filter((p) =>
        yearFilter === "todos" ? true : p.ano === Number(yearFilter)
      );
  }, [producoes, search, categoryFilter, yearFilter]);

  const timeline = useMemo(() => {
    return producoesFiltradas.reduce((acc, p) => {
      if (!acc[p.ano]) acc[p.ano] = [];
      acc[p.ano].push(p);
      return acc;
    }, {});
  }, [producoesFiltradas]);

  const stats = useMemo(() => {
    const totalProducoes = producoes.length;
    const totalEventos = eventos.length;
    const primeirosAnos = anos[0];
    const ultimoAno = anos[anos.length - 1];
    const categoriasDistintas = categorias.length;
    return {
      totalProducoes,
      totalEventos,
      primeirosAnos,
      ultimoAno,
      categoriasDistintas,
    };
  }, [producoes, eventos, anos, categorias]);

  // aqui a morada está "ativa" (para mostrar label acima do mapa)
  const moradaAtiva =
    foco !== null && moradas[foco]
      ? moradas[foco]
      : moradas[moradas.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="section-title">{pagina.titulo}</h1>
          <p className="text-sm text-gray-600">{pagina.subtitulo}</p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Produções" value={stats.totalProducoes} />
          <StatCard label="Eventos" value={stats.totalEventos} />
          <StatCard
            label="Período"
            value={`${stats.primeirosAnos}–${stats.ultimoAno}`}
          />
          <StatCard label="Categorias" value={stats.categoriasDistintas} />
        </section>

        <nav className="bg-white rounded-lg shadow-sm p-2 w-full flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "historia" && (
          <SectionCard title={historia.titulo}>
            <p className="leading-relaxed text-gray-700 text-justify whitespace-pre-line">
              {historia.texto}
            </p>
          </SectionCard>
        )}

        {activeTab === "producoes" && (
          <SectionCard title="Produções, Recitais e Festivais">
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Pesquisar por título ou autor…"
                className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-44 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="todas">Todas as categorias</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="todos">Todos os anos</option>
                {anos.map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-8">
              {Object.keys(timeline)
                .sort((a, b) => Number(a) - Number(b))
                .map((ano) => (
                  <div key={ano} className="relative pl-6">
                    {/* Linha vertical */}
                    <div className="absolute left-2 top-0 h-full w-px bg-gray-300" />
                    {/* Ponto do ano */}
                    <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600" />
                    <h3 className="text-xl font-semibold mb-3">{ano}</h3>

                    <div className="grid gap-3 md:grid-cols-2">
                      {timeline[ano].map((p) => (
                        <div
                          key={`${p.titulo}-${p.autor || ""}-${p.ano}`}
                          className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold">{p.titulo}</h4>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {p.categoria}
                            </span>
                          </div>
                          {p.autor && (
                            <p className="text-xs text-gray-600 mt-1">
                              {p.autor}
                            </p>
                          )}
                        </div>
                      ))}

                      {eventos
                        .filter((ev) => ev.ano === Number(ano))
                        .map((ev, idx) => (
                          <div
                            key={`${ev.tipo}-${ev.ano}-${idx}`}
                            className="p-3 rounded-lg bg-blue-50 border border-blue-200"
                          >
                            <p className="text-sm font-semibold">
                              {ev.tipo}
                              {ev.edicao && <> – {ev.edicao}ª edição</>}
                            </p>
                            {ev.periodo && (
                              <p className="text-xs text-gray-700 mt-1">
                                {ev.periodo}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              {producoesFiltradas.length === 0 && (
                <p className="text-sm text-gray-600">
                  Nenhuma produção encontrada com os filtros atuais.
                </p>
              )}
            </div>
          </SectionCard>
        )}

        {activeTab === "itinerancia" && (
          <SectionCard title={itinerancia.titulo}>
            <p className="leading-relaxed text-gray-700 text-justify mb-4">
              {itinerancia.texto}
            </p>
            <h3 className="font-semibold mb-2">Distritos onde já atuou:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {itinerancia.distritos.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  {d}
                </span>
              ))}
            </div>
            <h3 className="font-semibold mb-2">Itinerância internacional:</h3>
            <ul className="list-disc list-inside text-sm">
              {itinerancia.internacional.map((i) => (
                <li key={`${i.local}-${i.ano}`}>
                  {i.local}, {i.ano} — {i.evento}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {activeTab === "meritos" && (
          <SectionCard title={meritos.titulo}>
            <p className="leading-relaxed text-gray-700 text-justify whitespace-pre-line">
              {meritos.texto}
            </p>
          </SectionCard>
        )}

        {activeTab === "colaboradores" && (
          <SectionCard title={secao_construtores.titulo}>
            <p className="leading-relaxed text-gray-700 text-justify mb-4">
              {secao_construtores.intro}
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm">
              {secao_construtores.nomes.map((nome) => (
                <span
                  key={nome}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {nome}
                </span>
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === "moradas" && (
          <SectionCard title="As Nossas Moradas">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Timeline textual + botões */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase text-gray-600">
                      Morada ativa
                    </p>
                    <p className="text-sm font-semibold">
                      {moradaAtiva.periodo} — {moradaAtiva.nome}
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onClick={() => setIsTourPlaying(true)}
                    disabled={isTourPlaying}
                  >
                    {isTourPlaying ? "A reproduzir…" : "Reproduzir percurso"}
                  </button>
                </div>

                <div className="border-t border-gray-200 my-1" />

                {moradas.map((m, i) => {
                  const isActive =
                    foco === i || (foco === null && i === moradas.length - 1);
                  return (
                    <button
                      key={i}
                      onClick={() => setFoco(i)}
                      className={`w-full px-4 py-2 text-left rounded-lg transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      📍 {m.periodo} — {m.nome}
                    </button>
                  );
                })}
              </div>

              <div className="flex-2 min-h-[350px]">
                <AddressMap focusIndex={foco} />
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

/* Gerar o cartão branco para o título e conteúdo da secção */
function SectionCard({ title, children }) {
  return (
    <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/* Gerar o cartão para as estatísticas */
function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-3 px-4">
      <p className="text-xs uppercase tracking-wide text-gray-600">{label}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
