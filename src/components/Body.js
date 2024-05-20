import Card from "./Card";
import Shimmer from "./Shimmer";
import { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utility/useOnlineStatus";
import UserContext from "../utility/userContext";

const Body=()=>{
    const [searchText, setSearchText] = useState("");
    
const [listOfRestaurants, setListOfRestraunt] = useState([]);
const [filteredRestaurant, setFilteredRestaurant] = useState([]);

console.log("body rendered",listOfRestaurants)

 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();

    const dt=json?.data?.cards[1]?.card.card.gridElements.infoWithStyle.restaurants;
    setListOfRestraunt(dt);
    setFilteredRestaurant(dt);
  };

  const onlineStatus=useOnlineStatus();

  if(onlineStatus==false)
    return(<h1>you are offline</h1>)
  
     const { loggedInUser, setUserName } = useContext(UserContext);

    return listOfRestaurants.length===0?(<Shimmer/>):(
        <div className='body'>

            <div className="filter flex">

            <div  className="search m-4 p-4">
            <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button 
          className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
              //console.log(res)
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
            </div>
            <div className="search m-4 p-4 flex items-center">
                    <button 
                    className="px-4 py-2 bg-gray-100 rounded-lg"
                     onClick={()=>{const data=listOfRestaurants.filter((item)=>(item.info.avgRating>4));
                    setFilteredRestaurant(data);
                    }}>Top rated Restaurant</button>
            </div>

            <div className="search m-4 p-4 flex items-center">
          <label>UserName : </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        
            </div>
            <div className="flex flex-wrap">
                   {
                            filteredRestaurant.map((item)=>(
                          <Link key={item.info.id}
                           to={"/restaurants/"+item.info.id} >
                           <Card  resData={item} /> </Link>
                        ))
                        
                   } 
            </div>
        </div>
    )
}

export default Body;