import React from 'react'
import { useContext } from 'react';
import { OrdersContext } from '../../Context/OrdersContext';
import { useState } from 'react';
import { useEffect } from 'react';

export default function OrderDetails() {

  let { getUserOrders } = useContext(OrdersContext);
  let[orders , setOrders] = useState(null);

  async function getOrders(){
    let {data} = await getUserOrders();
    setOrders(data);
    console.log(data);
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
    <div className="container">
      {orders?.map((order)=>
      <div className='row' key={order.id}>
        {order.cartItems.map((item)=>
            <div key={item._id} className='text-center bg-info py-4 my-2  rounded-5'>
              <h3 className='text-danger'>Order Of Date : {order.createdAt}</h3>
              <h2 className='fw-bold'>{item.product.title.split(" ").slice(0,4).join(" ")}</h2>
              <h4> Product Count : {item.count}</h4>
              <h4> Product Price : {item.price}</h4>
              <h4> Product brand : {item.product.brand.name}</h4>
              <h4> Product category : {item.product.category.name}</h4>
              <div className='d-flex justify-content-around mt-4'>
                <img src={item.product.brand.image} height={300} className='w-25 rounded-5' alt={item.product.title} />
                <img src={item.product.imageCover} height={300} className='w-25 rounded-5' alt={item.product.title} />
              </div>
            </div>
        )}
      </div>)}
    </div>
    
    </>
  )
}
