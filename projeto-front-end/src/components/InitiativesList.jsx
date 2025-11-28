import abrilemflor from "/imgs/initiatives/abrilemflor.png";
import cafecontacto from "/imgs/initiatives/cafecontacto.png";
import darteatro from "/imgs/initiatives/darteatro.png";
import festinfancia from "/imgs/initiatives/festinfancia.png";
import festovar from "/imgs/initiatives/festovar.png";
import oficinadeteatro from "/imgs/initiatives/oficinadeteatro.png";
import palcosverao from "/imgs/initiatives/palcosverao.png";

export default function InitiativesList() {
  const initiatives = [
    { src: abrilemflor, alt: "Abril em Flor" },
    { src: cafecontacto, alt: "Café Contacto" },
    { src: darteatro, alt: "Dar Teatro" },
    {
      src: festinfancia,
      alt: "Festinfância - Festival de Teatro para a Infância",
    },
    { src: festovar, alt: "Festovar - Festival de Teatro de Ovar" },
    { src: oficinadeteatro, alt: "Oficina de Teatro" },
    { src: palcosverao, alt: "Palcos de Verão" },
  ];

  return (
    <section className="mx-auto w-[90%] max-w-5xl bg-white text-black rounded-2xl shadow-xl py-8 px-18 flex justify-center items-center overflow-hidden">
      <ul className="flex flex-wrap justify-between items-center gap-x-6 gap-y-3 w-full">
        {initiatives.map((item, i) => (
          <li key={i} className="flex items-center justify-center">
            <img
              src={item.src}
              alt={item.alt}
              className="w-10 sm:w-12 md:w-14 lg:w-16 object-contain hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
