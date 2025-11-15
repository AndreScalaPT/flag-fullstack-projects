import JournalCard from "./JournalCard";

export default function JournalCardList() {
  return (
    <>
      <h1 className="section-title mt-10">Notícias</h1>

      <section className="max-w-9/10 mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center">
          <JournalCard />
          <JournalCard />
          <JournalCard />
          <JournalCard />
        </div>
      </section>
    </>
  );
}
