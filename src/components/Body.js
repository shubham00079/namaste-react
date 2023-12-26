import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  // Local State Variables - Super Powerful Variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3176452&lng=82.9739144&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log(json);

    // Optional Chaining
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const filterList = () => {
    const temp = listOfRestaurants.filter((item) => item.info.avgRating > 4.2);
    setListOfRestaurants(temp);
  };

  const filterSearch = async (searchText) => {
    const temp = listOfRestaurants.filter((item) =>
      item.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return setFilteredRestaurant(temp);
  };

  // conditional rendering
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              filterSearch(searchText);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={filterList}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((item) => (
          <Link key={item.info.id} to={"/restaurants/" + item.info.id}>
            <RestaurantCard resData={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
