import { type CategoriesProps } from "../types/interfaces.ts";

const Categories: React.FC<CategoriesProps> = ({ onSelect, active }) => {
  const categories = [
    "World",
    "Nation",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health"
  ];

  return (
    <section className="categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`categories__btn ${active === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </section>
  );
};

export default Categories;
