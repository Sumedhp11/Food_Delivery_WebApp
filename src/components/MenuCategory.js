import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";

const MenuCategory = ({ menu, isActive, closeCategory, setActiveIndex }) => {
  const { title, itemCards, categories } = menu;
  const isVeg = useSelector((store) => store.item.isvegOnly);
  return (
    <div className="bg-white">
      <div
        className={
          `flex justify-between my-4 py-2 bg-red-400` +
          (itemCards && "border-b cursor-pointer")
        }
        id={title}
        onClick={() => {
          isActive ? closeCategory() : setActiveIndex();
        }}
      >
        <span className="text-lg font-bold cursor-pointer">
          {itemCards ? title + `(${itemCards.length})` : title}
        </span>
        {itemCards && <div>{isActive ? <p>⬆️</p> : <p>⬇️</p>}</div>}
      </div>
      {isActive ? (
        <div>
          {itemCards
            ? itemCards.map((item, index) =>
                isVeg ? (
                  item?.card?.info?.isVeg ? (
                    <ItemCard
                      key={item?.card?.info?.id}
                      item={item?.card?.info}
                    />
                  ) : null
                ) : (
                  <ItemCard
                    key={item?.card?.info?.id}
                    item={item?.card?.info}
                  />
                )
              )
            : categories
            ? categories.map((item, index) => (
                <MenuCategory
                  key={title}
                  menu={item}
                  isActive={isActive}
                  closeCategory={closeCategory}
                  setActiveIndex={setActiveIndex}
                />
              ))
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default MenuCategory;
