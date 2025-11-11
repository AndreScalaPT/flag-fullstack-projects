function Slider({ value, onSliderChange }) {
  function handleChange(event) {
    onSliderChange(event.target.value);
  }

  return (
    <>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min="0"
        max="100"
      />
    </>
  );
}

export default Slider;
