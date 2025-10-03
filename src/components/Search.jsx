import { useState } from "react";

export default function Search({ onSearch }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setQ("");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        placeholder="Search news..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="search__btn button is-link" type="submit">
        Search
      </button>
    </form>
  );
}