import React from 'react'
import {Outlet} from 'react-router-dom'
import HeaderHome from '../../components/HeaderHome/HeaderHome'
const HomeTemplate = () => {
  return (
    <>
        {/* <header className='bg-dark p-5 text-center display-4 text-light'>Header</header> */}
        <HeaderHome />
        <section className='content' style={{minHeight:'70vh'}}>
                <Outlet />
        </section>
        <footer className='bg-dark p-5 text-center display-4 text-light'>Footer</footer>

    </>
  )
}

export default HomeTemplate