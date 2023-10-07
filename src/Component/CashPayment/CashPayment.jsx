import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { OrdersContext } from '../../Context/OrdersContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export default function CashPayment() {
  let navigate = useNavigate();
  let {setPaymentInfo} = useContext(OrdersContext);
  let {setNumItems} = useContext(CartContext);


  let header = {
    token:localStorage.getItem("userToken")
  }

  let {id} = useParams(); 

  async function payment (values){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}` , {shippingAddress:values} ,{headers:header})
    .then(function(response){
      if(response.data.status === 'success'){
        setPaymentInfo(response)
        toast.success(response.data.status);
        localStorage.removeItem("numCartItem");
        setNumItems(null)
        navigate('/paymentDetails')
      }
    })
    .catch(function(error){
      if(error.response.data.statusMsg === 'fail'){
        toast.error(error.response.data.statusMsg)
        // console.log(error.response.data.message);
        // console.log(error.response.data.statusMsg);
      }
    })
  }



  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:payment
  })




  return (
    <>
      <div className="container mt-5">
        <h1 className='mb-4'>Cash Payment :</h1>
        <form onSubmit={formik.handleSubmit} action="">



          <label htmlFor="details">Enter Your Details</label>
          <input type="text" name="details" id="details" className='form-control mb-4' placeholder='Enter Your Details' value={formik.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />



          <label htmlFor="phone">Enter Your Phone</label>
          <input type="text" name="phone" id="phone" className='form-control mb-4' placeholder='Enter Your Phone' value={formik.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />



          <label htmlFor="city">Enter Your City</label>
          <input type="text" name="city" id="city" className='form-control mb-4' placeholder='Enter Your City' value={formik.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />

          <button type='submit' className='btn bg-main w-25 text-white'>Cash Payment</button>
        </form>
      </div>
    </>
  )
}


