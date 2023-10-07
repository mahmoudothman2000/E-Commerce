import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast';
import { isError } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {
  let[response , setResponse] = useState(null);

  async function getCategory(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(function(response){
      // console.log(response.data?.data); 
      setResponse(response.data?.data); 
      
    })
    .catch(function(error){
      if(error.response.data.statusMsg === 'fail'){
        toast.error('Can Not Find This Data');
        // console.log(error.response.data.message);
      }
    })
  }

  useEffect(() => {
    getCategory()
  }, [])
  
  return (
    <>
        <div className="container mt-5 ">
        <h1 className='text-main text-center my-5 fw-bold display-1'>Category</h1>
          <div className="row ">
            {response?.map((item , index)=>
            <div className="col-md-3 text-center" key={item._id}>
              <div className="category text-center">
                <Link to={`/categoryDetails/${item._id}`}> 
                  <img src={item.image} height={300} className='w-100 rounded-4 'alt={item.name} />
                  <h2>{item.name}</h2>
                </Link>
              </div>
            </div>
            )}
          </div>
        </div>
      <Helmet>
        <title>Categories</title>
      </Helmet>
    </>
  )
}


