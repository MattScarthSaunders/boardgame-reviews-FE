import { useEffect, useState } from "react";
import { patchCommentVotes, patchReviewVotes } from "./api";

const Votes = ({ type, review, comment }) => {
  const [reviewIncrement, setReviewIncrement] = useState(0);
  const [commentIncrement, setCommentIncrement] = useState(0);

  useEffect(() => {
    setReviewIncrement(0);
    setCommentIncrement(0);
  }, []);

  useEffect(() => {
    if (type === "review")
      patchReviewVotes(reviewIncrement, review.review_id).catch((err) => {
        if (err) setReviewIncrement(0);
      });
    if (type === "comment")
      patchCommentVotes(commentIncrement, comment.comment_id).catch((err) => {
        if (err) setCommentIncrement(0);
      });
  }, [reviewIncrement, commentIncrement]);

  const handleVote = (upOrDown) => {
    if (upOrDown === "up") {
      type === "review" ? setReviewIncrement(1) : setCommentIncrement(1);
    } else if (upOrDown === "down") {
      type === "review" ? setReviewIncrement(-1) : setCommentIncrement(-1);
    }
  };

  return (
    <section className="Votes">
      {type === "review" && (
        <p>
          <strong>Votes: </strong>
          {review.votes + reviewIncrement}
        </p>
      )}
      {type === "comment" && (
        <p>
          <strong>Votes: </strong>
          {comment.votes + commentIncrement}
        </p>
      )}
      <button
        className="Vote--Button"
        onClick={() => {
          handleVote("up");
        }}
      >
        ▲
      </button>
      <button
        className="Vote--Button"
        onClick={() => {
          handleVote("down");
        }}
      >
        ▼
      </button>
    </section>
  );
};

export default Votes;
