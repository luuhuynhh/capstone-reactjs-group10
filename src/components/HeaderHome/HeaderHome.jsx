import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const HeaderHome = () => {
    const { userLogin } = useSelector(state => state.userReducer);
    const renderLogin = () => {
        if (userLogin) {
            return <NavLink className={'nav-link'} to="/profile">
                Hello ! {userLogin.email}
            </NavLink>
        }
        return <NavLink className={'nav-link'} to="/login">
            Login
        </NavLink>
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="">The Shoes Shop</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/home" aria-current="page">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/register" aria-current="page">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        {renderLogin()}
                    </li>

                </ul>
                <div className="d-flex my-2 my-lg-0">
                    <NavLink className={"nav-link text-white"} to="/carts">
                        <i className='fa fa-cart-plus display-4' ></i>
                    </NavLink>
                </div>
            </div>
        </nav>

    )
}

export default HeaderHome