import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context, context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(context);
  useEffect(() => {
    document.getElementById("root").classList.add("custum-h");
    fetchVideoDetails();
    fetchRelatedVideo();
  }, [id]);
  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };
  const fetchRelatedVideo = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideo(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row  ">
        <div className="flex flex-col  lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[400px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          {/* video-title */}
          <div className="text-white font-semibold text-sm md:text-xl line-clamp-2 mt-3">
            {video?.title}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4 cursor-pointer">
            {/* 1st-div */}
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3 ">
                <div className="text-white text-md font-semibold flex items-center gap-2">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type == "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            {/* 2nd-div */}
            <div className="flex mt-4 md:mt-0 text-white gap-2">
              <div
                className="flex justify-center items-center  
              h-11 px-6 rounded-3xl text-white/[0.2] bg-white/[0.2]"
              >
                <AiOutlineLike className="text-white text-xl mr-2" />
                <span className="text-white">{` ${abbreviateNumber(
                  video?.stats?.likes,
                  2
                )} likes`}</span>
              </div>
              <div
                className="flex justify-center items-center  
              h-11 px-6 rounded-3xl text-white/[0.15] bg-white/[0.2]"
              >
                <AiOutlineLike className="text-white text-xl mr-2" />
                <span className="text-white">{` ${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} views`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4  lg:w-[350px] xl:w-[400px]  overflow-y-auto">
          {relatedVideo?.contents?.map((item, index) => {
            if (item.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
