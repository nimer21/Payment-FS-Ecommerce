import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VirticalCard from './../components/VirticalCard';

const SearchProduct = () => {
    const query = useLocation()
    //console.log("query", query.search);
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.searchProduct.url+query.search) // `http://localhost:5000/api/products?search=${query.search}`
        const dataResponse = await response.json()
        //console.log("dataResponse", dataResponse);
        setLoading(false);
        setData(dataResponse.data);
    }

    useEffect(() =>{
        fetchProduct();
    },[query]);
  return (
    <div className='container mx-auto p-4'>
        {loading && (<h2 className='text-lg text-center'>Loading...</h2>)}
        <p className='text-lg font-semibold my-3'>Search Results for "{query.search}" : {data.length}</p>

        {data.length === 0 && !loading && (<p className='bg-white text-lg text-center p-4'>No Data Found....</p>)}

        {
            data.length !==0 && !loading && (
                        <VirticalCard loading={ loading} data={data}/>
                )            
        }
        
    </div>
  )
}

export default SearchProduct