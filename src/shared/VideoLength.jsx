import React from "react";
import moment from "moment";
import { format } from "moment";

const VideoLength = ({ time }) => {
  const VideoLengthInSecond = moment()
    .startOf("day")
    .seconds(time)
    .format("H:mm:ss");
  return (
    <div className="absolute bottom-1 right-1 py-1 px-2 text-white text-md rounded-md bg-black">
      {VideoLengthInSecond}
    </div>
  );
};

export default VideoLength;
