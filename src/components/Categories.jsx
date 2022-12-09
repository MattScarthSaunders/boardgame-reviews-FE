import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "./api";
import { CategoryContext } from "./_context/CategoryContext";
import { VisualModeContext } from "./_context/VisualModeContext";

const Categories = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component
  const { categories, setCategories } = useContext(CategoryContext);

  const [isHidden, setIsHidden] = useState("Hide");

  const ref = useRef(null);
  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const showCategories = () => {
    isHidden === "Show" ? setIsHidden("Hide") : setIsHidden("Show");
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsHidden("Hide");
    }
  };

  return (
    <>
      <button
        ref={ref}
        className={`NavButton ${mode}`}
        onClick={showCategories}
      >
        Categories
      </button>
      <section className={`Categories--Container ${isHidden} ${mode}`}>
        <ul className="Categories--List">
          {categories.map(({ slug }) => {
            return (
              <li key={slug}>
                <Link
                  onClick={() => {
                    setIsHidden("Hide");
                  }}
                  to={`/${slug}`}
                >
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
