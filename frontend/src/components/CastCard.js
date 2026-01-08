import React from "react";
import {
  MOVIE_CARD_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
} from "../utils/constants";
import castProfileURL from "../icons/cast.jpg";

const CastCard = ({ castDetails }) => {
  const castImage =
    MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + castDetails?.profile_path;

  return (
    <div className="flex flex-col gap-2 w-[10rem] p-4 my-4 bg-gray-900 rounded-md">
      <img
        src={castImage}
        alt={castDetails.name}
        onError={(e) => {
          e.target.src = castProfileURL;
          e.target.style.height = "191px";
        }}
      />
      <div className="flex flex-col gap-1">
        <p className="cast">{castDetails.name}</p>
        <p className="cast text-xs text-gray-500">{castDetails.character}</p>
      </div>
    </div>
  );
};

export default CastCard;
