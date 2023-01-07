import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ShoesCard from '../../components/ShoesCard/ShoesCard'
import { getProductByIdApi } from '../../redux/reducers/productReducer';
import { changeProductAmountAction, resetProductAmountAction } from '../../redux/reducers/productReducer';
import { addToCartAction } from '../../redux/reducers/cartReducer'
import styles from './Detail.module.css';

const Detail = () => {
  const { userLogin } = useSelector(state => state.userReducer)
  const { productDetail, productAmount } = useSelector(state => state.productReducer);
  const [count, setCount] = useState(1);
  //dispatch: Dùng để đưa dữ liệu lên redux
  const dispatch = useDispatch();
  //params: dùng để lấy tham số trên url
  const params = useParams();

  //getProductById : Lấy dữ liệu từ api về => redux
  const getProductById = async () => {
    const action = getProductByIdApi(params.id);
    dispatch(action);
  }

  useEffect(() => {
    getProductById();
  }, [params.id]);

  const handleInc = () => {
    setCount(pre => pre + 1);
  }

  const handleDec = () => {
    setCount(pre => pre - 1);
  }
  const changeProductAmount = (num)=>{
    dispatch(changeProductAmountAction(num))
  }

  const addToCart = () => {
    if (userLogin) {
      dispatch(
        addToCartAction({
          ...productDetail,
          amount: productAmount,
        })
      )
    }
  }


  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-6'>
          <img src={productDetail?.image} alt="..." />
        </div>
        <div className='col-6 pt-5'>
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          <h4 style={{ color: 'green' }}>Available Size</h4>
          <div>
            {productDetail?.size.map((item, i) => {
              return <button className={styles.btn} style={{ marginRight: '.5rem' }} key={i}>{item}</button>
            })}
          </div>
          <p style={{ margin: '1rem 0', fontSize: '1.2rem', fontWeight: '600', color: 'red' }}>
            {productDetail?.price}$</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={styles.btn}
              onClick={handleInc}
              disabled={count === productDetail?.quantity}
              style={{ backgroundColor: '#7892ee', color: 'white' }}
            >+</button>
            <p style={{ width: '40px', margin: '0', textAlign: 'center', fontWeight: 'bold' }}>{count}</p>
            <button
              className={styles.btn}
              onClick={handleDec}
              disabled={count === 1}
              style={{ backgroundColor: '#7892ee', color: 'white' }}
            >-</button>
          </div>
          <button
            className='btn btn-dark'
            style={{
              marginTop: '1rem',
              backgroundImage: 'linear-gradient(#bf3be6, #4a42ee)',
              border: 'none',
              padding: '.5rem 1rem',
              fontSize: '1.2rem'
            }}
            onClick={addToCart}
          >
            Add to cart <i className='fa fa-cart-plus'></i>
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <h3 className='text-center mb-5'>-Realated Products-</h3>
        <div className='row'>
          {productDetail?.relatedProducts?.map((item, index) => {
            return <div className='col-4' key={index}>
              <ShoesCard prod={item} />
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default Detail