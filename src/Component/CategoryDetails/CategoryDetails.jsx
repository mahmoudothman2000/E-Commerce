import axios from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function CategoryDetails() {

  let {productId} =useParams();
  
  function getCategoryById(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/6439d5b90049ad0b52b90048`)
  }

  let{data , isError , isLoading }= useQuery("categoryById" , ()=>getCategoryById(productId) , {
    // refetchInterval: 2000 
  })

  console.log(data , isError , isLoading);



    
  return (
    <>




    <Helmet>
      <title>Category Details</title>
    </Helmet>
    </>
  )
}
