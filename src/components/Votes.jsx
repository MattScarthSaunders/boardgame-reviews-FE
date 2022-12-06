import { useState } from "react";
import { patchCommentVotes, patchReviewVotes } from "./api";

const Votes = ({ type, review, comment }) => {
  const [reviewIncrement, setReviewIncrement] = useState(0);
  const [commentIncrement, setCommentIncrement] = useState(0);
  const [upVote, setUpVote] = useState(1);
  const [downVote, setDownVote] = useState(-1);

  const handleUpVote = (e, type) => {
    setUpVote(0);
    if (type === "review" && e.target.value !== 0) {
      setReviewIncrement(1);
      patchReviewVotes(e.target.value, review.review_id).catch((err) => {
        if (err) {
          setUpVote(1);
          setReviewIncrement(0);
        }
      });
    }
    if (type === "comment" && e.target.value !== 0) {
      setCommentIncrement(1);
      patchCommentVotes(e.target.value, comment.comment_id).catch((err) => {
        if (err) {
          setUpVote(1);
          setCommentIncrement(0);
        }
      });
    }
  };

  const handleDownVote = (e, type) => {
    setDownVote(0);

    if (type === "review" && e.target.value !== 0) {
      setReviewIncrement(-1);
      patchReviewVotes(e.target.value, review.review_id).catch((err) => {
        if (err) {
          setDownVote(-1);
          setReviewIncrement(0);
        }
      });
    }
    if (type === "comment" && e.target.value !== 0) {
      setCommentIncrement(-1);
      patchCommentVotes(e.target.value, comment.comment_id).catch((err) => {
        if (err) {
          setDownVote(-1);
          setCommentIncrement(0);
        }
      });
    }
  };

  return (
    <section className="Votes">
      {type === "review" ? (
        <p>
          <strong>Votes: </strong>
          {review.votes + reviewIncrement}
        </p>
      ) : null}
      {type === "comment" ? (
        <p>
          <strong>Votes: </strong>
          {comment.votes + commentIncrement}
        </p>
      ) : null}
      <button
        className="Vote--Button"
        onClick={(e) => {
          handleUpVote(e, type);
        }}
        value={upVote}
      >
        ▲
      </button>
      <button
        className="Vote--Button"
        onClick={(e) => {
          handleDownVote(e, type);
        }}
        value={downVote}
      >
        ▼
      </button>
    </section>
  );
};

export default Votes;
