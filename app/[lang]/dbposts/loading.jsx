"use client"

import { ThreeCircles } from 'react-loader-spinner'
;

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className='flex justify-center items-center h-screen'>
        <ThreeCircles
    height="80"
    width="80"
    radius="9"
    color="#21acb8"
    ariaLabel="three-dots-loading"
  />
      </div>
    )
  }