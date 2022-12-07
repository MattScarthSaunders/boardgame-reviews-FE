import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "./api";

const Categories = () => {
  const [isHidden, setIsHidden] = useState("Hide");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((response) => {
      setCategories(response);
      setIsLoading(false);
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
    </>
  );
};

export default Categories;
