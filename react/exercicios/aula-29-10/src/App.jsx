import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";

function App() {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then(function (result) {
        setPokeList(result.results);
      });
  }, []);

  return (
    <>
      <ul>
       {pokeList.map((value) => (
          <li>
            <PokeCard url={value.url} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
