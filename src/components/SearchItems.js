import React from "react";

const SearchItems = ({ searchData }) => {
  const Suggestion = searchData;
  console.log(Suggestion);
  if (Suggestion === undefined || null) return;

  return (
    <div className="absolute w-96 p-3 mx-14 bg-white top-28 mt-1 border-2 border-black border-t-0 rounded-lg rounded-t-none">
      {Suggestion.map((s, index) => (
        <div className="flex justify-between items-center border border-gray-300">
          <span className="text-2xl font-bold">{s.text}</span>
          <span className="font-semibold text-lg px-2">{s.type}</span>
          <img
            className="w-20"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${s.cloudinaryId}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default SearchItems;
