import HeroBanner from "../components/HeroBanner";
import InitiativesList from "../components/InitiativesList";

export default function Home() {
  console.log("Home carregada");
  return (
    <div>
      <HeroBanner />
      <div className="translate-y-[-30%] w-full flex justify-center">
        <InitiativesList />
      </div>
    </div>
  );
}
