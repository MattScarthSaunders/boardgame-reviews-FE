const Votes = ({ buttonName, setVotes }) => {
  return (
    <>
      <button
        onClick={() => {
          setVotes((currVotes) => {
            let newVotes = { ...currVotes };
            !newVotes[buttonName]
              ? (newVotes[buttonName] = 1)
              : newVotes[buttonName]++;
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
            !newVotes[buttonName]
              ? (newVotes[buttonName] = -1)
              : newVotes[buttonName]--;
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
