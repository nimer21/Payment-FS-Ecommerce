import React, { useState, useEffect } from 'react'
import SummaryApi from './../common/index';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading]  = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };
    // useEffect hook to fetch data from server
    // fetch data from server
    useEffect(() => {
        fetchCategoryProduct();
    }, []);
    // Render category list component with fetched data
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            loading ? (
                categoryLoading.map((item, index) => {
                    return (
                        <div key={"categoryLoading"+index} className='animate-pulse h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200'>Loading...</div>
                    )
                })
            ) : (
                categoryProduct.map((product,index)=>{
                    return (
                        <Link to={"/product-category?category="+product?.category} key={product?.category} className='cursor-pointer flex-wrap justify-between items-center'>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            {/** 
                             * <div className='flex-1 text-right'>
                                <span className='text-gray-600 text-sm'>Price: ${product?.price}</span>
                            </div>
                            */}
                        </Link>
                    )
                })
            )
        }
        </div>
    </div>
  )
}

export default CategoryList