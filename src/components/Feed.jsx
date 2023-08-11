import React, { useEffect } from "react";
import LeftNav from "./LeftNav";
import { useContext } from "react";
import { context } from "../context/contextApi";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, searchResults } = useContext(context);
  useEffect(() => {
    document.getElementById("root").classList.remove("custum-h");
  }, []);
  return (
    <div className="flex h-[calc(100%-56px)] ">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
          {!loading &&
            searchResults.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
