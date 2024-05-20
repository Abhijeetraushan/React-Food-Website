import React,{Suspense,lazy, useEffect, useState }from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { Suspense, lazy } from 'react';
import UserContext from './utility/userContext';
import { Provider } from 'react-redux';
import appStore from './utility/appStore';
import Cart from './components/Cart';

const Grocery=lazy(()=>import('./components/Grocery'))

const AppLayout=()=>{

    const [userName, setUserName] = useState();

  //authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Abhijeet Raushan",
    };
    setUserName(data.name);
  }, []);

    return(
        <Provider store={appStore}>
         <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
        <Header/>
        <Outlet/>
        </div>
        </UserContext.Provider>
        </Provider>
    )
    }

    const approuter=createBrowserRouter(
        [
            {
                path: "/",
                element: <AppLayout />,
                children:[
                    {
                        path:"/",
                        element:<Body/>
                    },
                    {
                        path:"/About",
                        element:<About/>
                     },
                     {
                        path:"/Contact",
                        element:<Contact/>
                     },
                      {
                        path:"/Grocery",
                        element:<Suspense fallback={<h1>Loading....</h1>}>
                        <Grocery/>
                         </Suspense>
                     },
                    {
                        path: "/Restaurants/:resId",
                        element: <RestaurantMenu/>
                    }, 
                    {
                        path: "/cart",
                        element: <Cart />
                    },
                ],
                errorElement: <Error />
            },
            
        ]
    );

root=ReactDOM.createRoot(document.getElementById("container-body"))
root.render(<RouterProvider router={approuter}/>);