import { useEffect, useState } from "react";
import { getCommentsByReview } from "./api";
import Votes from "./Votes";

const Comments = ({ review_id }) => {
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setCommentsLoading(true);

    getCommentsByReview(review_id).then((response) => {
      setComments(response);
      setCommentsLoading(false);
    });
  }, []);

  return commentsLoading ? (
    <p>Loading Comments...</p>
  ) : (
    <section className="Comments">
      <h3>Comments</h3>
      {comments.length < 1 ? (
        <p>There are no comments yet!</p>
      ) : (
        <ul className="Comments--List">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <h4>{comment.author}</h4>
                <p>at {comment.created_at}</p>
                <Votes type="comment" comment={comment} />
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Comments;
