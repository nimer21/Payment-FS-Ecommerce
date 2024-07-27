import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from './common/index';
import Context from './context/index';
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetials = async()=> {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials : 'include',
    })
    const dataApi = await dataResponse.json();
    //console.log('data-user:', dataResponse);
    if(dataApi.success) {
      //dispatch({type: 'SET_USER_DETAILS', payload: dataApi.data});
      dispatch(setUserDetails(dataApi.data));
      //SummaryApi.current_uer.data = dataApi.data;

    }
  }

  const fetchUserAddToCart = async()=> {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials : 'include',
      //body: JSON.stringify({ productId: 1, quantity: 2 }),
    })
    const dataApi = await dataResponse.json();
    //console.log('data-add-to-cart:', dataApi);
    setCartProductCount(dataApi?.data?.count);
    if(dataApi.success) {
      //console.log('Cart updated successfully');
      //toast.success("Cart updated successfully");
    }
  };

  useEffect(()=> {
    /**user Details */
    fetchUserDetials();
    /**user Details cart product */
    fetchUserAddToCart();
  },[]);

  return (
    <>
    <Context.Provider value={{
      fetchUserDetials, // user detail fetch
      cartProductCount, // current user add to cart product count,
      fetchUserAddToCart
    }}>
      <ToastContainer
      position="top-center"
      autoClose={2000}
      closeOnClick
      draggable={false}      
      />
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
