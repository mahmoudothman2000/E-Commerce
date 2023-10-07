import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../Assets/Image/freshcart-logo.svg"
import logoProfile from "../../Assets/Image/avataaars.svg"
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';


export default function Navbar() {

  let navigate = useNavigate();

  let {userToken , setUserToken , userName} = useContext(UserContext);
  let {numItems} = useContext(CartContext);
  let {wishListCount } = useContext(WishlistContext);

  function LogOut(){
    localStorage.removeItem('userToken');
    // localStorage.clear();
    setUserToken( null );
    navigate('/login')
    
  }

  return (

  <nav  className="navbar navbar-expand-lg  bg-light  " id='navbarMain' >
    <div className="container-fluid">
    <Link className="navbar-brand "  to="">
      <img src={logo} alt="fresh cart logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">


    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      {userToken !== null? <>
            <li className="nav-item">
              <NavLink className="nav-link  " aria-current="page" to="/" >HOME</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/cart">Carts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/profile">Profile</NavLink>
            </li>
        </> : ''  }
    </ul>

    
    <ul className="navbar-nav ">

      <li className="nav-item ms-auto  d-flex align-items-center">
        {userToken !== null?<Link to={'/profile'}><div className='d-flex align-items-center mx-2'> <img src={logoProfile} className='logoProfile' alt="logo-Profile" /> <span className='userNameSpan text-main'>{userName.split(" ").slice(0,2).join(" ")}</span></div></Link> : ''}
        <i className="fa-brands  fa-facebook me-3"></i>
        <i className="fa-brands  fa-twitter me-3"></i>
        <i className="fa-brands  fa-telegram me-3"></i>
        <i className="fa-brands  fa-Youtube"></i>
        <i className="fa-brands  fa-instagram me-3"></i>
        <div className="iconCart">
          <Link to="/cart"><i className="fa-solid fa-cart-shopping text-main "></i></Link>
          {numItems?<span className='bg-main'>{numItems}</span> : ''}
        </div>
        <div className="iconCart me-3">
          <Link to="/wishlist"><i className="fa-solid heartNavbar fa-heart text-main "></i></Link>
          {wishListCount? <span className='bg-main'>{wishListCount}</span> : ''}
        </div>
      </li>   


      {userToken !== null ? <>
      
        <li className="nav-item">
          <span onClick={()=>{LogOut()}} className="btn btn-danger ">LogOut</span>
        </li>
      </> 
      : <> 
        <li className="nav-item">
          <NavLink className="nav-link " to="/login">login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " to="/register">Register</NavLink>
        </li>
      </>}
    </ul>


    </div>
    </div>
  </nav> 

)
}
