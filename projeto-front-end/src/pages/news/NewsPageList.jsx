import NewsCardList from "../../components/News/NewsCardList";

export default function NewsPageList() {
  return (
    <section className="container mx-auto py-30">
      <h1 className="section-title">Notícias</h1>
      <NewsCardList paginate={true} pageSize={8} />
    </section>
  );
}
