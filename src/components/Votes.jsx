import { patchReviewVotes } from "./api";

const Votes = ({ buttonName, setVotes, votes, review_id }) => {
  const handleVote = (buttonType, setVotes, upOrDown, id) => {
    if (upOrDown === "up") {
      setVotes((currVotes) => {
        let newVotes = { ...currVotes };
        newVotes[buttonType] = 1;
        return newVotes;
      });
    } else if (upOrDown === "down") {
      setVotes((currVotes) => {
        let newVotes = { ...currVotes };
        newVotes[buttonType] = -1;
        return newVotes;
      });
    }

    if (buttonName === "reviewVotes") {
      patchReviewVotes(votes[buttonType], id)
        .then()
        .catch((err) => {
          if (err)
            setVotes((currVotes) => {
              let newVotes = { ...currVotes };
              newVotes[buttonType] = 0;
              return newVotes;
            });
        });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          handleVote(buttonName, setVotes, "up", review_id);
        }}
      >
        👍
      </button>
      <button
        onClick={() => {
          handleVote(buttonName, setVotes, "down", review_id);
        }}
      >
        👎
      </button>
    </>
  );
};

export default Votes;
