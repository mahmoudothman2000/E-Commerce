import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"



export default function Register() {
  let navigate = useNavigate();
  let [isLoading , setIsLoading] = useState(false)
  let [error , setError] = useState(null);


// & Call Api here :
  async function submitRegister(values){
    setIsLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((err)=>{
      setIsLoading(false)
      setError(err.response.data.message);
      console.log(err);
    });
    if(data.message === "success"){
      setIsLoading(false)
      navigate("/login");
    }
  }

// & Regular Expression Variables :
  const phoneRegex = /^\d{11}$/;
  const emailRegex = /^[A-Za-z0-9.]{5,}@gmail.com$/;
  const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;


// & Function validation No Submit Before Validation By Yup Library :
  let validationSchema = Yup.object({
    name:Yup.string().min(3, "Name is minlength 3").max(20,"Name is maxlength 10 ").required("Name is required"),
    email:Yup.string().matches(emailRegex , "Email is Not Valid").required("Email is required"),
    phone:Yup.string().matches(phoneRegex , "Phone is Not Valid").required("Phone is required"),
    password:Yup.string().matches(passwordRegex , "Password Start With UpperCase ").required("Password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")] , "Password is Not matching").required("Password is required")
  });


// &  Use Formik Library To Work Form And Input and validation :
  let formik = useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      rePassword:""
    }, validationSchema,
    onSubmit:submitRegister
  })

  return (
    <>

        <div className="mx-auto my-4 w-75" >

          {error? <p className="alert alert-danger">{error}</p> : ""}
          
          <h1>Register now</h1>

          <form action="" onSubmit={formik.handleSubmit }>
            <label htmlFor="name">Name : </label>
            <input className='form-control mb-3' type="text" id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' />
            {formik.errors.name  && formik.touched.name? <p className='alert alert-danger mt-1'>{formik.errors.name}</p> : "" }
            

            <label htmlFor="email">Email : </label>
            <input className='form-control mb-3' type="email" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' />
            {formik.errors.email  && formik.touched.email?<p className='alert alert-danger mt-1'>{formik.errors.email}</p> : "" }


            <label htmlFor="phone">Phone : </label>
            <input className='form-control mb-3' type="tel" id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' />
            {formik.errors.phone  && formik.touched.phone?<p className='alert alert-danger mt-1'>{formik.errors.phone}</p> : "" }


            <label htmlFor="password">Password : </label>
            <input className='form-control mb-3' type="password" id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' />
            {formik.errors.password  && formik.touched.password?<p className='alert alert-danger mt-1'>{formik.errors.password}</p> : "" }


            <label htmlFor="rePassword">rePassword : </label>
            <input className='form-control mb-3' type="password" id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' />
            {formik.errors.rePassword  && formik.touched.rePassword?<p className='alert alert-danger mt-1'>{formik.errors.rePassword}</p> : "" }


            {isLoading?<button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Submit</button>}
            
          </form>
        </div>

    </>
  )
}













// export default function Register() {

// & Call Api here :
//   function submitRegister(values){
//     console.log("Register");
//     console.log(formik);
//     console.log(values);
//     formik.handleReset();
//   }

// & Function validation No Submit Before Validation  :
//   function validate(values){

//     let errors = {};

// & Regular Expression Variables :
//     const phoneRegex = /^\d{11}$/;
//     const emailRegex = /^[A-Za-z0-9.]{5,}@gmail.com$/;
//     const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/;
//     // & Validate Name :
//     if(!values.name){
//       errors.name  ="Name is Required";
//     }else if (values.name.length < 3){
//       errors.name  ="Name is minlength 3 Char";
//     }else if (values.name.length > 10){
//       errors.name  ="Name is maxlength 10 Char";
//     }

//     // & Validate Phone :
//     if(!values.phone){
//       errors.phone  ="phone is Required";
//     }else if (!phoneRegex.test(values.phone)){
//       errors.phone  ="phone is Not Valid";
//     }

//     // & Validate Email :
//     if(!values.email){
//       errors.email  ="Email is Required";
//     }else if (!emailRegex.test(values.email)){
//       errors.email  ="Email is Not Valid";
//     }

//     // & Validate Password :
//     if(!values.password){
//       errors.password  ="Password is Required";
//     }else if (!passwordRegex.test(values.password)){
//       errors.password  ="Password is Not Valid";
//     }

//     // & Validate RePassword :
//     if(!values.rePassword){
//       errors.rePassword  ="Password is Required";
//     }else if (!(values.rePassword === values.password)){
//       errors.rePassword  ="Password is Not Equal";
//     }

//   return errors;
//   }

// & Use Formik Library To Work Form And Input and validation :
//   let formik = useFormik({
//     initialValues:{
//       name:"",
//       phone:"",
//       email:"",
//       password:"",
//       rePassword:""
//     }, validate ,
//     onSubmit:submitRegister
//   })

//   return (
//     <>
//       <div className="mx-auto my-4 w-75" >
//         <h1>Register now</h1>
//         <form action="" onSubmit={formik.handleSubmit }>
//           <label htmlFor="name">Name : </label>
//           <input className='form-control mb-3' type="text" id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' />
//           {formik.errors.name  && formik.touched.name? <p className='alert alert-danger mt-1'>{formik.errors.name}</p> : "" }
          

//           <label htmlFor="email">Email : </label>
//           <input className='form-control mb-3' type="email" id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name='email' />
//           {formik.errors.email  && formik.touched.email?<p className='alert alert-danger mt-1'>{formik.errors.email}</p> : "" }


//           <label htmlFor="phone">Phone : </label>
//           <input className='form-control mb-3' type="tel" id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} name='phone' />
//           {formik.errors.phone  && formik.touched.phone?<p className='alert alert-danger mt-1'>{formik.errors.phone}</p> : "" }


//           <label htmlFor="password">Password : </label>
//           <input className='form-control mb-3' type="password" id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name='password' />
//           {formik.errors.password  && formik.touched.password?<p className='alert alert-danger mt-1'>{formik.errors.password}</p> : "" }


//           <label htmlFor="rePassword">rePassword : </label>
//           <input className='form-control mb-3' type="password" id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' />
//           {formik.errors.rePassword  && formik.touched.rePassword?<p className='alert alert-danger mt-1'>{formik.errors.rePassword}</p> : "" }



//           <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Submit</button>
//         </form>
//       </div>
//     </>
//   )
// }
