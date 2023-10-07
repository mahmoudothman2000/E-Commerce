import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';



export default function Products() {
  
  let[search , setSearch] = useState(null)
  let {addToCart , setNumItems}= useContext(CartContext);
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

  function getAllProduct(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let{data , isError , isLoading } = useQuery("allProduct" , getAllProduct , {
        cacheTime: 3000 ,
    // refetchOnMount:true , 
    // staleTime: 4000 , 
    // refetchInterval: 2000 , 
    enabled: true
  })


  function searchInput(e){
    setSearch(e.target.value);
    // console.log(e.target.value);
  }

  return (
    <>

    {/* <div className="container mt-5 ">
      <h1 className='display-2 text-center text-main'>products</h1>
      <div className="row g-4">
        {data?.data.data.slice(0,20).map((product , index)=>
        <div className="col-md-4" key={index}>
          <div className="itemsProduct">
            <img src={product.imageCover} className='w-100 h-100' alt={product.title} />
            <h2 className='text-center h5'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
          </div>
        </div>
        )}
      </div>
    </div> */}



{isLoading? <div className="d-flex justify-content-center align-items-center w-100 vh-100"><i className='spinnerHome fa fa-spinner fa-spin  text-success'></i></div>
        :<div className="container  ">
      <h1 className='text-main text-center my-5 fw-bold display-1'>Products</h1>
          <input type="search" onChange={(e)=>{searchInput(e)}}  className='form-control w-75 m-auto my-5' placeholder='Search By Product Name' name="" id="" />
          <div className="row">
              {data?.data.data.filter((item)=>item.title.includes(search)).map((product)=>
                  <div className="col-md-3" key={product.id}>
                      <div className="productInfo p-2 pt-5 position-relative rounded-2 text-center">
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
        </div>  
        }


      <Helmet>
        <title>Products</title>
      </Helmet>
    </>
  )
}
