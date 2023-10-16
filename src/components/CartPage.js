import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((store) => store.cart.items);
  const totalAmount = useSelector((store) => store.cart.total);
  const user = useSelector((store) => store.user);
  const handlecheckout = () => {
    navigate("/");
    alert("Thanks For Purchasing, Visit Again");
    if (items) {
      dispatch(clearCart());
    }
  };
  const postData = async () => {
    const res = await fetch(
      "https://thirdyearproject-bbaf4-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          user:{
          email: user.email,
          id: user.uid,
          orderedItems: items,}
        }),
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="relative h-full">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="max-w-7xl px-4 mx-auto my-6">
            <div className="flex justify-between items-center">
              <h1 className="font-bold">YOUR CART</h1>

              <button
                className="flex gap-2 items-center text-indigo-950"
                onClick={() => dispatch(clearCart())}
              >
                <span className="text-sm font-bold">REMOVE ALL</span>
                <span className="text-bold text-xl text-[#f974162d]">X</span>
              </button>
            </div>

            <div className="my-6">
              <div className="flex flex-wrap-reverse gap-6">
                <div className="flex-grow basis-8/12 border border-slate-300 bg-white">
                  <div className="lg:p-6 p-4">
                    <h1 className="font-bold">Enter Delivery Address</h1>

                    <form className="my-4">
                      <textarea
                        name=""
                        id=""
                        rows="5"
                        placeholder="Its just For UI"
                        className="w-full border-2 px-2"
                      ></textarea>

                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-bold bg-indigo-950 text-white"
                      >
                        ADD
                      </button>
                    </form>
                  </div>
                </div>

                <div className="border border-slate-300 flex-grow shrink-0 basis-3/12 bg-white self-end">
                  <table className="mb-4 w-full table-auto">
                    <thead>
                      <tr>
                        <th className="text-start pt-4 px-3">
                          <span className="text-sm">ITEMS</span>
                        </th>
                        <th className="text-start"></th>
                        <th className="text-start"></th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item) => (
                        <CartItem item={item} key={item.id} />
                      ))}
                      <tr>
                        <td className="px-3">
                          <span className="text-sm">Total</span>
                        </td>
                        <td></td>
                        <td>
                          <span className="text-sm font-bold">
                            ₹{totalAmount / 100}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-center px-3 pt-3">
                          <button
                            className="bg-indigo-500 w-full py-2"
                            onClick={handlecheckout}
                          >
                            <a
                              href={""}
                              className="text-sm font-bold text-white text-center"
                              onClick={postData}
                            >
                              PROCEED TO CHECKOUT
                            </a>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartPage;
