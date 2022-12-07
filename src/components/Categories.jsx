import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "./api";

const Categories = () => {
  const [isHidden, setIsHidden] = useState("Hide");
  const [categories, setCategories] = useState([]);

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
      <button ref={ref} className="NavButton" onClick={showCategories}>
        Categories
      </button>
      <section className={`Categories--Container ${isHidden}`}>
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
