import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';


export default function Address() {

  let {cartId} = useParams();

  let {onlinePayment} =useContext (CartContext);


  async function handleAddressSubmit ( values){
    let response = await onlinePayment( cartId ,  values);

    window.location.href = response?.data.session.url ;

    // console.log(values);
    console.log(response);
    console.log(response.data.session.url);
    // console.log("6516f69ed04c2e081aa9f50d");
    // console.log("good");
    // console.log('dinamic ==> '+cartId);
  }

  let formik = useFormik({
    initialValues:{
      details: '',
      phone:'',
      city:''
    },
    onSubmit: handleAddressSubmit
  })


  return (
    <>
    <div className="container mt-5">
      <form action="" onSubmit={formik.handleSubmit}>
        
        <label htmlFor="details">Details</label>
        <input type="text" className='form-control mb-4' name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <label htmlFor="phone">Phone</label>
        <input type="tel" className='form-control mb-4' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <label htmlFor="city">City</label>
        <input type="text" className='form-control mb-4' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />

        <button className='btn bg-main text-white' type='submit'>Payment Now</button>

      </form>
    </div>


    
    </>
  )
}
