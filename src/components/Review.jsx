import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "./api";
import Comments from "./Comments";
import Votes from "./Votes";

const Review = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [reviewLoading, setReviewLoading] = useState(true);

  useEffect(() => {
    setReviewLoading(true);

    getReview(review_id).then((response) => {
      setReview(response);
      setReviewLoading(false);
    });
  }, []);

  return reviewLoading ? (
    <p>Loading Review...</p>
  ) : (
    <>
      <section className="Review">
        <img
          className="Review--Img"
          src={review.review_img_url}
          alt="review.title"
        />
        <section className="Review--About">
          <h2>{review.title}</h2>
          <h3>Game Designer: {review.designer}</h3>
          <h3>Category: {review.category}</h3>
        </section>
        <section className="Review--Body">
          <h3>Review:</h3>
          <p>{review.review_body}</p>
          <p>Review by: {review.owner}</p>
          <p>Reviewed on: {review.created_at.slice(0, 10)}</p>
          <Votes type="review" review={review} />
        </section>
        <Comments review_id={review_id} />
      </section>
    </>
  );
};

export default Review;
