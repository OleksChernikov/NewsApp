import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { type SearchProps } from "../types/interfaces.ts";

export default function Search({ onSearch }: SearchProps): JSX.Element {
  const [q, setQ] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setQ("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        placeholder="Search news..."
        value={q}
        onChange={handleChange}
      />
      <button className="search__btn button is-link" type="submit">
        Search
      </button>
    </form>
  );
}
