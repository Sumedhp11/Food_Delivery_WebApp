import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem, addQuantity, removeQuantity } from "../utils/cartSlice";

const ItemCard = ({ item }) => {
  // console.log(item);
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const items = useSelector((store) => store.cart.items);
  const foodItem = items.find((element) => element.id === item.id);

  const { name, price, showImage, imageId, description, defaultPrice } = item;
  const handleAdd = () => {
    dispatch(addItem({ ...item, quantity: 1, resId: id }));
  };
  const increaseQuantity = () => {
    dispatch(addQuantity(item));
  };
  const reduceQuantity = () => {
    dispatch(removeQuantity(item));
  };

  return (
    <div>
      <div className="flex justify-between border-b gap-2 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <span className="font-semibold">{name}</span>
            <span className="text-sm">
              ₹ {price / 100 || defaultPrice / 100}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-xs line-clamp-2">
              {description}
            </span>
          </div>
        </div>
        {showImage ? (
          <div className="w-28 max-h-24 shrink-0 relative flex justify-center">
            <img
              src={
                "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
                imageId
              }
              alt={name}
              className="w-full h-full object-cover object-center rounded-lg"
            />
            <div className="absolute -bottom-2 w-24 text-center bg-white text-green-600 px-2 py-2 text-xs font-bold border border-slate-300 rounded-lg ">
              {!foodItem ? (
                <button className="w-full" onClick={() => handleAdd(item)}>
                  ADD
                </button>
              ) : (
                <button className="w-full">
                  <div className="flex justify-between">
                    <span onClick={() => increaseQuantity}>➕</span>
                    <span>{foodItem?.quantity}</span>
                    <span onClick={() => reduceQuantity()}>➖</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="self-center shrink-0 w-24 text-center bg-white text-green-600 px-2 py-2 text-xs font-bold border border-slate-300 rounded-lg ">
            {!foodItem ? (
              <button className="w-full" onClick={() => handleAdd(item)}>
                ADD
              </button>
            ) : (
              <button className="w-full">
                <div className="flex justify-between">
                  <span className="" onClick={() => increaseQuantity()}>
                    ➕
                  </span>
                  <span>{foodItem.quantity}</span>
                  <span onClick={() => reduceQuantity()}>➖</span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
