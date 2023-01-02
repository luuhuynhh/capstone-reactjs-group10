import React from 'react'
import { NavLink } from 'react-router-dom';

const ShoesCard = (props) => {

  const {prod} = props;
  return (
    <div className='card'>
        <img src={prod?.image} alt="..." />
        <div className='card-body'>
            <h3>{prod?.name}</h3>
            <p>{prod?.price}</p>
            <NavLink to={`/detail/${prod?.id}`} className='btn btn-success'>
                View detail
            </NavLink>
        </div>
    </div>
  )
}

export default ShoesCard