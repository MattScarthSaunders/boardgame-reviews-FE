import { useEffect, useState, useContext } from "react";
import { getCommentsByReview } from "../api";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { VisualModeContext } from "../context/VisualModeContext";

const Comments = ({ review_id }) => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  // ux

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
        setComments={setComments}
        setError={setError}
      />
      {comments.length < 1 ? (
        <p>There are no comments yet!</p>
      ) : (
        <ul className={`Comments--List ${mode}`}>
          {comments.map((comment, index) => {
            return (
              <Comment
                key={comment.comment_id}
                comment={comment}
                index={index}
                setComments={setComments}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Comments;
