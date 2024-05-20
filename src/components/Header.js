import { LOGO_IMG } from "../utility/constant";
import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utility/useOnlineStatus";
import UserContext from "../utility/userContext";
import { useSelector } from "react-redux";

const Header=()=>{
     const [btnNameReact, setBtnNameReact] = useState("Login");
    
     const onlineStatus=useOnlineStatus();

     const { loggedInUser } = useContext(UserContext);
     console.log(loggedInUser);

     const cartItems = useSelector((store) => store.cart.items);
     console.log(cartItems);


    return(
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">

        <div className='w-48'>
            <img className="w-32"
            src={LOGO_IMG}
            />
        </div>
        <div className="flex items-center">
            <ul className="flex p-4 m-4">
              <li>
                Online Status{onlineStatus?"🟢":"🔴"}
              </li>
                <li  className="px-4">
                <Link to="/">Home</Link>
                </li>
                <li  className="px-4">
                <Link to="/Grocery">Grocery</Link>
                </li>
                <li  className="px-4">
                  <Link to="/About">About</Link>
                </li>
                <li  className="px-4">
                  <Link to="/Contact">Contact Us</Link>
                </li>
                 <li className="px-4 text-xl">
                <Link to="/cart">Cart - ({cartItems.length} items)</Link>
                </li>
                <button
            className="login"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
            </ul>
        </div>
    </div>
    )
}
export default Header;