import { useEffect, useState } from "react";

function PokeCard({url}) {
  const [pokeInfo, setPokeInfo] = useState({});

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setPokeInfo(result);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pokémon:", error);
      });
  }, []);

  return (
    <>
      <div>
        <img
          src={pokeInfo.sprites?.other["official-artwork"]?.front_default}
          alt={pokeInfo.name}
        />
        <div>NAME: {pokeInfo.name}</div>
        <div>WEIGHT: {pokeInfo.weight} lbs</div>
        <div>{pokeInfo.type}</div>
      </div>
    </>
  );
}

export default PokeCard;
