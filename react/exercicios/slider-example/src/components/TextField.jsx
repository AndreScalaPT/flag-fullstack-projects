function TextField({ textValue, onTextChange }) {
  function handleChange(event) {
    onTextChange(event.target.value);
  }

  return (
    <>
      <input
        type="number"
        value={textValue}
        onChange={handleChange}
        min="0"
        max="100"
      />
    </>
  );
}

export default TextField;
