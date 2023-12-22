import RestaurantCard from "./RestaurantCard";

import resList from "../utils/mockData";

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((item) => {
          return <RestaurantCard key={item.info.id} resData={item} />;
        })}
      </div>
    </div>
  );
};

export default Body;
