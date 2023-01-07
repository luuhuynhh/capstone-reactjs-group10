import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './HeaderHome.module.css'
import { calculateTotalsAction } from '../../redux/reducers/cartReducer'
import { logoutAction } from '../../redux/reducers/userReducer'
const HeaderHome = () => {
    const { userLogin } = useSelector(state => state.userReducer);

    const { cartProducts, cartAmount } = useSelector(
        state => state.cartReducer
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (userLogin) {
            dispatch(calculateTotalsAction());
        }
    }, [cartProducts]);



    const renderLogin = () => {
        if (userLogin) {
            return <li className="nav-item d-flex align-items-center">
                <NavLink className={'nav-link'} to="/profile">
                    Hello! {userLogin.email}
                </NavLink>
                <NavLink
                    onClick={() => {
                        dispatch(logoutAction())
                    }
                    }
                >
                    Đăng xuất
                </NavLink>
            </li>
        }
        return <>
            <li className="nav-item">
                <NavLink className={'nav-link'} to="/login">
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={'nav-link'} to="/register">
                    Register
                </NavLink>
            </li>
        </>
    }
    return (
        <header className='position-fixed top-0 start-0'>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">
                <NavLink className="navbar-brand" to="">
                    <img src='img/logo.png' alt='logo' />
                </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
                        <li className="nav-item me-1">
                            <NavLink className={styles.navLinkCart} to="/search" aria-current="page">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                Search
                            </NavLink>
                        </li>
                        <li className="nav-item me-1">
                            <NavLink className={styles.navLinkCart} to="/carts" aria-current="page">
                                <img src="./img/cart.png" alt='cart' />

                                <span>({cartAmount})</span>
                            </NavLink>
                        </li>
                        {renderLogin()}

                    </ul>
                </div>
            </nav>
            <div style={{ boxShadow: '0px 3px 10px #888888' }}>
                <ul className="d-flex bg-white">
                    <li className="nav-item me-1">
                        <NavLink to="/home" aria-current="page"
                            className={({ isActive }) => (isActive ? `nav-link ${styles.active}` : `nav-link ${styles.unactive}`)}
                        >
                            Home
                        </NavLink>

                    </li>
                    <li className="nav-item me-1">
                        <NavLink className={({ isActive }) => (isActive ? `nav-link ${styles.active}` : `nav-link ${styles.unactive}`)} to="/men" aria-current="page">
                            Men
                        </NavLink>
                    </li>
                    <li className="nav-item me-1">
                        <NavLink className={({ isActive }) => (isActive ? `nav-link ${styles.active}` : `nav-link ${styles.unactive}`)} to="/women" aria-current="page">
                            Woman
                        </NavLink>
                    </li>
                    <li className="nav-item me-1">
                        <NavLink className={({ isActive }) => (isActive ? `nav-link ${styles.active}` : `nav-link ${styles.unactive}`)} to="/kid" aria-current="page">
                            Kid
                        </NavLink>
                    </li>
                    <li className="nav-item me-1">
                        <NavLink className={({ isActive }) => (isActive ? `nav-link ${styles.active}` : `nav-link ${styles.unactive}`)} to="/sport" aria-current="page">
                            Sport
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}


export default HeaderHome