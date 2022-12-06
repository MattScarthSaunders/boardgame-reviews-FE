import { useEffect, useState } from "react";
import { getCommentsByReview } from "./api";
import CommentInput from "./CommentInput";
import Votes from "./Votes";

const Comments = ({ review_id }) => {
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!comments.length) {
      setCommentsLoading(true);

      getCommentsByReview(review_id).then((response) => {
        setComments(response);
        setCommentsLoading(false);
      });
    }
  }, []);

  return commentsLoading ? (
    <p>Loading Comments...</p>
  ) : (
    <section className="Comments">
      <h3>Comments</h3>
      <CommentInput review_id={review_id} setComments={setComments} />
      {comments.length < 1 ? (
        <p>There are no comments yet!</p>
      ) : (
        <ul className="Comments--List">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="Comment">
                <section className="Comment--Header">
                  <h4>{comment.author}</h4>
                  <p>On {comment.created_at.slice(0, 10)}</p>
                  <Votes
                    type="comment"
                    comment={comment}
                    voteId={comment.comment_id}
                  />
                </section>
                <p className="Comment--Body">{comment.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Comments;