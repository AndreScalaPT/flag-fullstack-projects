import onStageBanner from "/imgs/banners/onStageBanner.jpg";

export default function OnStage() {
  return (
    <section className="relative text-center overflow-hidden mt-30 mask-cover">
      <img
        src={onStageBanner}
        alt="Banner Em Cena"
        className="w-full h-[30vh] sm:h-[30vh] lg:h-[40vh] object-cover"
      />

      <h1
        className="translate-y-[-1.1em] 
                   font-extrabold uppercase text-[clamp(2rem,8vw,6rem)]
                   text-white whitespace-nowrap"
      >
        em cena
      </h1>

      <div>
        <ul>
          <li>Peça 1</li>
          <li>Peça 2</li>
        </ul>
      </div>
    </section>
  );
}
