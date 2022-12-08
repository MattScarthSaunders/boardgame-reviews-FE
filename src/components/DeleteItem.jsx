import { useContext, useState } from "react";
import { deleteReview } from "./api";
import { UserContext } from "./context/UserContext";
import { VisualModeContext } from "./context/VisualModeContext";

const DeleteItem = ({
  review,
  setReviews,
  setUserReviews,
  setReviewSuccess,
  setDeleting,
}) => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component
  const { user } = useContext(UserContext);
  const [tryDelete, setTryDelete] = useState(false);
  const [error, setError] = useState("");

  const checkDelete = () => {
    setTryDelete(true);
  };

  const handleDelete = (id) => {
    setDeleting("deleting");
    setError("");

    deleteReview(id)
      .then(() => {
        if (setUserReviews) {
          setUserReviews((currReviews) => {
            let newReviews = [...currReviews];
            const index = newReviews.findIndex(
              (review) => review.review_id === id
            );
            newReviews.splice(index, 1);
            return newReviews;
          });
        }
        if (setReviews) {
          setReviews((currReviews) => {
            let newReviews = [...currReviews];
            const index = newReviews.findIndex(
              (review) => review.review_id === id
            );
            newReviews.splice(index, 1);
            return newReviews;
          });
        }
        if (setReviewSuccess) {
          setReviewSuccess(false);
        }
        setTryDelete(false);
        setDeleting("");
        setError("");
      })
      .catch((err) => {
        if (err) {
          setError("Could not delete, please refresh and try again.");
          setDeleting("");
        }
      });
  };

  return (
    <>
      {review.owner === user.username ? (
        <button
          id="deleteButton"
          onClick={() => {
            checkDelete();
          }}
          value="deleteReview"
          aria-label="delete review"
        >
          X
        </button>
      ) : null}
      {tryDelete ? (
        <section className={`Review--Delete ${mode}`}>
          <p tabIndex="0">Delete Review - are you sure?</p>
          <button
            onClick={() => {
              handleDelete(review.review_id);
            }}
            value={true}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setTryDelete(false);
            }}
            value={false}
          >
            No
          </button>
        </section>
      ) : null}
      {error.length > 0 ? <p id="failedDelete">{error}</p> : null}
    </>
  );
};

export default DeleteItem;
