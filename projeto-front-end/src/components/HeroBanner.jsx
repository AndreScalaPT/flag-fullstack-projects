export default function HeroBanner() {
  return (
    <>
      <section id="inicio" className="pt-20 relative text-center text-white">
        <img
          src="/public/imgs/hero/HeroImg-1.png"
          alt="Banner Contacto"
          className="w-full h-screen object-cover rotate-x-180"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-6xl font-bold tracking-[0.3em] uppercase">
          Companhia de Teatro Água Corrente de Ovar
        </h2>
        <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold tracking-[0.3em]">
          CONTACTO
        </h1>
      </section>
    </>
  );
}
