import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';

export default function ResetPassword() {

  let navigate = useNavigate();
  let {setUserToken}= useContext(UserContext);


async function resetPassword(values){
  return await getData(values);
}

  async function getData(values){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    .then(function (response){
      if(response.statusText === "OK"){
        // console.log('success Token');
        toast.success('Reset Password successfully')
        localStorage.setItem("userToken" , response.data?.token );
        navigate('/login')
      }
    })
    .catch(function (error){
      if(error.response?.data.statusMsg === 'fail'){
          toast.error(error.response?.data.message);
      }
    });
  }





  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    onSubmit:resetPassword
  })
  return (
    <>
      <div className="container w-75 mt-5 pt-5">
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className='ms-2'>Enter Your Email</label>
          <input  type="email" onChange={formik.handleChange} name='email' id='email' value={formik.email} onBlur={formik.handleBlur} placeholder='Enter Your Email' className='form-control w-100 m-auto mb-2' />
          
          
          
          <label htmlFor="newPassword" className='ms-2 mt-4'>Enter Your New Password</label>
          <input  type="text" onChange={formik.handleChange} name='newPassword' id='newPassword' value={formik.email} onBlur={formik.handleBlur} placeholder='Enter Your New Password' className='form-control w-100 m-auto mb-2' />
          
          <button type='submit' onClick={resetPassword} className='btn bg-main w-25 text-white my-4 '>Send Email</button>
        </form>
      </div>
    </>
  )
}
