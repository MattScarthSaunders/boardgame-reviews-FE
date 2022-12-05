import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "./api";
import { ReviewsContext } from "./contexts/ReviewContext";

const ReviewsList = () => {
  const { reviews, setReviews } = useContext(ReviewsContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((receivedReviews) => {
      setReviews(receivedReviews);
    });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <p>loading...</p>
  ) : (
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
  );
};

export default ReviewsList;
