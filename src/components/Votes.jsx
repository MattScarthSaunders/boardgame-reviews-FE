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
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  const handleUpVote = (type, id) => {
    let valueChange = 0;

    setHasUpVoted((currState) => {
      return !currState;
    });
    setHasDownVoted((currState) => {
      return currState ? !currState : currState;
    });

    if (type === "review") {
      valueChange = reviewIncrement < 0 ? 2 : reviewIncrement < 1 ? 1 : -1;

      setReviewIncrement((currInc) => {
        return currInc + valueChange;
      });
      patchReviewVotesUp(id, valueChange).catch((err) => {
        if (err) {
          setReviewIncrement((currInc) => {
            return currInc - valueChange;
          });
        }
      });
    }

    if (type === "comment") {
      valueChange = commentIncrement < 0 ? 2 : commentIncrement < 1 ? 1 : -1;

      setCommentIncrement((currInc) => {
        return currInc + valueChange;
      });
      patchCommentVotesUp(id, valueChange).catch((err) => {
        if (err) {
          setCommentIncrement((currInc) => {
            return currInc - valueChange;
          });
        }
      });
    }
  };

  const handleDownVote = (type, id) => {
    let valueChange = 0;

    setHasUpVoted((currState) => {
      return currState ? !currState : currState;
    });
    setHasDownVoted((currState) => {
      return !currState;
    });

    if (type === "review") {
      valueChange = reviewIncrement > 0 ? 2 : reviewIncrement > -1 ? 1 : -1;
      // valueChange = reviewIncrement > -1 ? 1 : -1;

      setReviewIncrement((currInc) => {
        return currInc - valueChange;
      });
      patchReviewVotesDown(id, valueChange).catch((err) => {
        if (err) {
          setReviewIncrement((currInc) => {
            return currInc + valueChange;
          });
        }
      });
    }

    if (type === "comment") {
      valueChange = commentIncrement > 0 ? 2 : commentIncrement > -1 ? 1 : -1;

      // valueChange = commentIncrement > -1 ? 1 : -1;

      setCommentIncrement((currInc) => {
        return currInc - valueChange;
      });
      patchCommentVotesDown(id, valueChange).catch((err) => {
        if (err) {
          setCommentIncrement((currInc) => {
            return currInc + valueChange;
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
        className={`Vote--Button ${hasUpVoted ? "upVote" : "neutralVote"}`}
        onClick={(e) => {
          handleUpVote(type, voteId, e);
        }}
      >
        ▲
      </button>
      <button
        className={`Vote--Button ${hasDownVoted ? "downVote" : "neutralVote"}`}
        onClick={(e) => {
          handleDownVote(type, voteId, e);
        }}
      >
        ▼
      </button>
    </section>
  );
};

export default Votes;
