import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
const Favourite = ({ key, item, submitFavourite }) => {
  const [favourite, setFavourite] = useState("");
  return (
    <HeartFilled
      key={key}
      style={{
        color: favourite ? "red" : "",
      }}
      onClick={() => {
        submitFavourite(item);
        setFavourite((favourite) => !favourite);
      }}
    />
  );
};

export default Favourite;
