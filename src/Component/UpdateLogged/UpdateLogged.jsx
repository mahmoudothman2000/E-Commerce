import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function UpdateLogged() {
  let navigate = useNavigate();

  let header = {
    token:localStorage.getItem('userToken')
  }




async function resetPassword(values){
  console.log(values);
  return await getData(values);
}

  async function getData(values){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values,{headers:header})
    .then(function (response){
      if(response.data.message === "success"){
        toast.success(response.data.message);
        navigate('/login')
        
      }
    })
    .catch(function (error){
      if(error.response.data.statusMsg === 'fail'){
        toast.error(error.response.data.message);
      }
    });
  }





  let formik = useFormik({
    initialValues:{
      currentPassword:'',
      password:'',
      rePassword:''
    },
    onSubmit:resetPassword
  })
  return (
    <>
      <div className="container w-75 mt-5 pt-5">
        <form action="" onSubmit={formik.handleSubmit}>


          <label htmlFor="currentPassword" className='ms-2 mt-4'>Enter Your Current Password</label>
          <input  type="text" onChange={formik.handleChange} name='currentPassword' id='currentPassword' value={formik.currentPassword} onBlur={formik.handleBlur} placeholder='Enter Your Current Password' className='form-control w-100 m-auto my-2' />


          <label htmlFor="password" className='ms-2 mt-4'>Enter Your Password</label>
          <input  type="text" onChange={formik.handleChange} name='password' id='password' value={formik.password} onBlur={formik.handleBlur} placeholder='Enter Your Password' className='form-control w-100 m-auto my-2' />


          <label htmlFor="rePassword" className='ms-2 mt-4'>Enter Your RePassword</label>
          <input  type="text" onChange={formik.handleChange} name='rePassword' id='rePassword' value={formik.rePassword} onBlur={formik.handleBlur} placeholder='Enter Your RePassword' className='form-control w-100 m-auto my-2' />
          
          
          <button type='submit' className='btn bg-main w-25 text-white my-4 '>Send Email</button>
        </form>
      </div>
    </>
  )
}