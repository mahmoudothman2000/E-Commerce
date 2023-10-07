import React from 'react'
import { useContext } from 'react'
import { OrdersContext } from '../../Context/OrdersContext'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {

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
        <Link to={`/OrderDetails`} className='btn btn-warning w-75 d-block m-auto my-4'>Details Order</Link>
        {orders?.map((order)=>
        <div className='row bg-info my-1 text-center p-2' key={order.id}>
          <h2>user name : {order.user?.name}</h2>
          <div className='d-flex justify-content-around'>
            <span className='fs-4'>User Email : {order.user?.email}</span>
            <span className='fs-4'>User of Number : {order.id}</span>
          </div>
          <h2>Payment Method Type : {order.paymentMethodType}</h2>
          <h2>City : {order.shippingAddress?.city}</h2>
          <span className='fs-3 btn btn-danger w-50 m-auto mb-2'>Total Order Price : {order.totalOrderPrice}</span>

        </div>
        )}

      </>
  )
}
