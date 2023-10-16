import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Restaurants from "./Restaurants";
import FoodCategory from "./FoodCategory";
import TopRestaurants from "./TopRestaurants";
import Collection from "./Collection";
import ResMenu from "./ResMenu";

const Home = () => {
  const toggleShowCollection = useSelector(
    (store) => store.collection.showCollection
  );

  return (
    <div>
      <Header />
      {toggleShowCollection ? (
        <Collection />
      ) : (
        <Fragment>
          <FoodCategory />
          <TopRestaurants />
          <Restaurants />
        </Fragment>
      )}
    </div>
  );
};

export default Home;
