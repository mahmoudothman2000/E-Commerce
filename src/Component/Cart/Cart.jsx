import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Cart() {

  let {getLoggedUserCart , removeCartItem , setNumItems , updateProductQuantity , emptyCary } = useContext(CartContext);

  const [cartProduct, setCartProduct] = useState(null);
  const [cartId, setCartId] = useState(null);

  async function getCart(){
    let {data} = await getLoggedUserCart();
    setCartId(data?.data._id);
    setCartProduct(data);
    setNumItems(data?.numOfCartItems);
  }

  async function removeItem(id){
    let {data} = await removeCartItem(id);
    setCartProduct(data);
    setNumItems(data?.numOfCartItems);
    localStorage.setItem("numCartItem" , data?.numOfCartItems)
  }

  async function updateProduct(id , count){
    let {data} = await updateProductQuantity(id , count);
    setCartProduct(data);
  }

  async function removeAllProduct(){
    let {data} = await emptyCary();
    if(data?.message === "success"){
      localStorage.removeItem("numCartItem");
      getCart()
      toast.success(data?.message,{
        className:"toastAlert",
        duration:2000 , 
        position:'top-center'});
    }else{
      toast.error(data?.message)
    }
  }

  useEffect(() => {
    getCart()
  }, [])
  

  return (
    <>

      {/* {cartProduct?
      <div className="container bg-main-light my-2 p-2 ">
        <h1>Shop Cart :</h1>
        <h2 className='h6  text-main'>Total Cart Items : {cartProduct?.numOfCartItems} items</h2>
        <h2 className='h6 mb-4 text-main'>Total Cart Price : {cartProduct?.data.totalCartPrice} EGP</h2>
          {cartProduct?.data.products.map((product , index)=>
            <div className="row border border-bottom border-white border-2 p-2" key={index}>

              <div className="col-md-1">
                <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
              </div>

              <div className="col-md-10">
                <h2 className='h6'>{product.product.title.split(" ").slice(0,3).join(" ")}</h2>
                <h3 className='text-main h5'>{product.price} EGP</h3>
                <button onClick={()=>{removeItem(product.product.id)}} className='btn p-0 m-0 text-danger font-sm  '><i className="fa-solid fa-trash-can me-2 "></i> Remove</button>
              </div>

              <div className="col-md-1 p-0">
                <button  onClick={()=>{updateProduct(product.product.id , product.count = 0 ? 0 : product.count + 1)}} className='btnUpdate font-sm'>+</button>
                <span className='spanUpdate'>{product.count}</span>
                <button  onClick={()=>{updateProduct(product.product.id , product.count = 0 ? 0 : product.count - 1)}} className='btnUpdate font-sm'>-</button>
              </div> 
            </div>
          )}
          <div className='d-flex justify-content-around my-3'>
            <Link to={`/address/${cartId}`} className='btn bg-main w-25 text-white'>Online Payment</Link>
            <button className='btn bg-main w-25 text-white'>Cash Payment</button>
          </div>
          <button onClick={()=>{removeAllProduct()}} className='btn bg-danger w-100 text-white my-2 '><i className="fa-solid fa-trash-can me-2 "></i> Empty Cart All Products</button>
      </div> 
      : <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <i className='spinnerHome fa fa-spinner fa-spin  text-success'></i>
        </div>
        } */}


      <div className="container bg-main-light my-2 p-2 ">
        <h1>Shop Cart :</h1>
        <h2 className='h6  text-main'>Total Cart Items : {cartProduct?.numOfCartItems } items</h2>
        <h2 className='h6 mb-4 text-main'>Total Cart Price : {cartProduct?.data.totalCartPrice} EGP</h2>
          {cartProduct?.data.products.map((product , index)=>
            <div className="row border border-bottom border-white border-2 p-2" key={index}>

              <div className="col-md-1">
                <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
              </div>

              <div className="col-md-10">
                <h2 className='h6'>{product.product.title.split(" ").slice(0,3).join(" ")}</h2>
                <h3 className='text-main h5'>{product.price} EGP</h3>
                <button onClick={()=>{removeItem(product.product.id)}} className='btn p-0 m-0 text-danger font-sm  '><i className="fa-solid fa-trash-can me-2 "></i> Remove</button>
              </div>

              <div className="col-md-1 p-0">
                <button  onClick={()=>{updateProduct(product.product.id , product.count + 1)}} className='btnUpdate font-sm'>+</button>
                <span className='spanUpdate'>{product.count}</span>
                <button  onClick={()=>{updateProduct(product.product.id ,  product.count - 1 < 1 ? 1 : product.count - 1)}} className='btnUpdate font-sm'>-</button>
              </div> 
            </div>
          )}
          <div className='d-flex justify-content-around my-3'>
            <Link to={`/address/${cartId}`} className='btn bg-main w-25 text-white'>Online Payment</Link>
            <Link to={`/cashPayment/${cartId}`} className='btn bg-main w-25 text-white'>Cash Payment</Link>
          </div>
          <button onClick={()=>{removeAllProduct()}} className='btn bg-danger w-100 text-white my-2 '><i className="fa-solid fa-trash-can me-2 "></i> Empty Cart All Products</button>
      </div> 





      <Helmet>
        <title>Cart</title>
      </Helmet>
    </>
  )
}

