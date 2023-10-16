import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeShowClearCart } from "../utils/cartSlice";

const EmptyCart = () => {
  const dispatch = useDispatch();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 ">
      <div className="max-w-sm w-96 space-y-3 text-center">
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          }
          alt="Empty-Cart"
          className="mix-blend-multiply w-full h-full"
        />
        <h1 className="text-base text-slate-700 font-semibold">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-sm text-slate-400">
          You Can Go To HomePage To View More Restaurants
        </p>
        <button className="bg-indigo-950 py-2 px-6">
          <Link to={"/restaurants"}>
            <span
              className="text-white font-bold text-sm"
              onClick={() => dispatch(removeShowClearCart())}
            >
              Browse Restaurants
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
