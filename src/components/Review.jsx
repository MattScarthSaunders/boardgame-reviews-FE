import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "./api";
import Comments from "./Comments";
import { VisualModeContext } from "./context/VisualModeContext";
import Votes from "./Votes";

const Review = () => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [reviewLoading, setReviewLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!review.length) {
      setReviewLoading(true);
      getReview(review_id)
        .then((response) => {
          setReview(response);
          setReviewLoading(false);
        })
        .catch((err) => {
          if (err) {
            setReviewLoading(false);
            setError("This review does not exist!");
          }
        });
    }
  }, []);

  return reviewLoading ? (
    <>
      <div className={`loader ${mode}`}></div>
      <p>loading...</p>
    </>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <>
      <section className={`Review ${mode}`}>
        <img
          className={`Review--Img ${mode}`}
          src={review.review_img_url}
          alt="review.title"
        />
        <section className={`Review--About ${mode}`}>
          <h2>{review.title}</h2>
          <h3>Game Designer: {review.designer}</h3>
          <h3>Category: {review.category}</h3>
        </section>
        <section className={`Review--Body ${mode}`}>
          <h3>Review:</h3>
          <p>{review.review_body}</p>
          <p>
            <strong className={`Review--strong ${mode}`}>Review by:</strong>{" "}
            {review.owner}
          </p>
          <p>
            <strong className={`Review--strong ${mode}`}>Reviewed on:</strong>{" "}
            {review.created_at.slice(0, 10)}
          </p>
          <Votes type="review" review={review} voteId={review.review_id} />
        </section>
        <Comments review_id={review_id} />
      </section>
    </>
  );
};

export default Review;
