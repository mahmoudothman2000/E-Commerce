import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
// import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';



export default function FeaturedProducts() {


  let{addToCart , setNumItems}= useContext(CartContext);
  let { addWishList , setWishListCount } = useContext(WishlistContext);


  async function addProductToCart(id){
    let {data} = await addToCart(id);
    if(data?.status === "success"){
      setNumItems(data?.numOfCartItems);
      localStorage.setItem("numCartItem" , data?.numOfCartItems);
      toast.success(data?.message,{
        className:"toastAlert",
        duration:2000 , 
        position:'top-center'});
    }else{
      toast.error("Fail");
    }
  }

  async function addWishListItem (e , id){
    e.target.classList.replace("fa-regular" , "fa-solid");
    let {data} = await  addWishList(id);
    if(data?.message){
      localStorage.setItem("wishCount" , data?.data.length);
      setWishListCount(data?.data.length);
      toast.success(data?.message);
    }else{toast.error(data?.message)}
  }

  function getFeaturedProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let {data , isError  , isLoading , isFetching , refetch} = useQuery("featuredProducts" , getFeaturedProducts , {
    cacheTime: 3000 ,
    // refetchOnMount:true , 
    // staleTime: 4000 , 
    refetchInterval: 2000 , 
    enabled: true
  })


  return (
      <>

        {isLoading? <div className="d-flex justify-content-center align-items-center w-100 vh-100"><i className='spinnerHome fa fa-spinner fa-spin  text-success'></i></div>
        :<div className="container">
          {/* <button onClick={()=>{refetch()}} className='btn text-white  bg-main w-100 fs-4 mb-4'>Get Products</button> */}
          <div className="row">
              {data?.data.data.map((product)=>
                  <div className="col-md-2 " key={product.id}>
                      <div className="product p-2 pt-5 position-relative">
                        <i onClick={(e , id)=>{addWishListItem(e , product.id) }}  id='heart' className="fa-regular fa-heart heartProduct cursor-pointer rating-color"></i>
                        <Link to={`/productDetails/${product.id}`}>
                            <img className='w-100' src={product.imageCover} alt="product.title" />
                            <span className='h6 text-main'>{product.category.name}</span>
                            <h3 className='h6 fw-bold my-2'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                            <div className='d-flex justify-content-between'>
                              <span className='fw-bold'>{product.price} EGP</span>
                              <span><i className="fa-solid fa-star me-2 rating-color"></i>{product.ratingsAverage}</span>
                            </div>
                        </Link>
                        <button onClick={()=>{addProductToCart(product.id)}} className='btn bg-main text-white w-100 mt-4  btn-sm '>Add to cart</button>
                      </div>
                  </div>
              )}
          </div>
          <div className='container w-75 m-auto my-5'>
            <button onClick={()=>{window.print()}} className='btn btn-danger w-100'>Print Page profile</button>
          </div>
        </div>  
        }
      </>
  )


















  // let [products , setProducts] = useState([])

  // async function getFeaturedProducts(){
  //   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //   setProducts(data.data)
  //   console.log(data.data[0]._id);
  // }

  // useEffect(()=>{
  //   getFeaturedProducts()
  // },[])

  // return (
  //     <>

  //       <div className="container">
  //         <div className="row">
  //             {products.map((product)=>
  //               <div className="col-md-2" key={product.id}>
  //                 <div className="product p-2 m-2">
  //                   <img className='w-100' src={product.imageCover} alt="product.title" />
  //                   <span className='h6 text-main'>{product.category.name}</span>
  //                   <h3 className='h6 fw-bold my-2'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
  //                   <div className='d-flex justify-content-between'>
  //                     <span className='fw-bold'>{product.price} EGP</span>
  //                     <span><i class="fa-solid fa-star text-main"></i></span>
  //                   </div>
  //                   <button className='btn bg-main text-white w-100 mt-4  btn-sm '>Add to cart</button>
  //                 </div>
  //               </div>
  //             )}
  //         </div>
  //       </div>
  //     </>
  // )
}

