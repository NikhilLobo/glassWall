const Votes = ({ votes, key, uploadNumber, item }) => {
  return <span key={key}>Votes: {votes.length}</span>;
};

export default Votes;
