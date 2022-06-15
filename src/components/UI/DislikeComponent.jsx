import { DislikeFilled } from "@ant-design/icons";
const DislikeComponent = ({ key, item, deleteVote }) => {
  return (
    <DislikeFilled
      key={key}
      onClick={() => {
        deleteVote(item);
      }}
    />
  );
};

export default DislikeComponent;
