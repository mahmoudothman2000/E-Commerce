import axios from 'axios';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  
  let{addToCart , setNumItems}= useContext(CartContext);
  let params = useParams();

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
  
  
  
  var settings = {
    dots: false,
    infinite: true,
    autoplay:true ,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  
  // const [productData, setProductData] = useState(null)
  // async function getProductDetails (id){
  //   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  //   setProductData(data?.data)
  // }
  
  // console.log(productData);

  // useEffect(()=>{
  //   getProductDetails(params.id)
  // },[])



  function getProductDetails (id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let {data , isLoading , isError , isFetching , refetch } = useQuery("productDetails" , ()=>getProductDetails(params.id));


  return (
    <>
    {/* <div className="container">
        <div className="row align-items-center my-3 ">
          <div className="col-md-3">
            <div className="item">
              <img src={productData?.imageCover} className='w-100' alt="" />
            </div>
          </div>


          <div className="col-md-9">
            <div className="item">
              <h3 className='h4 my-2'>{productData?.title}</h3>
              <p className='my-4 mx-2 h6 text-light-dark '>{productData?.description}</p>
              <p className='my-1'>{productData?.category.name}</p>
              <div className='d-flex justify-content-between'>
                <span className='fs-5 text-main'>{productData?.price} EGP</span>
                <span><i className="fa-solid fa-star me-2 rating-color"></i>4.8</span>
              </div>
              <button className='btn bg-main text-center w-100 text-white btn-sm mt-2 '>+ Add Product</button>
            </div>
          </div>
        </div>
      </div>  */}



    <div className="container">
        <div className="row align-items-center my-3 ">
          <div className="col-md-4">
            <div className="item">
              <Slider {...settings}>
                {data?.data.data.images.map((image)=><div key={data?.data.data._id}><img  className='w-100' src={image} alt={data?.data.data.title} /></div>)}
              </Slider>
            </div>
          </div>


          <div className="col-md-8">
            <div className="item">
              <h3 className='h4 my-2'>{data?.data.data.title}</h3>
              <p className='my-4 mx-2 h6 text-light-dark '>{data?.data.data.description}</p>
              <p className='my-1'>{data?.data.data.category.name}</p>
              <div className='d-flex justify-content-between'>
                <span className='fs-5 text-main'>{data?.data.data.price} EGP</span>
                <span><i className="fa-solid fa-star me-2 rating-color"></i>4.8</span>
              </div>
              <button onClick={()=>{addProductToCart(data?.data.data._id)}} className='btn bg-main text-center w-100 text-white btn-sm mt-2 '>+ Add Product</button>
            </div>
          </div>
        </div>
      </div> 

    </>
  )
}
