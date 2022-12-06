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
    let valueChange = 0;

    if (type === "review" && reviewIncrement < 1) {
      valueChange = reviewIncrement < 0 ? 2 : 1;

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

    if (type === "comment" && commentIncrement < 1) {
      valueChange = commentIncrement < 0 ? 2 : 1;

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

    if (reviewIncrement > 1) {
      setReviewIncrement(1);
    }

    if (commentIncrement > 1) {
      setCommentIncrement(1);
    }
  };

  const handleDownVote = (type, id) => {
    let valueChange = 0;

    if (type === "review" && reviewIncrement > -1) {
      valueChange = reviewIncrement > 0 ? 2 : 1;

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

    if (type === "comment" && commentIncrement > -1) {
      valueChange = commentIncrement > 0 ? 2 : 1;

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

    if (reviewIncrement < -1) {
      setReviewIncrement(-1);
    }

    if (commentIncrement < -1) {
      setCommentIncrement(-1);
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
