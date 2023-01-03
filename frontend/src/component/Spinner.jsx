import React from 'react'
import { Bars } from 'react-loader-spinner'


function Spinner({message}) {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full '>
      <Bars
        height="60"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
        className='m-5'
      />
      <p className='text-lg text-center px-2'>{ message}</p>
    </div>
  )
}

export default Spinner