import React from "react";
import { useDispatch } from "react-redux";
import { getResId, toggleShowResMenu } from "../utils/menuSlice";

const ResCard = ({ res, id }) => {
  const dispatch = useDispatch();
  const restaurants = res.info;
  // console.log(restaurants);
  const handleClick = () => {
    dispatch(toggleShowResMenu());
    dispatch(getResId(id));
  };

  return (
    <div className="w-1/2   p-5 mx-2 rounded-lg " onClick={handleClick}>
      <div className="w-80 h-64">
        <img
          className="w-full h-full rounded-lg"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            restaurants.cloudinaryImageId
          }
          alt="resLogo"
        />
      </div>
      <h2 className="font-semibold text-2xl ">{restaurants.name}</h2>
      <p className="font-semibold text-xl">{restaurants.avgRating} ⭐</p>
      <p className="font-semibold text-xl ">{restaurants.locality}</p>
    </div>
  );
};

export default ResCard;
