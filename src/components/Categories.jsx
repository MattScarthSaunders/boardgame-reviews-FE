import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "./api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isHidden, setIsHidden] = useState("Hide");

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  const showCategories = () => {
    isHidden === "Show" ? setIsHidden("Hide") : setIsHidden("Show");
  };

  return (
    <>
      <button className="NavButton" onClick={showCategories}>
        Categories
      </button>
      <section className="Reviews--Categories">
        <section className={`Categories--Container ${isHidden}`}>
          <ul className="Categories--List">
            {categories.map(({ slug }) => {
              return (
                <li key={slug}>
                  <Link onClick={showCategories} to={`/${slug}`}>
                    {slug}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Categories;
