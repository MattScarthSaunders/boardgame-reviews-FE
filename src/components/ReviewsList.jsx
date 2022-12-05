import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "./api";
import { ReviewsContext } from "./contexts/ReviewContext";

const ReviewsList = () => {
  const { reviews, setReviews } = useContext(ReviewsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [resultLimit, setResultLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getReviews(page, resultLimit).then((response) => {
      setReviews(response.reviews);
      setReviewCount(response.total_count);
      const newPages = new Array(Math.round(reviewCount / resultLimit));
      setPages(newPages.fill());
      setPage(0);
    });
    setIsLoading(false);
  }, [resultLimit, page]);

  return isLoading ? (
    <p>loading...</p>
  ) : (
    <>
      <label htmlFor="resultLimit">Result Limit:</label>
      <select
        id="resultLimit"
        onChange={(e) => {
          setResultLimit(e.target.value);
        }}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
      {reviewCount > resultLimit && <label forHtml="PageSelect0">Page:</label>}
      {pages.length > 1 &&
        pages.map((page, index) => {
          return (
            <button
              id={`PageSelect${index}`}
              key={index + Math.random()}
              onClick={() => {
                setPage(index);
              }}
            >
              {index}
            </button>
          );
        })}
      <ul className="Reviews--List">
        {reviews.map(
          ({
            review_id,
            title,
            owner,
            review_img_url,
            created_at,
            votes,
            comment_count,
          }) => {
            return (
              <li key={review_id} className="Reviews--List--Card">
                <h3>{title}</h3>
                <img src={review_img_url} alt={title} />
                <p>User: {owner}</p>
                <p>Votes: {votes}</p>
                <p>Comments: {comment_count}</p>
                <p>Posted: {created_at.slice(0, 10)}</p>
                <Link to={`/reviews/${review_id}`}>
                  <button>See Review</button>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};

export default ReviewsList;
