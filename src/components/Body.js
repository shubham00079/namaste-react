import RestaurantCard from "./RestaurantCard";

import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [list, setList] = useState(resList);

  const filterList = () => {
    const temp = list.filter((item) => item.info.avgRating > 4.2);
    setList(temp);
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={filterList}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {list.map((item) => {
          return <RestaurantCard key={item.info.id} resData={item} />;
        })}
      </div>
    </div>
  );
};

export default Body;
