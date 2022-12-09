import { createContext, useState } from "react";

export const ReviewsContext = createContext();

export const ReviewsProvider = (props) => {
  const [reviews, setReviews] = useState([]);

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {props.children}
    </ReviewsContext.Provider>
  );
};
