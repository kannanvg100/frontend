import React from 'react'

function Error404() {
    document.title = '404 | Page Not Found'
  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
        <h1 className='text-9xl font-bold text-gradient'>404</h1>
        <h2 className='text-3xl font-bold mt-4 text-gradient'>Page Not Found</h2>
    </div>
  )
}

export default Error404