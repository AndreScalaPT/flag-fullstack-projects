function Example({ isChecked, setIsChecked, searchTerm, setSearchTerm }) {
  /* Passar em props em vez de ^^^^^^^^^        declarar aqui */
  return (
    <>
      <label>
        Enabled
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </label>

      <input
        disabled={!isChecked}
        type="text"
        placeholder="🔍 Search here what you need..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        className="input input-ghost bg-base-200 backdrop-blur-sm w-full max-w-sm"
      />
    </>
  );
}

export default Example;
