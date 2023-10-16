import React, { useEffect, useState } from "react";
import { BIRYANI, PIZZA, Chinese, Burger } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getCollectionname, toggleshow } from "../utils/collectionSlice";
const FoodCategory = () => {
  const dispatch = useDispatch();
  const [FoodCategory, setfoodCategory] = useState([]);
  const [FoodCategoryInfo, setFoodCategoryInfo] = useState([]);

  const toggleCollection = async () => {
    dispatch(toggleshow());
  };

  const getFoodCategory = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1853779&lng=72.8584758&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setfoodCategory(json?.data?.cards[1]?.card?.card?.header?.title);

    setFoodCategoryInfo(json?.data?.cards[1]?.card?.card?.imageGridCards?.info);
  };
  // console.log(FoodCategoryInfo);
  useEffect(() => {
    getFoodCategory();
  }, []);
  // console.log(FoodCategoryInfo);
  return (
    <div className="m-5">
      <div>
        <h2 className="w-96 font-bold text-4xl ">{FoodCategory}</h2>
      </div>
      <div className="flex overflow-x-auto no-scrollbar">
        {FoodCategoryInfo
          ? FoodCategoryInfo.map((c, index) => (
              <img
                onClick={() => {
                  dispatch(getCollectionname(c.action.text));
                  toggleCollection();
                }}
                key={index}
                className="w-36 cursor-pointer mx-3"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" +
                  c.imageId
                }
                alt=""
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default FoodCategory;
