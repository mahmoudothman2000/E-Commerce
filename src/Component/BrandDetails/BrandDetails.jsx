import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

export default function BrandDetails() {
  let {id} =useParams();
  let[details , setDetails] = useState(null)

  async function getBrandDetails(brandId){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    .then(function(response){
      console.log(response.data?.data);
      setDetails(response.data?.data);

    })
    .catch(function(error){
      console.log(error);
    })
  }

  useEffect(() => {
    getBrandDetails(id)
  }, [])
  
  return (
    <>


    <div className="container w-75">
        {details?.map((product , index)=> 
          <div className="row brandsRow align-items-center" key={index}>

            <div className="col-md-4">
              <img src={product.imageCover} className='w-100 rounded-4' alt="" />
            </div>

            <div className="col-md-8">
              <div className="">
                <h3 className='text-center'>{product.title}</h3>
                <div className='d-flex justify-content-around'>
                  <span className='text-center'><span className='fw-bold'>Category</span>  {product.category.name}</span>
                  <span className='text-center'><span className='fw-bold'>Brand</span>  {product.brand.name}</span>
                  <span className='text-center'><span className='fw-bold'>Price</span>  {product.price}</span>
                  <span className='text-center'><span className='fw-bold'>RatingsAverage</span>  {product.ratingsAverage}</span>
                  <span className='text-center'><span className='fw-bold'>RatingsQuantity</span>  {product.ratingsQuantity}</span>
                </div>
                <p className='text-center my-3'><span className='fw-bold fs-4'>Description</span> <br />{product.description}</p>
              </div>
            </div>

            <button className='btn btn-success w-75 m-auto mt-2'>Add To Cart</button>
          </div>
        
        )}
      </div>
      
      {/* <div className=' w-50 m-auto' key={details?._id}>
        <h2 className='text-center'>Brand Name :{details?.name}</h2> 
        <h3 className='text-center'>Create Date :{details?.createdAt}</h3> 
        <img src={details?.image} className='w-100 mt-0' alt="" />
      </div> */}
    </>
  )
}






// brand
// : 
// {_id: '64089f8b24b25627a25315ca', name: 'Lenovo', slug: 'lenovo', image: 'https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747186/Route-Academy-brands/1678286730980.png'}
// category
// : 
// {_id: '6439d2d167d9aa4ca970649f', name: 'Electronics', slug: 'electronics', image: 'https://res.cloudinary.com/dwp0imlbj/image/upload/…747343/Route-Academy-categories/1681511121316.png'}
// createdAt
// : 
// "2023-03-08T18:44:42.035Z"
// description
// : 
// "Processor Information 10Gen Intel CoreI7-10750H 12M Cache, Up To 5.00 Ghz\nGraphic Card Nvidia Geforce Gtx 1650It 4 Gb\nStereo Speakers, 1.5W X2, Dolby Audio"
// id
// : 
// "6408d79a6406cd15828e8ef8"
// imageCover
// : 
// "https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747398/Route-Academy-products/1678301081374-cover.jpeg"
// images
// : 
// (4) ['https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301081467-3.jpeg', 'https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301081467-2.jpeg', 'https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301081468-4.jpeg', 'https://res.cloudinary.com/dwp0imlbj/image/upload/Route-Academy-products/1678301081466-1.jpeg']
// price
// : 
// 27599
// quantity
// : 
// 258
// ratingsAverage
// : 
// 4.8
// ratingsQuantity
// : 
// 8
// slug
// : 
// "laptop-ideapad-gaming-3-15imh05-15.6-inch-fhd-intel-core-i7-10750h-16gb-ram-1tb-hhd-+-256gb-ssd-4gb-nvidia-geforce-gtx-1650-ti-ddr6-dosonyx-englisharabic-black"
// sold
// : 
// 68
// subcategory
// : 
// [{…}]
// title
// : 
// "Laptop Ideapad-Gaming-3-15Imh05 15.6 Inch FHD Intel Core i7 10750H 16GB RAM 1TB HHD + 256GB SSD 4GB Nvidia Geforce Gtx 1650 Ti DDR6 DosOnyx English/Arabic Black"
// updatedAt
// : 
// "2023-10-06T23:26:41.291Z"
// _id
// : 
// "6408d79a6406cd15828e8ef8"