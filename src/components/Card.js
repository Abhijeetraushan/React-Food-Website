import { IMG_CDN_URL } from "../utility/constant";

const  Card=(props)=>{
 const {resData}=props;    
   const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
  } = resData?.info;


    return(
    <div className="m-4 p-4 w-[200px] rounded-lg bg-gray-100 hover:bg-gray-200">
    <img  className="rounded-lg" src={IMG_CDN_URL+cloudinaryImageId}/>
        <h3  className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
    </div>)
}
export default Card;