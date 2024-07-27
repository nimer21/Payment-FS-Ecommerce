import React, { useState, useEffect } from 'react'
import UploadProduct from './../components/UploadProduct';
import SummaryApi from './../common/index';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  // function to get all products
  const getAllProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProducts.url); // fetch all products from '/api/products'
      const dataResponse = await response.json();
      setAllProducts(dataResponse?.data || []);
    } catch (error) {
      console.error(error);
    }
  }
  /*
  // function to open the upload product modal
  const openUploadProductModal = () => {
    setOpenUploadProduct(true);
  }
  // close the upload product modal
  const closeUploadProductModal = () => {
    setOpenUploadProduct(false);
  }
    */
  // component did mount
  useEffect(() => {
    // call the function to get all products
    getAllProducts();
  }, [allProducts]);
  
  
  // function to delete a product
  const deleteProduct = async (productId) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      const updatedProducts = allProducts.filter((product) => product._id!== productId);
      setAllProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  }
  // render all products
  const renderProducts = () => {
    return allProducts.map((product) => (
      <div key={product._id} className='my-4 border-b border-gray-200'>
        <div className='flex justify-between items-center'>
          <h3 className='font-bold text-lg'>{product.name}</h3>
          <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>deleteProduct(product._id)}>Delete</button>
        </div>
        <p>{product.description}</p>
        <img src={product.image} alt={product.name} className='w-full max-w-sm h-64 object-cover' />
      </div>
    ));
  }
  // render all products

   // function to handle form submission

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProducts.map((product,index)=> {
            return (
                <AdminProductCard data={product} key={index+"allProducts"} fetchData={getAllProducts}/>
            )
          })
        }
      </div>

      {/**upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={getAllProducts}/>
        )
      }
    </div>
  )
}

export default AllProducts