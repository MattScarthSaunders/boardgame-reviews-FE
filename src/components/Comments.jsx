import { useEffect, useState, Fragment, useContext } from "react";
import { deleteComment, getCommentsByReview } from "./api";
import CommentInput from "./CommentInput";
import { VisualModeContext } from "./context/VisualModeContext";
import Votes from "./Votes";

const Comments = ({ review_id }) => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentToDelete, setCommentToDelete] = useState([]);

  // ux
  const [failedDelete, setFailedDelete] = useState("");
  const [deleting, setDeleting] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!comments.length) {
      setCommentsLoading(true);

      getCommentsByReview(review_id)
        .then((response) => {
          setComments(response);
          setCommentsLoading(false);
        })
        .catch((err) => {
          if (err) {
            setError("Could not retrieve comments. Please try again later.");
          }
        });
    }
  }, []);

  const handleDelete = (e, comment_id, index) => {
    setCommentToDelete([comment_id, index]);
  };

  const handleDeleteCheck = (e) => {
    const shouldDelete = e.target.value === "true" ? true : false;

    if (shouldDelete) {
      deleteComment(commentToDelete[0])
        .then(() => {
          setComments((currComments) => {
            let newComments = [...currComments];
            newComments.splice(commentToDelete[1], 1);
            return newComments;
          });
          setCommentToDelete([]);
          setDeleting("");
        })
        .catch((err) => {
          if (err) {
            setFailedDelete("Could not delete, please refresh and try again.");
            setDeleting("");
          }
        });
      setDeleting("deleting");
    } else {
      setCommentToDelete([]);
    }
  };

  return commentsLoading ? (
    <>
      <div className={`loader ${mode}`}></div>
      <p>loading...</p>
    </>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <section className={`Comments ${mode}`}>
      <h3>Comments</h3>
      <CommentInput
        review_id={review_id}
        comments={comments}
        setComments={setComments}
      />
      {comments.length < 1 ? (
        <p>There are no comments yet!</p>
      ) : (
        <ul className={`Comments--List ${mode}`}>
          {comments.map((comment, index) => {
            return (
              <Fragment key={comment.comment_id}>
                <li className={`Comment ${deleting} ${mode}`}>
                  <section className={`Comment--Header ${mode}`}>
                    <h4>{comment.author}</h4>
                    <p>{comment.created_at.slice(0, 10)}</p>
                    <Votes
                      type="comment"
                      comment={comment}
                      voteId={comment.comment_id}
                    />
                    <button
                      id="deleteButton"
                      onClick={(e) => {
                        handleDelete(e, comment.comment_id, index);
                      }}
                      value="deleteComment"
                      aria-label="delete comment"
                    >
                      X
                    </button>
                  </section>
                  <p className={`Comment--Body ${mode}`}>{comment.body}</p>
                </li>
                {commentToDelete.length &&
                commentToDelete[0] === comment.comment_id ? (
                  <section className={`Comment--Delete ${mode}`}>
                    <p tabIndex="0">Delete Comment - are you sure?</p>
                    <button onClick={handleDeleteCheck} value={true}>
                      Yes
                    </button>
                    <button onClick={handleDeleteCheck} value={false}>
                      No
                    </button>
                  </section>
                ) : null}
                {failedDelete && commentToDelete[0] === comment.comment_id ? (
                  <p id="failedDelete">{failedDelete}</p>
                ) : null}
              </Fragment>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Comments;
