import { useContext, useState } from "react";
import { getCommentsByReview, postComment } from "../api";
import { UserContext } from "../_context/UserContext";
import { VisualModeContext } from "../_context/VisualModeContext";

const CommentInput = ({ review_id, setComments, setError }) => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  const { user } = useContext(UserContext);

  const [input, setInput] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e, input, review_id) => {
    e.preventDefault();
    setWarningMessage("Submitting Message...");
    e.target[1].disabled = true;

    if (!input.length) {
      setWarningMessage("Please enter some text!");
      e.target[1].disabled = false;
    } else {
      postComment(input, review_id, user.username)
        .then((response) => {
          getCommentsByReview(review_id)
            .then((response) => {
              setComments(response);
            })
            .catch((err) => {
              if (err) {
                setError(
                  "Could not retrieve comments. Please try again later."
                );
              }
            });

          setInput("");
          setWarningMessage("");
          return false;
        })
        .then((res) => {
          e.target[1].disabled = res;
        })
        .catch((err) => {
          if (err) {
            setWarningMessage("Failed to post comment, please try again.");
            e.target[1].disabled = false;
          }
        });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e, input, review_id);
        }}
        className={`Comment--InputForm ${mode}`}
      >
        <textarea
          placeholder="Add a comment..."
          onChange={handleInput}
          value={input}
        ></textarea>
        <button
          className={`SubmitButton ${mode}`}
          type="submit"
          disabled={false}
        >
          Submit
        </button>
      </form>
      {warningMessage.length > 0 ? <p>{warningMessage}</p> : null}
    </>
  );
};

export default CommentInput;
