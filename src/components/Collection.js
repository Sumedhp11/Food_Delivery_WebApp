import React, { useEffect, useState } from "react";

import { foodCategory } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getResId, toggleShowResMenu } from "../utils/menuSlice";

const Collection = () => {
  const [foodId, setFoodId] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const dispatch = useDispatch();

  const FoodTitle = useSelector((store) => store.collection.collectionname);
  // console.log(FoodTitle);

  const getCollectionId = () => {
    const result = foodCategory.find(({ name }) => name === FoodTitle);

    setFoodId(result?.collectionId);
  };
  // console.log(foodId);

  const getCollectionData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1853779&lng=72.8584758&collection=" +
        foodId +
        "&tags=layout_CCS_" +
        FoodTitle +
        "&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const json = await data.json();

    const resData = json?.data?.cards.slice(3);
    // console.log(resData);
    setRestaurants(resData);
    // console.log(resData);

    setTitle(json?.data?.cards[0]?.card?.card?.title);

    setDescription(json?.data?.cards[0]?.card?.card?.description);
  };

  useEffect(() => {
    getCollectionId();
    getCollectionData();
  }, [foodId]);
  // console.log(restaurants);

  return (
    <div>
      <div>
        <h1 className="font-bold text-4xl p-4 m-4">{title}</h1>
        <p className="font-semibold text-xl p-2 m-2">{description}</p>
        <div className="flex flex-wrap h-auto">
          {restaurants
            ? restaurants.map((restaurants) => (
                <Link to={`/restaurantMenu/${restaurants.card.card.info.id}`}>
                  <div
                    onClick={() => {
                      dispatch(toggleShowResMenu());
                      dispatch(getResId(restaurants.card.card.info.id));
                    }}
                    key={restaurants.card.card.info.id}
                    className="mx-2 p-5 mb-48  "
                  >
                    <div className="w-80 h-64">
                      <img
                        className="w-full h-full rounded-lg"
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                          restaurants.card.card.info.cloudinaryImageId
                        }
                        alt="resLogo"
                      />
                      <h2 className="font-semibold text-2xl">
                        {restaurants.card.card.info.name}
                      </h2>
                      <p className="font-semibold text-xl">
                        {restaurants.card.card.info.avgRating} ⭐
                      </p>
                      <p className="font-medium text-xl ">
                        {restaurants.card.card.info.cuisines
                          .slice(1)
                          .join(", ")}
                      </p>
                      <p className="font-semibold text-xl">
                        {restaurants.card.card.info.sla.deliveryTime ||
                          restaurants.card.card.info.sla.slaString}{" "}
                        Mins
                      </p>
                      <p className="font-semibold text-xl">
                        {restaurants.card.card.info.costForTwo}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Collection;
