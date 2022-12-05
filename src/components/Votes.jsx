const Votes = ({ buttonName, setVotes }) => {
  return (
    <>
      <button
        onClick={() => {
          setVotes((currVotes) => {
            let newVotes = { ...currVotes };
            newVotes[buttonName] = 1;
            return newVotes;
          });
        }}
      >
        👍
      </button>
      <button
        onClick={() => {
          setVotes((currVotes) => {
            let newVotes = { ...currVotes };
            newVotes[buttonName] = -1;
            return newVotes;
          });
        }}
      >
        👎
      </button>
    </>
  );
};

export default Votes;
