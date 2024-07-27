import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment  from 'moment';
import displayINRCurrency from './../helpers/displayCurrency';

const AllOrders = () => {
    const [data,setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: 'include',
      });
      const responseData = await response.json();
      console.log("OrderPage => responseData",responseData);
      setData(responseData.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() =>{
    fetchOrderDetails();
    // eslint-disable-next-line
  },[]);
  return (
    <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }
      <div className='p-4 w-full'>
        {
          data.map((item,index) => {
            return (
              <div key={item?.userId+index}>
                <p className='font-medium text-lg'>{moment(item?.createdAt).format('LL')}</p>

                <div className='border rounded p-2'>
                
                <div className='flex flex-col lg:flex-row justify-between'>
                <div className='grid gap-1'>
                  {
                    item?.productDetails.map((product, index) => {
                    return (
                        <div key={product?.productId+index} className='flex gap-3 bg-slate-100'>                          
                          <img src={product?.image[0]}
                          className='w-28 h-28 bg-slate-200 object-scale-down p-2'/>
                          <div>
                          <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product?.name}</div>
                          <div className='flex items-center gap-5 mt-1'>
                          <div className='text-lg text-red-500'>{displayINRCurrency(product?.price)}</div>
                          <p>Quantity : {product?.quantity}</p>
                          </div>
                          </div>
                        </div>
                    )
                  })},
                </div>
                
                <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                <div>
                  <div className='text-lg font-medium'>Payment Details :</div>
                  <p className='ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
                  <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                </div>
                <div>
                  <div className='text-lg font-medium'>Shipping Details :</div>
                  {
                    item.shipping_options.map((shipping,index) => {
                      return (
                        <div key={shipping?.shipping_rate+index} className='ml-1'>
                          Shipping Amount : {shipping?.shipping_amount}
                        </div>
                      )
                    })
                  }
                </div>
                </div>
                </div>

                <div className='font-semibold ml-auto w-fit lg:text-lg'>
                  Total Amount : {displayINRCurrency(item?.totalAmount)}
                </div>

                <hr/>
                </div>
              
              </div>
            )            
          })
        }
      </div>
    </div>
  )
}

export default AllOrders