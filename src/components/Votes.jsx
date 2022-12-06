import { useState } from "react";
import {
  patchCommentVotesDown,
  patchCommentVotesUp,
  patchReviewVotesDown,
  patchReviewVotesUp,
} from "./api";

const Votes = ({ type, review, comment, voteId }) => {
  const [reviewIncrement, setReviewIncrement] = useState(0);
  const [commentIncrement, setCommentIncrement] = useState(0);

  const handleUpVote = (type, id) => {
    if (type === "review") {
      setReviewIncrement((currInc) => {
        return currInc + 1;
      });
      patchReviewVotesUp(id).catch((err) => {
        if (err) {
          setReviewIncrement((currInc) => {
            return currInc - 1;
          });
        }
      });
    }

    if (type === "comment") {
      setCommentIncrement((currInc) => {
        return currInc + 1;
      });
      patchCommentVotesUp(id).catch((err) => {
        if (err) {
          setCommentIncrement((currInc) => {
            return currInc - 1;
          });
        }
      });
    }
  };

  const handleDownVote = (type, id) => {
    if (type === "review") {
      setReviewIncrement((currInc) => {
        return currInc - 1;
      });
      patchReviewVotesDown(id).catch((err) => {
        if (err) {
          setReviewIncrement((currInc) => {
            return currInc + 1;
          });
        }
      });
    }

    if (type === "comment") {
      setCommentIncrement((currInc) => {
        return currInc - 1;
      });
      patchCommentVotesDown(id).catch((err) => {
        if (err) {
          setCommentIncrement((currInc) => {
            return currInc + 1;
          });
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
        onClick={() => {
          handleUpVote(type, voteId);
        }}
      >
        ▲
      </button>
      <button
        className="Vote--Button"
        onClick={() => {
          handleDownVote(type, voteId);
        }}
      >
        ▼
      </button>
    </section>
  );
};

export default Votes;
