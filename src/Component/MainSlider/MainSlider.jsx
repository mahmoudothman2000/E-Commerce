import React from 'react'
import Slider from 'react-slick'
import  slider1 from  "../../Assets/Image/slider-image-1.jpg"
import  slider2 from  "../../Assets/Image/slider-image-2.jpg"
import  slider3 from  "../../Assets/Image/slider-image-3.jpg"
import  image1 from  "../../Assets/Image/slider-2.jpg"
import  image2 from  "../../Assets/Image/grocery-banner-2.jpg"


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    autoplay:true ,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false  
  };

  return (

    <>
      <div className="container my-2" id='slider'>
        <div className="row g-0">
          <div className="col-md-9" >
            <Slider {...settings}>
              <img src={slider1} className='w-100' height={400} alt="slider" />
              <img src={slider2} className='w-100' height={400} alt="slider" />
              <img src={slider3} className='w-100' height={400} alt="slider" />
            </Slider>
          </div>
          <div className="col-md-3">
              <img src={image1} className='w-100' height={200}  alt="slider" />
              <img src={image2} className='w-100'  height={200}  alt="slider" />
          
          </div>
        </div>
      </div>
    </>

  );
}
