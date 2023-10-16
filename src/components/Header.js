import { useNavigate, Link } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { addLat, addLong } from "../utils/locationSlice";
import SearchItems from "./SearchItems";
import { removeShowCollection, toggleshow } from "../utils/collectionSlice";
import {
  removeResId,
  removeShowResMenu,
  toggleShowResMenu,
} from "../utils/menuSlice";
import { setShowClearCart, removeShowClearCart } from "../utils/cartSlice";

const Header = () => {
  const totalItems = useSelector((store) => store.cart.totalitems);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const toggleResMenu = useSelector((store) => store.menu.showRestaurantmenu);
  const showCart = useSelector((store) => store.cart.showCartpage);
  // console.log(toggleResMenu);
  const resId = useSelector((store) => store.menu.id);
  // console.log(resId);

  const [searchCache, setSearchCache] = useState({});

  const lat = useSelector((store) => store.location.lat);
  const long = useSelector((store) => store.location.long);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const uid = user?.uid;
  const Username = user?.displayName;
  const email = user?.email;
  // console.log("Header Displayed");

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      navigate("/error");
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(addLat(latitude));
      dispatch(addLong(longitude));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (toggleResMenu) {
          navigate("/restaurantMenu/" + resId);
        } else if (showCart) {
          navigate("/cart");
        } else {
          navigate("/restaurants");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const toggle = () => {
    dispatch(removeShowCollection());
    dispatch(removeShowResMenu());
    dispatch(removeResId());
    dispatch(removeShowClearCart());
  };

  const getSearchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/search/suggest?lat=" +
        lat +
        "&lng=" +
        long +
        "&str=" +
        query +
        "&trackingId=undefined"
    );
    const json = await data.json();
    // console.log(json?.data?.suggestions);
    setSearchCache({ [query]: json?.data?.suggestions });
    setSearchData(json?.data?.suggestions);
  };

  useEffect(() => {
    getSearchData();
  }, [query]);

  return (
    <div className="bg-indigo-300 p-6 flex justify-between items-center  ">
      <Link to={"/"}>
        <div onClick={toggle}>
          <img
            className="w-36"
            src="https://cdn-icons-png.flaticon.com/512/1404/1404945.png"
            alt="logo"
          />
        </div>
      </Link>

      {user ? (
        <Fragment>
          <div>
            <input
              className="w-96  p-3 rounded-lg mx-14 text-xl font-semibold border-2 border-black"
              type="text"
              placeholder="Search Restaurants"
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
            />
            {showSuggestion && <SearchItems searchData={searchData} />}

            <button
              onClick={handleSignOut}
              className="bg-indigo-950 text-white p-5 rounded-2xl text-lg font-semibold"
            >
              Sign out
            </button>
          </div>
          <div
            className="flex items-center mr-12"
            onClick={() => dispatch(setShowClearCart())}
          >
            <Link to={"/cart"}>
              <img
                className="w-20"
                src="https://cdn-icons-png.flaticon.com/512/3394/3394009.png"
                alt="cartLogo"
              />
              <span className="font-semibold text-lg text-white p-2">
                {totalItems}
              </span>
              <div className="font-semibold text-xl text-white p-2">CART</div>
            </Link>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default Header;
