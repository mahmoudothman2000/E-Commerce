import axios from 'axios';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext';




export default function Login() {
  let navigate = useNavigate();
  let [isLoading , setIsLoading] = useState(false)
  let [error , setError] = useState(null);
  let {setUserToken , setUserName  ,  setUserEmail}= useContext(UserContext);
    
// & Call Api here :
  async function submitLogin(values){
    setIsLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err)=>{
      setIsLoading(false)
      setError(err.response.data.message);
      console.log(err);
    });
    if(data.message === "success"){
      setIsLoading(false)
      localStorage.setItem("userToken" , data.token);
      localStorage.setItem("userName" , data.user.name);
      localStorage.setItem("userEmail" , data.user.email);
  
      setUserToken(data.token);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
      navigate("/");
    }
  }

// & Regular Expression Variables :
  const emailRegex = /^[A-Za-z0-9.]{5,}@gmail.com$/;
  const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;


// & Function validation No Submit Before Validation By Yup Library :
  let validationSchema = Yup.object({
    email:Yup.string().matches(emailRegex , "Email is Not Valid").required("Email is required"),
    password:Yup.string().matches(passwordRegex , "Password Start With UpperCase ").required("Password is required"),
  });


// &  Use Formik Library To Work Form And Input and validation :
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    }, validationSchema,
    onSubmit:submitLogin
  })

  return (
    <>
        <div className="mx-auto my-4 w-75" >

          {error? <p className="alert alert-danger">{error}</p> : ""}
          
          <h1>Login now</h1>

          <form action="" onSubmit={formik.handleSubmit }>

            <label htmlFor="email">Email : </label>
            <input className='form-control mb-3' type="email" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' />
            {formik.errors.email  && formik.touched.email?<p className='alert alert-danger mt-1'>{formik.errors.email}</p> : "" }


            <label htmlFor="password">Password : </label>
            <input className='form-control mb-3' type="password" id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' />
            {formik.errors.password  && formik.touched.password?<p className='alert alert-danger mt-1'>{formik.errors.password}</p> : "" }


            {isLoading?
              <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> 
              : <>
              <div className='d-flex align-items-center'>
                  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mx-4'>Login</button>
                  <Link to={'/register'} className='btn  text-danger'>Register Now</Link>
                  <Link to={'/forgetPasswords'} className='btn  text-success'>forgetPasswords</Link>
                </div>
              </>
            }
            
          </form>
        </div>


    </>
  )
}