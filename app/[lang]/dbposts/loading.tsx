"use client"

import { ThreeCircles } from 'react-loader-spinner'
;

export default function Loading() {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ThreeCircles
    height="80"
    width="80"
    color="#21acb8"
    ariaLabel="three-dots-loading"
  />
      </div>
    )
  }