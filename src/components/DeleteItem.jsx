import { useContext } from "react";
import { deleteReview } from "./api";
import { UserContext } from "./context/UserContext";

const DeleteItem = ({ review, setReviews, setReviewSuccess }) => {
  const { user } = useContext(UserContext);

  const handleDelete = (id) => {
    deleteReview(id).then(() => {
      setReviews((currReviews) => {
        let newReviews = [...currReviews];
        const index = newReviews.find((review) => review.review_id === id);
        newReviews.splice(index, 1);
        return newReviews;
      });
      setReviewSuccess(false);
    });
  };

  return review.owner === user.username ? (
    <button
      id="deleteButton"
      onClick={() => {
        handleDelete(review.review_id);
      }}
      value="deleteComment"
      aria-label="delete comment"
    >
      X
    </button>
  ) : null;
};

export default DeleteItem;
