import { useState } from "react";
import { postComment } from "./api";

const CommentInput = ({ review_id, setComments }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e, input, review_id) => {
    e.preventDefault();
    setFailureMessage("");
    setIsLoading(true);

    if (!input.length) {
      setFailureMessage("Please enter some text!");
      setIsLoading(false);
    } else {
      postComment(input, review_id)
        .then((response) => {
          setComments((currComments) => {
            let newComment = {
              comment_id: currComments.length + 1,
              body: response.body,
              votes: 0,
              author: response.username,
              review_id: 4,
              created_at: `${new Date(new Date())}`,
            };
            return [newComment, ...currComments];
          });

          setInput("");
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setFailureMessage("Failed to post comment, please try again.");
        });
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e, input, review_id);
        }}
      >
        <input
          placeholder="Add a comment..."
          onChange={handleInput}
          value={input}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {isLoading ? <p>Submitting comment...</p> : null}
      {failureMessage.length > 0 ? <p>{failureMessage}</p> : null}
    </>
  );
};

export default CommentInput;
