import heroImg from "../imgs/hero/HeroImg-1.png";

export default function HeroBanner() {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full flex flex-col items-center justify-end text-center text-white overflow-hidden"
    >
      {/* Fundo */}
      <img
        src={heroImg}
        alt="Contacto Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Texto */}
      <div className="relative z-20 mb-[8vh] flex flex-col items-center">
        <h2 className="font-medium text-[clamp(0.8rem,1.8vw,1.4rem)] uppercase tracking-[0.35em] text-neutral-300">
          Companhia de Teatro Água Corrente de Ovar
        </h2>

        <h1
          className="
            font-extrabold 
            tracking-[0.25em] 
            text-[clamp(3rem,10vw,7rem)] 
            drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]
          "
        >
          CONTACTO
        </h1>
      </div>
    </section>
  );
}
