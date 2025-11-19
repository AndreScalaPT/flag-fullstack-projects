import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";
import IconGroup from "./IconGroup";
import LoginModal from "./LoginModal";

import logoWhite from "../../imgs/contacto-logo-white.png";
import logoBlue from "../../imgs/contacto-logo-blue.png";

import { MdPerson } from "react-icons/md";

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const limit = window.innerHeight * 0.9;
      setScrolled(window.scrollY > limit);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg"
            : "bg-black/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img
              src={scrolled ? logoBlue : logoWhite}
              className="h-10 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex gap-8 font-light tracking-wide">
            <NavItem to="/" scrolled={scrolled} label="Entrada" />
            <NavItem to="/historial" scrolled={scrolled} label="Historial" />
            <NavItem to="/news" scrolled={scrolled} label="Notícias" />
            <NavItem to="/productions" scrolled={scrolled} label="Produções" />
            <NavItem
              to="/initiatives"
              scrolled={scrolled}
              label="Iniciativas"
            />
            <NavItem to="/activities" scrolled={scrolled} label="Atividades" />
            <NavItem to="/contacts" scrolled={scrolled} label="Contactos" />
          </nav>

          {/* DESKTOP: AÇÕES */}
          <div className="hidden lg:flex items-center gap-6">
            {/* REDES SOCIAIS */}
            <IconGroup scrolled={scrolled} />

            {/* LOGIN */}
            <button
              onClick={openLogin}
              className={`p-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-slate-700 hover:bg-slate-200"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <MdPerson className="w-6 h-6" />
            </button>
          </div>

          {/* MOBILE: HAMBURGER */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-white text-3xl"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE FULLSCREEN */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col animate-fadeIn">
          {/* BOTÃO FECHAR */}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white text-4xl absolute top-5 right-6"
          >
            ✕
          </button>

          {/* LINKS */}
          <nav className="mt-24 flex flex-col items-center gap-8 text-white text-2xl tracking-wide">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Entrada
            </Link>
            <Link to="/historial" onClick={() => setMobileOpen(false)}>
              Historial
            </Link>
            <Link to="/news" onClick={() => setMobileOpen(false)}>
              Notícias
            </Link>
            <Link to="/productions" onClick={() => setMobileOpen(false)}>
              Produções
            </Link>
            <Link to="/initiatives" onClick={() => setMobileOpen(false)}>
              Iniciativas
            </Link>
            <Link to="/activities" onClick={() => setMobileOpen(false)}>
              Atividades
            </Link>
            <Link to="/contacts" onClick={() => setMobileOpen(false)}>
              Contactos
            </Link>
          </nav>

          {/* BOTÃO LOGIN */}
          <div className="mt-10 px-8">
            <button
              onClick={() => {
                setMobileOpen(false);
                openLogin();
              }}
              className="w-full py-3 rounded-full border border-white/40 text-white font-semibold"
            >
              Entrar
            </button>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {loginOpen && <LoginModal closeModal={closeLogin} />}
    </>
  );
}
