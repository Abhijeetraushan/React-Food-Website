import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utility/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu=()=>{

    const { resId } = useParams();

    const resInfo =useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(2);

   

    if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =resInfo?.cards[0]?.card?.card?.info;

  const  {itemCards}  =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[10]?.card?.card;
    console.log("OD",itemCards)
    

     const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
   console.log("NEW",categories);

    return(
       <div  className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p  className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
       {categories.map((category,index)=>
       (<RestaurantCategory
         key={category?.card?.card.title}
        data={category?.card?.card}
         showItems={index == 2 ? true : false}
         setShowIndex={() => setShowIndex(index)}
        />))}
    </div>
  );
}

export default RestaurantMenu;