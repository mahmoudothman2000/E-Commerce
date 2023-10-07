import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Brands() {


  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let {data , isError , isLoading , error} = useQuery("allBrands" , getBrands ,{
    // refetchOnMount:true , 
    // staleTime: 4000 , 
    refetchInterval: 4000 , 
    enabled: true
  })

  

  return (
    <>
    
    {data?.data.data?
    <div className="container mt-5">
      <h1 className='text-main text-center my-5 fw-bold display-1'>Brands</h1>
      <div className="row g-4 ">
        { data?.data.data.map((brand)=> 
          <div className="col-md-3 brand" key={brand._id}>
            <Link to={`/brandDetails/${brand._id}`}>
                <div className="item">
                  <h2 className='text-center'>{brand.name}</h2>
                  <img src={brand.image} className='w-100' alt="" />
                </div>
            </Link>
          </div>
        )}
      </div>
    </div> : <div className="d-flex justify-content-center align-items-center w-100 vh-100"><i className='spinnerHome fa fa-spinner fa-spin  text-success'></i></div>}

    
    
      <Helmet>
        <title>Brands</title>
      </Helmet>
    </>
  )
}
