import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";

export default function App() {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((result) => setPokeList(result.results));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Pokédex
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokeList.map((pokemon) => (
          <PokeCard key={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}
