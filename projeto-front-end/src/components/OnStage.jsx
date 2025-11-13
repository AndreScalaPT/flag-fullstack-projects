import onStageBanner from "../imgs/banners/onStageBanner.jpg";

export default function OnStage() {
  return (
    <>
      <section>
        <div>
          <img src={onStageBanner} alt="Banner Em Cena" />
          <h1>EM CENA</h1>
        </div>
        <div>
          <ul>
            <li>Peça 1</li>
            <li>Peça 2</li>
          </ul>
        </div>
      </section>
    </>
  );
}
