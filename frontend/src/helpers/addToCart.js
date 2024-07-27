import SummaryApi from './../common/index';
import { toast } from 'react-toastify';
const addToCart = async(e,id) => {

    e?.stopPropagation();
    e?.preventDefault();
    //...
    // Add the product to the cart array
    //...
    //alert(`Product ${id} added to cart!`);

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method: SummaryApi.addToCartProduct.method,
        credentials:'include',
        headers: SummaryApi.addToCartProduct.headers,
        body: JSON.stringify({ productId: id }),
    })
    const responseData = await response.json();
    if(responseData.success){
        // Update the cart total
        //...
        toast.success(responseData.message);
    }
    if(responseData.error){
        toast.error(responseData.message);
    }

    //return responseData;
};
/*
const removeFromCart = (id) => {
    //...
    // Remove the product from the cart array
    //...
    alert(`Product ${id} removed from cart!`);
}

const updateCartQuantity = (id, quantity) => {
    //...
    // Update the quantity of the product in the cart array
    //...
    alert(`Product ${id} quantity updated to ${quantity}!`);
}

const cartItems = [
    { id: 1, name: "Product 1", price: 10, quantity: 2 },
    { id: 2, name: "Product 2", price: 20, quantity: 1 },
    { id: 3, name: "Product 3", price: 30, quantity: 3 },]
    
const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

const cart = {
    items: cartItems,
    total: cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
}

// Usage

cart.addToCart(1); // Product 1 added to cart!
cart.addToCart(2); // Product 2 added to cart!
cart.addToCart(3); // Product 3 added to cart!

console.log(cart.items); // [ { id: 1, name: 'Product 1', price: 10, quantity: 2 }, { id: 2, name: 'Product 2', price: 20, quantity: 1 }, { id: 3, name: 'Product 3', price: 30, quantity: 3 } ]
*/
export default addToCart; //