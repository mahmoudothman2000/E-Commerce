import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPasswords() {

  let navigate = useNavigate();


async function sendEmail(values){
  console.log(values);
  return await getData(values);
}

  async function getData(values){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    .then(function (response){
      if(response.data?.statusMsg === 'success'){
        toast.success(response?.data?.message)
        console.log(response);
        navigate('/resetCode')
      }
    })
    .catch(function (error){
      if(error.response?.data.statusMsg === 'fail'){
        toast.error(error?.response?.data.message)
        // console.log(  "error===> "+  error);
      }
    });
  }





  let formik = useFormik({
    initialValues:{
      email:''
    },
    onSubmit:sendEmail
  })
  return (
    <>
    {/* {response? alert(response)  : ''} */}
    {/* {error? alert(error)  : ''} */}

    
    
      <div className="container w-75 mt-5 pt-5">
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className='ms-2'>Enter Your Email</label>
          <input  type="email" onChange={formik.handleChange} name='email' id='email' value={formik.email} onBlur={formik.handleBlur} placeholder='Enter Your Email' className='form-control w-100 m-auto my-2' />
          <button type='submit' onClick={sendEmail} className='btn bg-main w-25 text-white my-4 '>Send Email</button>
        </form>
      </div>
    </>
  )
}
