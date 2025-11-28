import { useMemo, useState, useEffect } from "react";
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

  useEffect(() => {
    if (!isTourPlaying || !moradas || moradas.length === 0) return;

    let i = 0;
    setFoco(0);

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
    <div className="min-h-screen bg-base-100 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {pagina.titulo}
          </h1>
          <p className="text-sm text-base-content/70">{pagina.subtitulo}</p>
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

        <nav className="tabs tabs-boxed w-full flex flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab flex-1 md:flex-none ${
                activeTab === tab.id ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "historia" && (
          <SectionCard title={historia.titulo}>
            <p className="leading-relaxed text-base-content/90 text-justify whitespace-pre-line">
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
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="select select-bordered w-full md:w-44"
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
                className="select select-bordered w-full md:w-32"
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
                    {/* linha vertical */}
                    <div className="absolute left-2 top-0 h-full w-px bg-base-300" />
                    {/* ponto do ano */}
                    <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-primary" />
                    <h3 className="text-xl font-semibold mb-3">{ano}</h3>

                    <div className="grid gap-3 md:grid-cols-2">
                      {timeline[ano].map((p) => (
                        <div
                          key={`${p.titulo}-${p.autor || ""}-${p.ano}`}
                          className="p-3 rounded-lg bg-base-200/70 hover:bg-base-300 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold">{p.titulo}</h4>
                            <span className="badge badge-sm">
                              {p.categoria}
                            </span>
                          </div>
                          {p.autor && (
                            <p className="text-xs text-base-content/70 mt-1">
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
                            className="p-3 rounded-lg bg-primary/10 border border-primary/40"
                          >
                            <p className="text-sm font-semibold">
                              {ev.tipo}
                              {ev.edicao && <> – {ev.edicao}ª edição</>}
                            </p>
                            {ev.periodo && (
                              <p className="text-xs text-base-content/80 mt-1">
                                {ev.periodo}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

              {producoesFiltradas.length === 0 && (
                <p className="text-sm text-base-content/70">
                  Nenhuma produção encontrada com os filtros atuais.
                </p>
              )}
            </div>
          </SectionCard>
        )}

        {activeTab === "itinerancia" && (
          <SectionCard title={itinerancia.titulo}>
            <p className="leading-relaxed text-base-content/90 text-justify mb-4">
              {itinerancia.texto}
            </p>
            <h3 className="font-semibold mb-2">Distritos onde já atuou:</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {itinerancia.distritos.map((d) => (
                <span key={d} className="badge badge-outline">
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
            <p className="leading-relaxed text-base-content/90 text-justify whitespace-pre-line">
              {meritos.texto}
            </p>
          </SectionCard>
        )}

        {activeTab === "colaboradores" && (
          <SectionCard title={secao_construtores.titulo}>
            <p className="leading-relaxed text-base-content/90 text-justify mb-4">
              {secao_construtores.intro}
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm">
              {secao_construtores.nomes.map((nome) => (
                <span
                  key={nome}
                  className="px-3 py-1 rounded-full bg-base-200/80 hover:bg-base-300 transition-colors"
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
                    <p className="text-xs uppercase text-base-content/60">
                      Morada ativa
                    </p>
                    <p className="text-sm font-semibold">
                      {moradaAtiva.periodo} — {moradaAtiva.nome}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setIsTourPlaying(true)}
                    disabled={isTourPlaying}
                  >
                    {isTourPlaying ? "A reproduzir…" : "Reproduzir percurso"}
                  </button>
                </div>

                <div className="divider my-1" />

                {moradas.map((m, i) => {
                  const isActive =
                    foco === i || (foco === null && i === moradas.length - 1);
                  return (
                    <button
                      key={i}
                      onClick={() => setFoco(i)}
                      className={`btn w-full justify-start text-left ${
                        isActive
                          ? "btn-primary"
                          : "btn-ghost bg-base-200 hover:bg-base-300"
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

function SectionCard({ title, children }) {
  return (
    <section className="card bg-base-100 shadow-md border border-base-200">
      <div className="card-body space-y-4">
        <h2 className="card-title text-xl md:text-2xl font-semibold">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body py-3 px-4">
        <p className="text-xs uppercase tracking-wide text-base-content/60">
          {label}
        </p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
}
