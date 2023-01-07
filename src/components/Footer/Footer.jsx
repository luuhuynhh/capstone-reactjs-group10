import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className="pt-5">
            <div className='container d-flex justify-content-around'>
                <div className={styles.menu}>
                    <h5>GET HELP</h5>
                    <ul style={{ padding: '.2rem' }}>
                        <li>
                            <NavLink style={{ color: 'black' }} to={'/home'}>Home</NavLink>
                        </li>
                        <li>Nike</li>
                        <li>Adidas</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className={styles.menu}>
                    <h5>SUPPORT</h5>
                    <ul style={{ padding: '.2rem' }}>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Help</li>
                        <li>Phone</li>
                    </ul>
                </div>
                <div className={styles.menu}>
                    <h5>REGISTER</h5>
                    <ul style={{ padding: '.2rem' }}>
                        <li>
                            <NavLink style={{ color: 'black' }} to={'/register'}>Register</NavLink>
                        </li>
                        <li>
                            <NavLink style={{ color: 'black' }} to={'/login'}>Login</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{ backgroundColor: '#D9D9D9', textAlign: 'center', fontWeight: '400' }} className='py-3'>
                © 2022 Cybersoft All Rights Reserved | Design Theme by Group 10.
            </div>
        </footer>
    )
}

export default Footer