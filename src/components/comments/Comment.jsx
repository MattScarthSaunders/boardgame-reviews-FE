import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { deleteComment } from "../api";
import { UserContext } from "../context/UserContext";
import { VisualModeContext } from "../context/VisualModeContext";
import Votes from "../Votes";

const Comment = ({ comment, index, setComments }) => {
  const { comment_id, author, created_at, body } = comment;

  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component
  const { user } = useContext(UserContext);

  const [failedDelete, setFailedDelete] = useState("");
  const [deleting, setDeleting] = useState("");
  const [commentToDelete, setCommentToDelete] = useState([]);

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

  return (
    <Fragment key={comment_id}>
      <li className={`Comment ${deleting} ${mode}`}>
        <section className={`Comment--Header ${mode}`}>
          <Link to={`/users/${author}`}>
            <h3 className={`.Reviews--List--Card--UserLink ${mode}`}>
              {author}
            </h3>
          </Link>
          <p>{created_at.slice(0, 10)}</p>
          <Votes type="comment" comment={comment} voteId={comment_id} />
          {author === user.username ? (
            <button
              id="deleteButton"
              onClick={(e) => {
                handleDelete(e, comment_id, index);
              }}
              value="deleteComment"
              aria-label="delete comment"
            >
              X
            </button>
          ) : null}
        </section>
        <p className={`Comment--Body ${mode}`}>{body}</p>
      </li>
      {commentToDelete.length && commentToDelete[0] === comment_id ? (
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
      {failedDelete && commentToDelete[0] === comment_id ? (
        <p id="failedDelete">{failedDelete}</p>
      ) : null}
    </Fragment>
  );
};

export default Comment;
