import axios from "axios";
import { useState } from "react";
import { createContext } from "react";


export let WishlistContext = createContext();


export default function WishlistContextProvider(props) {

  let header = {
    token:localStorage.getItem("userToken")
  }

  const [wishListCount  , setWishListCount ] = useState(0);
  const [activeWishList , setActiveWishList] = useState(null);

  function getWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers:header})
    .then((response)=>response)
    .catch((error)=>error)
  }

  function addWishList(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{productId:productId}, {headers:header})
    .then((response)=>response)
    .catch((error)=>error)
  }


  function removeWishList(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {headers:header})
    .then((response)=>response)
    .catch((error)=>error)
  }

  return (<WishlistContext.Provider value={{getWishList , addWishList , removeWishList , wishListCount , setWishListCount , activeWishList, setActiveWishList}}>
            {props.children}
        </WishlistContext.Provider>
    
  )
}
