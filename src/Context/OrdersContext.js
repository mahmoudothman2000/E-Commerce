import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { createContext } from "react";


export let OrdersContext = createContext();

export default function OrdersContextProvider(props) {

  let[paymentInfo , setPaymentInfo] = useState(null);

  function getUserOrders(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)
    .then((response)=>response)
    .catch((error=>error))
  }

  return (    <OrdersContext.Provider value={{getUserOrders , paymentInfo , setPaymentInfo}}>
                    {props.children}
              </OrdersContext.Provider>
    
  )
}
