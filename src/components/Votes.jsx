import { useEffect, useState } from "react";
import { patchReviewVotes } from "./api";

const Votes = ({ type, review, comment }) => {
  const [reviewIncrement, setReviewIncrement] = useState(0);
  const [commentIncrement, setCommentIncrement] = useState(0);

  useEffect(() => {
    setReviewIncrement(0);
    setCommentIncrement(0);
  }, []);

  useEffect(() => {
    patchReviewVotes(reviewIncrement, review.review_id).catch((err) => {
      if (err) setReviewIncrement(0);
    });
  }, [reviewIncrement]);

  const handleVote = (upOrDown) => {
    if (upOrDown === "up") {
      type === "review" ? setReviewIncrement(1) : setCommentIncrement(1);
    } else if (upOrDown === "down") {
      type === "review" ? setReviewIncrement(-1) : setCommentIncrement(-1);
    }
  };

  return (
    <>
      {type === "review" && <p>Votes: {review.votes + reviewIncrement}</p>}
      {type === "comment" && <p>Votes: {comment.votes + commentIncrement}</p>}
      <button
        onClick={() => {
          handleVote("up");
        }}
      >
        👍
      </button>
      <button
        onClick={() => {
          handleVote("down");
        }}
      >
        👎
      </button>
    </>
  );
};

export default Votes;
