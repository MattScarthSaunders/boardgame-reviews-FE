import { useContext, useEffect, useState } from "react";
import { getReviews } from "../api";
import { ReviewsContext } from "../context/ReviewsContext";

export const useReviews = (resultLimit, page, category, sortValues) => {
  const { reviews, setReviews } = useContext(ReviewsContext);

  //filtering

  const [reviewCount, setReviewCount] = useState(0);
  const [pages, setPages] = useState([]);

  //ux
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    getReviews(page, resultLimit, category, sortValues)
      .then((response) => {
        setReviews(response.reviews);
        setReviewCount(response.total_count);
        let newPages;
        if (response.reviews.length >= 10) {
          newPages = new Array(Math.ceil(response.total_count / resultLimit));
        } else {
          newPages = new Array(
            Math.ceil(response.reviews.length / resultLimit)
          );
        }
        setPages(newPages.fill());
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setIsLoading(false);
          err.response.status < 500
            ? setError("These reviews do not exist!")
            : setError("Could not retrieve reviews. Please try again later");
        }
      });
  }, [resultLimit, page, category, sortValues]);

  return { reviews, reviewCount, pages, isLoading, error };
};
