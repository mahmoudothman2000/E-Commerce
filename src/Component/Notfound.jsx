import React from 'react';
import notfound from "../Assets/Image/error.svg";

export default function Notfound() {
  return (
    <>
      <img src={notfound} className='m-auto w-50 d-block'  alt="error" />
    </>
  )
}
