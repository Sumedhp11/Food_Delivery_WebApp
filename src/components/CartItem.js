import { useDispatch } from "react-redux";
import { addQuantity, removeQuantity } from "../utils/cartSlice";
import { Fragment } from "react";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddQuantity = () => {
    dispatch(addQuantity(item));
  };

  const handleRemoveQuantity = () => {
    dispatch(removeQuantity(item));
  };
  return (
    <Fragment>
      <tr>
        <td className="py-2 px-3">
          <span className="whitespace-nowrap text-sm">{item.name}</span>
        </td>
        <td className="flex justify-center py-2 px-3">
          <div className="flex justify-between items-center gap-2 text-indigo-950 border px-2 border-gray-300 py-1">
            <button className="text-sm" onClick={() => handleAddQuantity()}>
              ➕
            </button>
            <span className="text-sm">{item?.quantity}</span>
            <button className="text-sm" onClick={() => handleRemoveQuantity()}>
              ➖
            </button>
          </div>
        </td>
        <td className="py-2 px-3 ">
          <span className="whitespace-nowrap text-sm">
            ₹ {(item?.price / 100) * item?.quantity}
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default CartItem;
