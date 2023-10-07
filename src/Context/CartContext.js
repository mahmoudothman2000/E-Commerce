import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export function CartContextProvider(props){

  // let [addCart , setAddCart] = useState(null);
  let header = {
    token:localStorage.getItem("userToken"),
  };


  //^ Function Add to Cart :
  function addToCart (productId){
    // axios.post("url" , {body} , { header});
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{productId:productId},{headers:header})
    .then((response)=>response)
    .catch((error)=>error);
  }

    //^ Function Product Show in the  Cart :
    function getLoggedUserCart (){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{headers:header})
      .then((response)=>response)
      .catch((error)=>error);
    }

    //^Number Of Cart Items :
    const [numItems, setNumItems] = useState(null)


    //^ Function Delete Product in the  Cart :
    function removeCartItem (id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{headers:header})
      .then((response)=>response)
      .catch((error)=>error);
    }


    //^ Function Update Product in the  Cart :
    function updateProductQuantity (id , count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` ,{count:count},{headers:header})
      .then((response)=>response)
      .catch((error)=>error);
    }


    //^ Function Payment to  Cart :
    function onlinePayment (cartId ,  values){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,{shippingAddress:values},{headers:header})
      .then((response)=>response)
      .catch((error)=>error);
    }


    //^ Function Empty Cary From All Products  :
    function emptyCary (){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{headers:header})
      .then((response)=>response)
      .catch((error)=>error);
    }

  return <CartContext.Provider value={{addToCart , getLoggedUserCart , removeCartItem  , setNumItems , updateProductQuantity , numItems , onlinePayment , emptyCary }}>
            {props.children}
          </CartContext.Provider>
}