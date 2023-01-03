import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './ShoesCard.module.css'

const ShoesCard = (props) => {

  const { prod } = props;
  return (
    <NavLink to={`/detail/${prod?.id}`}>
      <div className='card'>
        <img src={prod?.image} alt="..." />
        <div className='card-body'>
          <h3 className={styles.name}>{prod?.name}</h3>
          <p className={styles.description}>{prod?.shortDescription}</p>
        </div>
        <div className='d-flex row' style={{ margin: 0, height: '40px' }}>
          <button className={`${styles.buynow}`}>
            Buy now</button>
          <p className={`${styles.price} col-6`}>
            {prod?.price}$</p>
        </div>
      </div>
    </NavLink >
  )
}

export default ShoesCard