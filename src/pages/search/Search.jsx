import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ShoesCard from '../../components/ShoesCard/ShoesCard';
import { getProductSearchApi } from '../../redux/reducers/productReducer';
import styles from './Search.module.css'
import _ from 'lodash'

const Search = () => {
  const activeStyle = {
    background: 'linear-gradient(180deg, #F21299 0%, #1B02B5 100%)',
    color: 'white'
  }
  const [sort, setSort] = useState('');
  const { productSearch } = useSelector(state => state.productReducer);
  const input = useRef();
  const dispatch = useDispatch();

  const getProductSearch = async () => {
    const action = getProductSearchApi(input.current.value);
    dispatch(action)
  }

  useEffect(() => {
    getProductSearch();
  }, [])

  return (
    <>
      <div className='container' style={{ paddingTop: '10vh' }}>
        <label style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>Search</label><br />
        <input
          ref={input}
          className={styles.inputName}
          style={{ width: '30vw' }}
          placeholder='Product name...' />
        <button className={styles.btnSearch} onClick={getProductSearch}>Search</button>
      </div>
      <h2 className={styles.resultTitle}>
        Search Result
      </h2>
      <div className='container'>
        <div>
          <p style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600', marginBottom: '0' }}>Price</p>
          <button
            style={sort === "desc" ? activeStyle : {}}
            className={styles.btnSort}
            onClick={() => setSort('desc')}
          >
            Decrease
          </button><br />
          <button
            style={sort === "asc" ? activeStyle : {}}
            className={styles.btnSort}
            onClick={() => setSort('asc')}
          >
            Ascending
          </button>
        </div>
        <div className='container'>
          {productSearch?.length === 0 && <h4 className='text-danger mt-2'>Không tìm thấy sản phẩm nào phù hợp</h4>}
          <div className='row'>
            {sort === 'asc' && _.sortBy(productSearch, 'price').map((prod, idx) => {
              return <div className='col-4 mt-2' key={prod.id}>
                <ShoesCard prod={prod} />
              </div>
            })}
            {sort === 'desc' && _.orderBy(productSearch, ['price'], ['desc']).map((prod, idx) => {
              return <div className='col-4 mt-2' key={prod.id}>
                <ShoesCard prod={prod} />
              </div>
            })}
            {sort === '' && productSearch.map((prod, idx) => {
              return <div className='col-4 mt-2' key={prod.id}>
                <ShoesCard prod={prod} />
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search