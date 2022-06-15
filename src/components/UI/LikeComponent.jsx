import { LikeFilled } from "@ant-design/icons";
const LikeComponent = ({ key, item, submitVote }) => {
  return (
    <LikeFilled
      key={key}
      onClick={() => {
        submitVote(item);
      }}
    />
  );
};

export default LikeComponent;
