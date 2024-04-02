import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
const BackButton = ({destination = '/'}) => { 
  return (
    <div className='bg-blue-600 px-4 py-1 rounded-lg w-fit'>
        <Link to={destination}>
      <BsArrowLeft className='text-2xl text-white'/>
        </Link>
    </div>
  )
}

export default BackButton
