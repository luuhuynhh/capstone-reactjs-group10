import React from 'react'
import { Outlet } from 'react-router-dom'

const UserTemplate = () => {
  return (
    <div className='d-flex'>
        <div className='w-50' style={{minHeight:'100vh'}}>
            <img className='h-100 w-100' style={{objectFit:'cover'}} src='https://picsum.photos/1000/2000' alt="..."/>
        </div>
        <div className='w-50'>
            <Outlet />
        </div>
    </div>
  )
}

export default UserTemplate