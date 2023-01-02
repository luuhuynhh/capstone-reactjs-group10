import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ShoesCard from '../../components/ShoesCard/ShoesCard'
import { getProductByIdApi, getProductDetailAction } from '../../redux/reducers/productReducer';

const Detail = () => {
  const {productDetail} = useSelector(state => state.productReducer);
  //dispatch: Dùng để đưa dữ liệu lên redux
  const dispatch = useDispatch();
  //params: dùng để lấy tham số trên url
  const params = useParams();

  //getProductById : Lấy dữ liệu từ api về => redux

  const getProductById = async () => {
    // const result = await axios({
    //     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
    //     method:'GET'
    // });
    // //Lấy dữ liệu từ api về
    // console.log(result.data.content);
    // //Tạo action từ actionCreator của reduxslice
    // const action = getProductDetailAction(result.data.content);
    // //action = {type:,payload}
    // dispatch(action);
    const action = getProductByIdApi(params.id);
    dispatch(action);
  }

  useEffect(()=>{
    getProductById();
  },[params.id]);


  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-4'>
          <img src={productDetail?.image} alt="..." />
        </div>
        <div className='col-8'>
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.price}</p>
          <button className='btn btn-dark'>Add to cart <i className='fa fa-cart-plus'></i></button>
        </div>
      </div>
      <div className='mt-2'>
          <h3>Realated Products</h3>
          <div className='row'>
            {productDetail?.relatedProducts?.map((item,index)=>{
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