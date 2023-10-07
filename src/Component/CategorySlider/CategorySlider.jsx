import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'


export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    autoplay:true ,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  function getCategorySlider(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data} = useQuery("categorySlider" , ()=>getCategorySlider());

  // console.log(data?.data.data);
  // console.log(data);
  // console.log(data?.data.image);
  return (
    <>
      <div className="container p-2 my-5" id='slider'>
        <div className="row">
          {data?.data.data? <Slider {...settings}>
            {data?.data.data.map((category)=> <img src={category.image} key={category._id} className='w-100 ' alt='phot' height={150}/>)}
          </Slider> :""}
        </div>

        <div className="row">
          {data?.data.data? <Slider {...settings}>
            {data?.data.data.map((category)=> <img src={category.image} key={category._id} className='w-100 ' alt='phot' height={150}/>)}
          </Slider> :""}
        </div>
      </div>
    </>
  );
}
