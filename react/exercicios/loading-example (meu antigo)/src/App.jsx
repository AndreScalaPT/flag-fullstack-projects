import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((result) => {
        setCategories(result);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>The list:</h1>
          <ul>
            {categories.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <label>
            <input
              type="checkbox"
              onChange={() => setIsChecked((prev) => !prev)}
            />
            {isChecked ? "Enabled" : "Disabled"}
          </label>

          {isChecked ? (
            <input
              type="text"
              placeholder="O campo está ativo!"
              className="mt-2 p-2 border rounded bg-green-600"
            />
          ) : (
            <p className="mt-2 text-gray-500 italic"></p>
          )}
        </>
      )}
    </>
  );
}

export default App;
