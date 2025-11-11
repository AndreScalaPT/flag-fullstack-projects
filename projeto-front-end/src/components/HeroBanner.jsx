export default function HeroBanner() {
  return (
    <section
      id="inicio"
      className="relative text-center text-white flex flex-col items-center justify-end h-screen"
    >
      <img
        src="/imgs/hero/HeroImg-1.png"
        alt="Banner Contacto"
        className="absolute inset-0 w-full h-full object-cover -z-10 rotate-x-180"
      />

      <div className="absolute inset-0 bg-black/30 -z-10" />

      <div className="mb-0 flex flex-col items-center space-y-2">
        <h2 className="text-base font-bold tracking-[0.3em] uppercase">
          Companhia de Teatro Água Corrente de Ovar
        </h2>

        <h1 className="text-8xl md:text-9xl font-bold tracking-[0.3em]">
          CONTACTO
        </h1>
      </div>
    </section>
  );
}
