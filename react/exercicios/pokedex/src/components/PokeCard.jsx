import "../App.css";
import { useEffect, useState } from "react";

export default function PokeCard({ url }) {
  const [pokeInfo, setPokeInfo] = useState(null);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      setPokeInfo(data);

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      setSpeciesInfo(speciesData);

      const typeRes = await fetch(
        `https://pokeapi.co/api/v2/type/${data.types[0].type.name}`
      );
      const typeData = await typeRes.json();
      const weak = typeData.damage_relations.double_damage_from.map(
        (t) => t.name
      );
      setWeaknesses(weak);
    })();
  }, [url]);

  if (!pokeInfo || !speciesInfo)
    return <p className="text-center text-gray-500">A carregar...</p>;

  const { id, name, height, weight, abilities, types, sprites, stats } =
    pokeInfo;
  const category =
    speciesInfo.genera.find((g) => g.language.name === "en")?.genus || "";
  const flavor =
    speciesInfo.flavor_text_entries.find((e) => e.language.name === "en")
      ?.flavor_text || "";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <h2 className="capitalize text-2xl font-bold text-gray-800 mb-1">
        {name}
        <span className="text-gray-400 text-lg ml-2">
          #{String(id).padStart(4, "0")}
        </span>
      </h2>
      <p className="text-gray-600 text-sm mb-4">{flavor.replace(/\f/g, " ")}</p>

      <div className="flex justify-center mb-4">
        <img
          src={sprites.other["official-artwork"].front_default}
          alt={name}
          className="w-40 h-40 object-contain"
        />
      </div>

      <div className="text-sm space-y-1 mb-4">
        <p>
          <span className="font-semibold text-gray-700">Altura:</span>{" "}
          {(height / 10).toFixed(1)} m
        </p>
        <p>
          <span className="font-semibold text-gray-700">Peso:</span>{" "}
          {(weight / 10).toFixed(1)} kg
        </p>
        <p>
          <span className="font-semibold text-gray-700">Categoria:</span>{" "}
          {category}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Habilidades:</span>{" "}
          {abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-700 mb-1">Tipos:</p>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <span
              key={t.type.name}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-700 mb-1">Fraquezas:</p>
        <div className="flex flex-wrap gap-2">
          {weaknesses.map((w) => (
            <span
              key={w}
              className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs capitalize"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2 text-sm">
          Estatísticas
        </h3>
        <div className="space-y-2">
          {stats.map((s) => (
            <div key={s.stat.name}>
              <div className="flex justify-between text-xs text-gray-500">
                <span className="capitalize">{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${s.base_stat / 2}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
