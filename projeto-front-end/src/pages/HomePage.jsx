import HeroBanner from "../components/HeroBanner";
import InitiativesList from "../components/InitiativesList";
import NewsCardList from "../components/News/NewsCardList";
import OnStage from "../components/OnStage";

export default function HomePage() {
  return (
    <div className="relative">
      {/* HERO FULLSCREEN — menu por cima */}
      <div className="relative h-screen w-full overflow-hidden">
        <HeroBanner />
      </div>

      {/* BLoco flutuado como estavas a usar — mas sem conflitarmos com navbar */}
      <div className="relative -translate-y-[20%] w-full flex justify-center z-10">
        <InitiativesList />
      </div>

      {/* Notícias */}
      <section className="mt-14">
        <h2 className="section-title">Últimas Notícias</h2>
        <NewsCardList limit={4} paginate={false} />
      </section>

      <OnStage />
    </div>
  );
}
