import { useEffect, useState } from "react";
import Example from "./components/Search";

/* TODO: usar useEffect e o filtercategories ser variavel de estado -- string compare*/

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCategories(result);
        setIsLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Example
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />{" "}
      {isLoading ? (
        <div>Loading...</div>
      ) : isChecked ? (
        <>
          <h2 className="text-xl font-bold mt-6 mb-3">Categories list:</h2>
          <ul className="divide-y divide-base-300">
            {filteredCategories.map((value) => (
              <li
                key={value}
                className="py-2 px-1 hover:bg-base-200 rounded transition"
              >
                {value}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-6 text-sm opacity-70">
          ⚠️ You need to enable the search to get also the list. ⚠️
        </p>
      )}
    </>
  );
}

export default App;
