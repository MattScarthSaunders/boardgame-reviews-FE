import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
