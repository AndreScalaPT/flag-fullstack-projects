import HeroBanner from "../components/HeroBanner";
import InitiativesList from "../components/InitiativesList";
import JournalCardList from "../components/News/NewsCardList";
import OnStage from "../components/OnStage";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="translate-y-[-30%] w-full flex justify-center">
        <InitiativesList />
      </div>
      <JournalCardList />
      <OnStage />
    </div>
  );
}
