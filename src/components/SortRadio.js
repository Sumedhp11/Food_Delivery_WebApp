import React, { Fragment } from "react";

const SortRadio = ({ sortBy, handleOnChange }) => {
  return (
    <Fragment>
      <form className="bg-white  rounded-md border py-2 px-6 space-y-2 shadow-lg">
        <div className="flex items-center justify-between w-32">
          <label htmlFor="relevance">
            <span>Relevance</span>
          </label>
          <input
            type="radio"
            name="sortBy"
            id="relevance"
            value="relevance"
            className={`cursor-pointer appearance-none ring-2 ring-slate-950 ring-offset-2 w-3 h-3 rounded-full ${
              sortBy === "relevance" ? "bg-indigo-950 ring-black" : "bg-white"
            }`}
            checked={sortBy === "relevance"}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="flex items-center justify-between w-32">
          <label htmlFor="deliveryTime">
            <span>DeliveryTime</span>
          </label>
          <input
            type="radio"
            name="sortBy"
            id="deliveryTime"
            value="deliveryTime"
            className={`cursor-pointer appearance-none ring-2 ring-slate-950 ring-offset-2 w-3 h-3 rounded-full ${
              sortBy === "deliveryTime"
                ? "bg-indigo-950 ring-black"
                : "bg-white"
            }`}
            checked={sortBy === "deliveryTime"}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="flex items-center justify-between w-32">
          <label htmlFor="rating">
            <span>Rating</span>
          </label>
          <input
            type="radio"
            name="sortBy"
            id="rating"
            value="rating"
            className={`cursor-pointer appearance-none ring-2 ring-slate-950 ring-offset-2 w-3 h-3 rounded-full ${
              sortBy === "rating" ? "bg-indigo-950 ring-black" : "bg-white"
            }`}
            checked={sortBy === "rating"}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="flex items-center justify-between w-32">
          <label htmlFor="costForTwo">
            <span>CostForTwo</span>
          </label>
          <input
            type="radio"
            name="sortBy"
            id="costForTwo"
            value="costForTwo"
            className={`cursor-pointer appearance-none ring-2  ring-slate-950 ring-offset-2 w-3 h-3 rounded-full ${
              sortBy === "costForTwo"
                ? "bg-indigo-950 ring-orange-500"
                : "bg-white"
            }`}
            checked={sortBy === "costForTwo"}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default SortRadio;
