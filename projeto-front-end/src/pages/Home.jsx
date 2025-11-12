import HeroBanner from "../components/HeroBanner";
import PartnersList from "../components/PartnersList";

export default function Home() {
  console.log("Home carregada");
  return (
    <div>
      <HeroBanner />
      <PartnersList />
    </div>
  );
}
