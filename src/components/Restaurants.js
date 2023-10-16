import React, { useEffect, useState } from "react";
import SortRadio from "./SortRadio";
import {
  sortByCost,
  sortByDeliveryTime,
  sortByRating,
} from "../utils/HelperFunc";
import { getResId, toggleShowResMenu } from "../utils/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [Restaurants, setRestaurants] = useState([]);

  const dispatch = useDispatch();
  const [filteredRes, setFilterRes] = useState([]);
  const [ContainerTitle, setContainerTitle] = useState([]);
  const [showSort, setShowSort] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const getRestaurants = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1853779&lng=72.8584758&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setContainerTitle(json?.data?.cards[3]?.card?.card?.title);
    setRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterRes(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  useEffect(() => sortRes(), [sortBy]);
  useEffect(() => {
    getRestaurants();
  }, []);
  // console.log(Restaurants);
  const handleOnChange = (e) => {
    setSortBy(e.target.value);
    setShowSort(false);
  };

  const toggleShowSort = () => {
    setShowSort(!showSort);
  };
  const sortByRelevance = () => {
    setFilterRes(Restaurants);
  };

  const sortRes = () => {
    switch (sortBy) {
      case "rating":
        setFilterRes(sortByRating(Restaurants));
        break;
      case "deliveryTime":
        setFilterRes(sortByDeliveryTime(Restaurants));
        break;
      case "costForTwo":
        setFilterRes(sortByCost(Restaurants));
        break;
      default:
        sortByRelevance();
    }
  };
  // const handleClick = () => {
  //   dispatch(toggleShowResMenu());
  //   dispatch(getResId(resId));
  // };

  return (
    <div className="mx-5 mt-8 ">
      <div>
        <h2 className="w-1/2 font-bold text-3xl">{ContainerTitle}</h2>
      </div>

      {filteredRes ? (
        <div className="my-4">
          <button
            className="bg-indigo-950 p-4 rounded-lg w-32"
            onClick={() => toggleShowSort()}
          >
            <span className="text-sm font-bold text-white">SORT</span>
          </button>
          {showSort ? (
            <SortRadio sortBy={sortBy} handleOnChange={handleOnChange} />
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap h-auto">
        {filteredRes
          ? filteredRes.map((res) => (
              <Link to={`/restaurantMenu/${res.info.id}`} key={res.info.id}>
                <div
                  className="mx-2 p-5 mb-48"
                  onClick={() => {
                    dispatch(toggleShowResMenu());
                    dispatch(getResId(res.info.id));
                  }}
                >
                  <div className="w-80 h-64">
                    <img
                      className="w-full h-full rounded-lg"
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                        res.info.cloudinaryImageId
                      }
                      alt="resLogo"
                    />
                    <h2 className="font-semibold text-2xl">{res.info.name}</h2>
                    <p className="font-semibold text-xl">
                      {res.info.avgRating} ⭐
                    </p>
                    <p className="font-medium text-xl ">
                      {res.info.cuisines.slice(1).join(", ")}
                    </p>
                    <p className="font-semibold text-xl">
                      {res.info.sla.deliveryTime || res.info.sla.slaString} Mins
                    </p>
                    <p className="font-semibold text-xl">
                      {res.info.costForTwo}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};
export default Restaurants;
