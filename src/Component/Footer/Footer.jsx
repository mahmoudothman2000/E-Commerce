import React, { useContext } from 'react';
import img from "../../Assets/Image/freshcart-logo.svg"
import { CounterContext } from '../../Context/CounterContext';

export default function Footer() {
  let {counter} = useContext(CounterContext)
  return (
    <>
      {/* <h1>{counter}</h1> */}
      <div className='p-2 bg-light mt-5 py-3 ' id='footer'>

        <div className="container" style={{height:"150px"}}>
          <h4 className='mt-5'>GET THE FRESH CART APP</h4>
          <p className='text-light-dark'>we will send your alink, open it on your rhone to download the app</p>
            <div className="row">
              <div className="col-md-10">
                <input type="email " className='form-control' placeholder='Email...' />
              </div>
              <div className="col-md-2">
                <button className='btn bg-main form-control text-white '>Share App Link</button>
              </div>
            </div>
        </div>
        
        <hr />

        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center ">
              <h3 className='h5 me-4'>Payment Partners</h3>
              <img src={img} className='mx-1' width={50} alt="fresh cart logo" />
              <img src={img} className='mx-1' width={50} alt="fresh cart logo" />
              <img src={img} className='mx-1' width={50} alt="fresh cart logo" />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <h3 className='h5 me-4'>Payment Partners</h3>
              <img src={img} className='mx-1' width={60} alt="fresh cart logo" />
              <img src={img} className='mx-1' width={60} alt="fresh cart logo" />
              <img src={img} className='mx-1' width={60} alt="fresh cart logo" />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
