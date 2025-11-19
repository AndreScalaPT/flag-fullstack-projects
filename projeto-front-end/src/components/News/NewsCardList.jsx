import newsData from "../../data/news.json";
import NewsCard from "./NewsCard";

export default function NewsCardList() {
  return (
    <>
      <h1 className="section-title mt-10">Notícias</h1>

      <section className="max-w-9/10 mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {newsData.map((item) => (
            <div key={item.id} className="h-full">
              <NewsCard
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                categories={item.categories}
                image={item.image}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
