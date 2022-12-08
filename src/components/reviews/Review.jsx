import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReview } from "../api";
import Comments from "../comments/Comments";
import { VisualModeContext } from "../context/VisualModeContext";
import Votes from "../Votes";

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
      setError("");
      getReview(review_id)
        .then((response) => {
          setReview(response);
          setReviewLoading(false);
        })
        .catch((err) => {
          if (err) {
            setReviewLoading(false);
            err < 500
              ? setError("This review does not exist!")
              : setError("Could not retrieve review, please try again later");
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
          alt={review.title}
        />
        <section className={`Review--About ${mode}`}>
          <h2>{review.title}</h2>
          <h3>Game Designer: {review.designer}</h3>
          <h3>Category: {review.category}</h3>
        </section>
        <section className={`Review--Body ${mode}`}>
          <h3>Review:</h3>
          <p>{review.review_body}</p>
          <p className={`Review--UserLink ${mode}`}>
            <strong className={`Review--strong ${mode}`}>Review by:</strong>{" "}
            <Link to={`/users/${review.owner}`}>{review.owner}</Link>
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
