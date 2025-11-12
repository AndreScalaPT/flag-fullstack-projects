import heroImg from "../imgs/hero/HeroImg-1.png";
console.log("HeroBanner carregado");

export default function HeroBanner() {
  return (
    <section
      id="inicio"
      className="relative text-center text-white flex flex-col items-center justify-end h-screen"
    >
      <img
        src={heroImg}
        alt="Banner Contacto"
        className="absolute inset-0 w-full h-full object-cover -z-10 rotate-x-180"
      />

      <div className="absolute inset-0 bg-black/30 -z-10" />

      <div className="mb-[6vh] flex flex-col items-center space-y-[clamp(0.5rem,2vw,1.5rem)] px-6">
        <h2 className="font-medium text-[clamp(0.65rem,1.5vw,1.2rem)] uppercase tracking-[0.35em] text-neutral-300">
          Companhia de Teatro Água Corrente de Ovar
        </h2>

        <h1 className="font-extrabold tracking-[0.25em] text-[clamp(3rem,11vw,7rem)] leading-[0.9] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          CONTACTO
        </h1>
      </div>
    </section>
  );
}
