import React from 'react'
import { useContext } from 'react';
import { OrdersContext } from '../../Context/OrdersContext';
import delivery from '../../Assets/Image/delivery.jpg'

export default function PaymentDetails() {

  let {paymentInfo} = useContext(OrdersContext);

  return (
    <>
    
      <div className="container-fluid mt-1 position-relative">
        <button className='btn btnPrintOrder bg-main' onClick={()=>{window.print()}}>Print the Receipt <i className="fa-solid fa-print mx-2"></i></button>

        <div className="row orderRow">
          <div className=" text-center">
          <h1 className=' fw-bold text-main'>Delivery Information</h1>

            <div className="cashItem">
              <h2 className='fw-bold'>Payment status </h2>
              <h4>{paymentInfo?.data.status}</h4>
            </div>

            <div className="cashItem">
              <h2 className='fw-bold'>payment method</h2>
              <h4>{paymentInfo?.data.data.paymentMethodType}</h4>
            </div>

            <div className="cashItem">
              <h2 className='fw-bold'>Number of Products in the Cart </h2>
              <h4>{paymentInfo?.data.data.cartItems.length}</h4>
            </div>

            <div className="cashItem">
              <h2 className='fw-bold'>Total Order Price </h2>
              <h4>{paymentInfo?.data.data.totalOrderPrice}</h4>
            </div>



            <div className="cashItem">
              <h2 className='fw-bold'>City of Residence </h2>
              <h4>{paymentInfo?.data.data.shippingAddress.city}</h4>
            </div>

            <div className="cashItem">
              <h2 className='fw-bold'>The User's Phone Number</h2>
              <h4>{paymentInfo?.data.data.shippingAddress.phone}</h4>
            </div>

            <div className="cashItem">
              <h2 className='fw-bold'>Additional Information</h2>
              <h4>{paymentInfo?.data.data.shippingAddress.details}</h4>
            </div>

            <p className='fw-bold fs-5'> <span className='fs-3 text-main me-2'>Note:</span>  The shipment will arrive in three to seven days <i className="fa-solid fa-truck text-main ms-2"></i></p>
            <p className='fw-bold fs-3 text-main'>To call : 1990</p>
          </div>
        </div>

        <div className="row">
            <div className="col-md-8 offset-1  text-center">
              <img src={delivery} alt="imageDelivery" className=' imageDelivery'  />
            </div>
        </div>

      </div>
    
    </>
  )
}


