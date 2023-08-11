import React from "react";
import { Link } from "react-router-dom";
import VideoLength from "../shared/VideoLength";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:40 md:rounded-xl overflow-hidden">
          <img
            src={video?.thumbnails?.[0].url}
            alt=""
            className="h-full w-full object-cover"
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="flex text-white mt-3 ">
          <div className="flex items-start">
            <div className="flex w-9 h-9 rounded-full overflow-hidden">
              <img
                src={video?.author?.avatar[0]?.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex ml-3  flex-col overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="flex items-center gap-1 text-[12px] font-semibold text-white/[0.7] mt-2">
              {video?.author?.title}
              {video?.author?.badges[0]?.type == "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill />
              )}
            </span>
            <div className="flex font-semibold text-[12px] truncate overflow-hidden text-white/[0.7]">
              <span>{` ${abbreviateNumber(
                video?.stats?.views,
                2
              )} views`}</span>
              <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span>
              <span>{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
