import React, { useContext } from "react";
import { useState } from "react";
import SummaryApi from "./../common/index";
import { useEffect } from "react";
import Context from "../context";
import displayINRCurrency from './../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    //setLoading(true); // comment it to stop refresh the page when decrement or decrement qty
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      //'http://localhost:5000/api/cart/getCartItems'
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: SummaryApi.addToCartProductView.headers,
      /*headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ localStorage.getItem('token')
            },*/
      //body: JSON.stringify({userId: localStorage.getItem('userId')})
    });
    //setLoading(false); // comment it to stop refresh the page when decrement or decrement qty
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
      //setLoading(false);
    }
  };
  const handleLoading = async() =>{
    await fetchData();
  }
  useEffect(() => {
    //()=>{}();
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);
  //console.log("Cart data", data);

  const increaseQty = async (id,qty) => {
    //setLoading(true);
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: SummaryApi.updateCartProduct.headers,
      body: JSON.stringify({ _id: id, quantity: qty + 1 })
      //body: JSON.stringify({ quantity: qty + 1 })
    });
    //setLoading(false);
    const responseData = await response.json();
     console.log("Cart responseData", responseData);
    if (responseData.success) {
      fetchData();
      //setLoading(false);
    }
  };

  const decreaseQty = async (id,qty) => {
    if(qty >= 2) {
        //setLoading(true);
    const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: SummaryApi.updateCartProduct.headers,
        body: JSON.stringify({ _id: id, quantity: qty - 1 })
      });
      //setLoading(false);
      const responseData = await response.json();
      if (responseData.success) {
        fetchData()
        //setLoading(false);
      }
      console.log("Cart responseData : decreaseQty ", responseData);
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: SummaryApi.updateCartProduct.headers,
      body: JSON.stringify({ _id: id })
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () =>{
    //alert('Payment');
    // Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    // setLoading(true);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: 'include',
      headers: SummaryApi.payment.headers,
      body: JSON.stringify({
        cartItems : data
      })
    });
    //setLoading(false);
    const responseData = await response.json();
    if(responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId : responseData.id});
    }
    console.log("payment responseData : Cart ", responseData);  // "Metadata values must be strings, but for key `userId` you passed in a value of type `hash`. Invalid value: {:buffer=>"f�\u0012��YeX���\e"}"
    // {message: "You passed an empty string for 'line_items[0][pric…]'
    // from your request or supply a non-empty value.", error: true, success: false}

    /*if (responseData.success) {
      context.fetchUserCart();
      fetchData();
    }*/
  }

  const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity, 0);
  const totalPrice = data.reduce((prev,curr)=> prev + (curr.quantity * curr?.productId?.sellingPrice),0);
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {
          //loading? <p>Loading...</p> :
          //data.length === 0? <p>No items in cart</p> : <p>You have {data.length} items in cart</p>  // show total items in cart or no items in cart message.

          data.length === 0 && !loading && (
            <p className="bg-white py-5">Your cart is empty.</p>
          )
        }
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/**view product */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart.map((el,index) => {
              return (
                <div
                  key={el + "Add To Cart Loading"+index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              );
            })
          ) : (
            data.map((product, index) =>{
                return (
                    <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]">
                        <div className="w-32 h-32 bg-slate-200">
                            <img src={product?.productId?.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply"/>
                        </div>
                        <div className="px-4 py-2 relative">
                            {/**delete product */}
                            <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={()=> deleteCartProduct(product?._id)}>
                                <MdDelete/>
                            </div>
                            <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                            <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                            <div className="flex items-center justify-between">
                            <p className="text-red-600 font-medium text-lg">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                            <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded" onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                <span>{product?.quantity}</span>
                                <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded" onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                            </div>
                        </div>
                </div>
                )                
            })
          )}
        </div>
        {/**summary */}
        {
          data[0] && (
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
            <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Total Price</p>
                    <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button className="bg-blue-600 p-2 text-white w-full mt-2" onClick={handlePayment}>Payment</button>
            </div>
            )}
        </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
