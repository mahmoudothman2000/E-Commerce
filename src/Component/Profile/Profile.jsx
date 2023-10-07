import jwtDecode from 'jwt-decode';
import React from 'react'
import { Link } from 'react-router-dom';
import logoProfile from "../../Assets/Image/avataaars.svg"
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  let {userName  , userEmail }= useContext(UserContext);

  // let enCodedToken = localStorage.getItem('userToken');
  // let deCodedToken = jwtDecode(enCodedToken);
  return (
    <>

      <div className="container">
        <div className="image w-25 m-auto">
          <img src={logoProfile} alt="logo-Profile" className='imageProfile w-100' />
        </div>
      </div>

      <div className=" text-center my-2">
        <p className='h2'>Welcome...</p>
        <h1 className='fw-bold text-main'>{userName}</h1>
        <h4>{userEmail}</h4>
      </div>


      {/* <div className=" text-center my-2">
        <p className='h2'>Welcome...</p>
        <h1>{deCodedToken.name}</h1>
        <h2>{deCodedToken.email}</h2>
      </div> */}

      <div className="w-75 m-auto d-flex justify-content-between mt-4">
        <Link to={'/updateLogged'} className='btn btn-success w-50 mx-2 hidePrint' >Reset Password</Link>
        <Link to={'/updateLoggedUser'} className='btn btn-success w-50 mx-2 hidePrint' >update Logged User</Link>
      </div>

      <div className='container w-75 m-auto my-4'>
        <button onClick={()=>{window.print()}} className='btn hidePrint btn-danger w-100'>Print Page profile</button>
      </div>
    
    </>
  )
}
