import React, { useEffect, useState } from "react";
import ResCard from "./ResCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const TopRestaurants = () => {
  const [TopRestaurants, setTopRestaurants] = useState([]);
  const dispatch = useDispatch();

  const getTopRatedrestaurants = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1853779&lng=72.8584758&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setTopRestaurants(json?.data?.cards[2]?.card?.card);
    // console.log(json?.data?.cards[2].card.card);
  };
  useEffect(() => {
    getTopRatedrestaurants();
  }, []);

  const title = TopRestaurants.header?.title;
  const restaurants = TopRestaurants.gridElements?.infoWithStyle?.restaurants;
  //   console.log(restaurants);

  return (
    <div className=" m-5">
      <div>
        <h2 className="w-1/2 font-bold text-3xl">{title}</h2>
      </div>
      <div className="flex my-5 h-96 overflow-x-auto overflow-y-hidden no-scrollbar">
        {restaurants
          ? restaurants.map((res) => (
              <Link to={`/restaurantMenu/${res.info.id}`} key={res.info.id}>
                <ResCard  res={res} id={res.info.id} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default TopRestaurants;
