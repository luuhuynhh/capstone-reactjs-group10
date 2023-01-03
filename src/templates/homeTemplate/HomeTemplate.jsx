import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from '../../components/HeaderHome/HeaderHome'
import Footer from '../../components/Footer/Footer'
const HomeTemplate = () => {
  return (
    <div style={{ height: '100%' }}>
      <HeaderHome />
      <section className='content' style={{ minHeight: '70vh', paddingTop: '10vh' }}>
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default HomeTemplate