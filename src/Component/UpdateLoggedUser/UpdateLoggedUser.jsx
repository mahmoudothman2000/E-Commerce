import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UpdateLoggedUser() {
  let navigate = useNavigate();

  let header = {
    token:localStorage.getItem('userToken')
  }




async function updateLoggedUser(values){
  console.log(values);
  return await getData(values);
}

  async function getData(values){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,values,{headers:header})
    .then(function (response){
      if(response.data.message  === "success"){
        toast.success(`${response.data.user.name}
                      ${response.data.user.email}`)
        // console.log(response.data.message);
      }
    })
    .catch(function (error){
      if(error.response.data.message === 'fail'){
        toast.error(` ${error.response.data.errors.msg} 
                      ${error.response.data.errors.value}`);
        // console.log(error.response.data.errors.msg);
      }
    });
  }





  let formik = useFormik({
    initialValues:{
      name: '',
      email: '',
      phone: ''
    },
    onSubmit:updateLoggedUser
  })
  return (
    <>
      <div className="container w-75 mt-5 pt-5">
        <form action="" onSubmit={formik.handleSubmit}>


          <label htmlFor="name" className='ms-2 mt-4'>Enter Your User Name</label>
          <input  type="text" onChange={formik.handleChange} name='name' id='name' value={formik.name} onBlur={formik.handleBlur} placeholder='Enter Your  User Name' className='form-control w-100 m-auto my-2' />


          <label htmlFor="email" className='ms-2 mt-4'>Enter Your Email</label>
          <input  type="text" onChange={formik.handleChange} name='email' id='email' value={formik.email} onBlur={formik.handleBlur} placeholder='Enter Your Email' className='form-control w-100 m-auto my-2' />


          <label htmlFor="phone" className='ms-2 mt-4'>Enter Your Phone</label>
          <input  type="text" onChange={formik.handleChange} name='phone' id='phone' value={formik.phone} onBlur={formik.handleBlur} placeholder='Enter Your Phone' className='form-control w-100 m-auto my-2' />
          
          
          <button type='submit' className='btn bg-main w-25 text-white my-4 '>Send Email</button>
        </form>
      </div>
    </>
  )
}
