import React, { Fragment } from "react";

import useRestaurantsmenu from "../utils/useRestaurantmenu";
import RestaurantInfo from "./RestaurantInfo";
import Menu from "./Menu";
import Header from "./Header";
import { useParams } from "react-router-dom";

const ResMenu = () => {
  const { id } = useParams();

  const [resInfo, resMenu] = useRestaurantsmenu(id);
  if (!resInfo && !resMenu) return null;
  // console.log(resInfo, resMenu);

  return (
    <div>
      <Header />
      <div className="relative lg:w-3/5 md:w-4/5 mx-auto my-5 px-4">
        {resMenu.length === 0 ? (
          <h1>Loading....</h1>
        ) : (
          <Fragment>
            <RestaurantInfo info={resInfo} />
            <Menu menu={resMenu} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ResMenu;
