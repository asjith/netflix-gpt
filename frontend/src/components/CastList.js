import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TMDB_MOVIE_CAST } from "../utils/constants";

const CastList = ({ movieId }) => {
  const [castList, setCastList] = useState([]);
  const isOnline = useSelector((store) => store.config.isOnline);

  useEffect(() => {
    if (!navigator.onLine) return;
    fetchCastList();
  }, [isOnline]);

  const fetchCastList = async () => {
    try {
      const data = await fetch(TMDB_MOVIE_CAST + movieId);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();
      setCastList(json.cast);
    } catch (error) {
      if (error.message.includes("HTTP error")) console.error(error.message);
      else console.error(`Network error, `, error);
    }
  };

  return (
    <div className="p-4 mx-[1rem] sm:mx-[3rem]">
      <h2 className="text-2xl">Top Cast</h2>
      <div></div>
    </div>
  );
};

export default CastList;
