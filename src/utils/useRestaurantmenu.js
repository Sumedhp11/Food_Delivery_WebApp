import { useEffect, useState } from "react";

const useRestaurantsmenu = (id) => {
  const [resInfo, setresinfo] = useState([]);
  const [resMenu, setresMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.1853779&lng=72.8584758&restaurantId=" +
        id +
        "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    const resInfo = json?.data?.cards[0]?.card?.card?.info;
    const resDesktopMenu =
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
        1,
        -2
      );
    const resMobileMenu =
      json?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(
        1,
        -2
      );
    setresinfo(resInfo);
    setresMenu(resDesktopMenu || resMobileMenu);
  };
  // console.log(resInfo);
  return [resInfo, resMenu];
};
export default useRestaurantsmenu;
