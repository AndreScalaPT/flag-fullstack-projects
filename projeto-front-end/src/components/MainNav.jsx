import contactoLogo from "../imgs/contacto-logo.png";
import ToggleTheme from "./ToggleTheme";

const sections = [
  { id: "inicio", label: "Início" },
  { id: "historial", label: "Historial" },
  { id: "noticias", label: "Notícias" },
  { id: "producoes", label: "Produções" },
  { id: "iniciativas", label: "Iniciativas" },
  { id: "atividades", label: "Atividades" },
  { id: "contactos", label: "Contactos" },
];

export default function MainNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-100/60 backdrop-blur-sm shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={contactoLogo}
              alt="Logo CONTACTO"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-l font-semibold">CONTACTO</span>
            <span className="text-[8px] uppercase tracking-[0.25em] opacity-70">
              Companhia de Teatro Água Corrente de Ovar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-3 text-[11px] opacity-80 uppercase">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className="hover:opacity-100 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
