import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetCode() {
  let navigate = useNavigate();



    async function sendResetCode(values){
      return  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
      .then(function (response){
        if(response.data?.status === 'Success'){
          toast.success('Success Reset Code');
          navigate('/resetPassword')
          console.log(response);

        }
      })
      .catch(function (error){
        if(error.response?.data.statusMsg === 'fail'){
          toast.error('Reset code is invalid or has expired');
        }
      });
    }
  


  let formik = useFormik({
    initialValues:{
      resetCode:' '
    },
    onSubmit:sendResetCode
  })


  return (
    <>
      <div className="container w-75 mt-5 pt-5">
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="number" className='ms-2'>Enter Your Code</label>
          <input  type="text" onChange={formik.handleChange} name='resetCode' id='number' value={formik.resetCode} onBlur={formik.handleBlur} placeholder='Enter Your Code' className='form-control w-100 m-auto my-2' />
          <button type='submit' className='btn bg-main w-25 text-white my-4 '>Send Code</button>
        </form>
      </div>
    </>
  )
}




