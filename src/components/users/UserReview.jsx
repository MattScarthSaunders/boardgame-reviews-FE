import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { VisualModeContext } from "../context/VisualModeContext";
import DeleteItem from "../reviews/DeleteReview";

const UserReview = ({ review, setUserReviews }) => {
  const { review_id, owner, review_img_url, title, votes, created_at } = review;

  //visual mode
  const { mode } = useContext(VisualModeContext);

  const [deleting, setDeleting] = useState("");
  return (
    <li className={`UserReviews--List--Card ${deleting} ${mode}`}>
      <DeleteItem
        review={{ review_id, owner }}
        setDeleting={setDeleting}
        setUserReviews={setUserReviews}
      />
      <img src={review_img_url} alt={title} />
      <h3>{title}</h3>
      <section className={`UserReviews--List--Card--Info ${mode}`}>
        <p>User: {owner}</p>
        <p id="VoteCount">{votes >= 0 ? `+${votes}` : `-${votes}`}</p>
        <p>Posted: {created_at.slice(0, 10)}</p>
      </section>
      <Link tabIndex="-1" to={`/reviews/${review_id}`}>
        <button>See Review</button>
      </Link>
    </li>
  );
};

export default UserReview;
