
import './App.css';
import Home from './Component/Home/Home';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Component/Layout';
import Cart from './Component/Cart/Cart';
import Brands from './Component/Brands/Brands';
import Products from './Component/Products/Products';
import Notfound from './Component/Notfound';
import Categories from './Component/Categories/Categories';
import CounterContextProvider from './Context/CounterContext';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { CartContext } from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import Profile from './Component/Profile/Profile';
import BrandDetails from './Component/BrandDetails/BrandDetails';
import Address from './Component/Address/Address';
import Orders from './Component/Orders/Orders';
import OrderDetails from './Component/OrderDetails/OrderDetails';
import Wishlist from './Component/Wishlist/Wishlist';
import { WishlistContext } from './Context/WishlistContext';
import CategoryDetails from './Component/CategoryDetails/CategoryDetails';
import ForgetPasswords from './Component/ForgetPasswords/ForgetPasswords';
import ResetCode from './Component/ResetCode/ResetCode';
import UpdateLogged from './Component/UpdateLogged/UpdateLogged';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import UpdateLoggedUser from './Component/UpdateLoggedUser/UpdateLoggedUser';
import CashPayment from './Component/CashPayment/CashPayment';
import PaymentDetails from './Component/PaymentDetails/PaymentDetails';





// let routers = createHashRouter([


let routers = createBrowserRouter([
  {path: '/' , element: <Layout></Layout>,children:[
    {index:true ,element:<ProtectedRoute> <Home/> </ProtectedRoute> },
    {path:'cart' ,element:<ProtectedRoute> <Cart/> </ProtectedRoute> },
    {path:'brands' ,element:<ProtectedRoute> <Brands/> </ProtectedRoute> },
    {path:'products' ,element:<ProtectedRoute> <Products/> </ProtectedRoute> },
    {path:'categories' ,element:<ProtectedRoute> <Categories/> </ProtectedRoute> },
    {path:'profile' ,element:<ProtectedRoute> <Profile/> </ProtectedRoute> },
    {path:'allOrders' ,element:<ProtectedRoute> <Orders/> </ProtectedRoute> },
    {path:'orderDetails' ,element:<ProtectedRoute> <OrderDetails/> </ProtectedRoute> },
    {path:'paymentDetails' ,element:<ProtectedRoute> <PaymentDetails/> </ProtectedRoute> },
    {path:'cashPayment/:id' ,element:<ProtectedRoute> <CashPayment/> </ProtectedRoute> },
    {path:'updateLoggedUser' ,element:<ProtectedRoute> <UpdateLoggedUser/> </ProtectedRoute> },
    {path:'resetCode' ,element: <ResetCode/>  },
    {path:'resetPassword' ,element: <ResetPassword/>  },
    {path:'updateLogged' ,element: <UpdateLogged/>  },
    {path:'ForgetPasswords' ,element: <ForgetPasswords/>  },
    {path:'categoryDetails/:id' ,element:<ProtectedRoute> <CategoryDetails/> </ProtectedRoute> },
    {path:'wishlist' ,element:<ProtectedRoute> <Wishlist/> </ProtectedRoute> },
    {path:'brandDetails/:id' ,element:<ProtectedRoute> <BrandDetails/> </ProtectedRoute> },
    {path:'address/:cartId' ,element:<ProtectedRoute> <Address/> </ProtectedRoute> },
    {path:'productDetails/:id' ,element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute> },
    {path:'register' ,element: <Register/>},
    {path:'login' ,element: <Login/>},
    {path:'*' , element: <Notfound/>}

  ]}
])



export default function App() {

  let {setUserToken , setUserName , setUserEmail}= useContext(UserContext);
  let {setNumItems} = useContext(CartContext)
  let {setWishListCount} = useContext(WishlistContext)


  useEffect(()=>{
      if(localStorage.getItem("userToken") !== null){
        setUserToken(localStorage.getItem("userToken"));
      }

      if(localStorage.getItem("numCartItem") !== null){
        setNumItems(localStorage.getItem("numCartItem"));
      }

      if(localStorage.getItem("wishCount") !== null){
        setWishListCount(localStorage.getItem("wishCount"));
      }


      if(localStorage.getItem("userName") !== null){
        setUserName(localStorage.getItem("userName"));
      }

      if(localStorage.getItem("userEmail") !== null){
        setUserEmail(localStorage.getItem("userEmail"));
      }

  } , [])

  return    <CounterContextProvider>
              <RouterProvider router={routers}></RouterProvider>;
              <Toaster/>
            </CounterContextProvider>





}

// export default App;
