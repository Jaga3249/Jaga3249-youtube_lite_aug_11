import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api";
import LeftNav from "./LeftNav";
import SearchResultsVideoCard from "./SearchResultsVideoCard";

const SearchResults = () => {
  const [result, setResult] = useState();
  const { setLoading } = useContext(context);
  const { searchQuery } = useParams();
  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSerachResult();
  }, [searchQuery]);
  const fetchSerachResult = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-56px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 p-5 gap-2">
          {result?.map((item) => {
            if (item.type !== "video") return false;
            let video = item?.video;
            return (
              <SearchResultsVideoCard key={video?.videoId} video={video} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
