import React, { useEffect } from 'react'
import { useContext } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { useState } from 'react';

export default function Wishlist() {

  let {getWishList , removeWishList} = useContext(WishlistContext);
  let[wishList , setWishList] = useState(null);
  let { setWishListCount} = useContext(WishlistContext);

  async function getWish(){
    let {data} = await getWishList();
    setWishList(data?.data)
    console.log(data);
    setWishListCount(data?.data.length)
  }


  async function removeWishListItem(id){
    let {data} = await removeWishList(id);
    getWish()
    localStorage.setItem("wishCount" , data?.data.length);
    setWishListCount(data?.data.length);
  }


  useEffect(() => {
    getWish()
  }, [])
  

  return (
    <>
      <div className="container">
        {wishList?.map((wish , index)=>
        <div className='row p-2 my-2 bg-info rounded-4' key={index}>
          <div className="col-md-2">
            <img src={wish.imageCover} className='w-100 rounded-4' height={200} alt="" />
            <img src={wish.brand?.image} className='w-100 rounded-4 mt-2' height={50} alt="" />
          </div>
          <div className="col-md-10">
            <h3>{wish.title.split(" ").slice(0,4).join(" ")}</h3>
            <h3>category : {wish.category?.name}</h3>
            <div className='d-flex justify-content-between'>
              <h5>price : {wish.price}</h5>
              <h5>quantity : {wish.quantity}</h5>
              <h5>ratingsAverage :  {wish.ratingsAverage} <i className="fa-solid fa-star me-2 rating-color"></i></h5>
              <h5>ratingsQuantity : {wish.ratingsQuantity}</h5>
            </div>
            <p className='text-center my-4'>Last Updated : {wish.updatedAt}</p>
            <button onClick={()=>{removeWishListItem(wish.id)}} className='btn btn-danger w-75 d-block mt-5 m-auto'><i className="fa-solid fa-trash-can me-2 "></i> Remove Wish List</button>
          </div>

        </div>)}
      </div>
    </>
  )
}
