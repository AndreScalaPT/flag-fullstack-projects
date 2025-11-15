import newsCover from "../imgs/productions/prod-um-inimigo-do-povo.jpg";

export default function JournalCard() {
  return (
    <div className="flex flex-col lg:flex-row bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full">
      <figure className="lg:w-1/5 w-full h-52 lg:h-auto shrink-0">
        <img
          src={newsCover}
          alt="Um inimigo do povo"
          className="w-full h-full object-cover lg:object-contain"
        />
      </figure>

      <div className="flex flex-col justify-between p-4 lg:p-6 text-neutral-800 flex-1">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-neutral-600">
              15 de novembro
            </span>
          </div>

          <h2 className="text-lg lg:text-xl font-semibold leading-snug mt-1">
            Contacto estreia “Um inimigo do povo”, de Henrik Ibsen
          </h2>

          <p className="text-sm text-neutral-600 mt-2 line-clamp-3">
            A Contacto estreia no próximo dia 15 de novembro, sábado, pelas
            21h45, “Um inimigo do povo”, de Henrik Ibsen, com encenação de Pedro
            Damião. A peça aborda a ética e a verdade face ao poder político...
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <div className="badge badge-outline text-xs lg:text-sm">
              Produções
            </div>
            <div className="badge badge-outline text-xs lg:text-sm">
              Notícias
            </div>
          </div>

          <a href="#" className="text-sm font-medium hover:underline">
            ler mais…
          </a>
        </div>
      </div>
    </div>
  );
}
