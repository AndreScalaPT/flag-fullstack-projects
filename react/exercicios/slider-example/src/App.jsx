import { useState } from "react";
import Slider from "./components/Slider";
import TextField from "./components/TextField";

function App() {
  const [value, setValue] = useState(0);

  function handleSliderChange(newValue) {
    setValue(Number(newValue));
  }

  function handleTextChange(newText) {
    const num = Number(newText);
    setValue(num);
  }

  return (
    <>
      <p>Slider Value: {value}</p>
      <Slider value={value} onSliderChange={handleSliderChange} />
      <TextField textValue={value} onTextChange={handleTextChange} />
    </>
  );
}

export default App;
