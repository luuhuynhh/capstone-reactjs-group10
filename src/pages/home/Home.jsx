import React, { useEffect, useRef } from 'react';
import { Carousel } from 'antd';
//import redux
import { useSelector, useDispatch } from 'react-redux'
import ShoesCard from '../../components/ShoesCard/ShoesCard';
import axios from 'axios';
import { getAllProductApi, getProductAction } from '../../redux/reducers/productReducer';
import { NavLink } from 'react-router-dom';

const contentStyle = {
    margin: 0,
    height: '560px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    cursor: 'pointer'
};
const Home = () => {
    //Dùng user slector lấy state từ redux về
    const { arrProduct } = useSelector(state => state.productReducer);
    console.log('arrProduct', arrProduct);
    const dispatch = useDispatch();
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    const ref = useRef();

    const getAllProduct = async () => {
        /*
            action loại 1: {type,payload}
            action loại 2: async action không phải là object mà là function
            (dispatch2) => {
                //Làm 1 công việc gì đó để có được dữ liệu rồi mới dispatch
                dispatch2(action)
            }
        */
        const action = getAllProductApi();
        dispatch(action);
    }


    useEffect(() => {
        //call api từ backend
        getAllProduct();
    }, []);



    return (
        <div className='position-relative'>
            <button className='position-absolute' style={{ zIndex: "100", top: '60vh', left: 0, border: 'none', background: 'transparent' }} onClick={() => {
                ref.current.prev();
            }}>
                <img src='./img/pre.png' alt='pre' />
            </button>
            <button className='position-absolute' style={{ zIndex: "100", top: '60vh', right: 0, border: 'none', background: 'transparent' }} onClick={() => {
                ref.current.next();
            }}>
                <img src='./img/next.png' alt='next' />
            </button>
            <Carousel afterChange={onChange}
                autoplay={true}
                effect={"scroll"}
                pauseOnHover={true}
                pausOnDotHover={true}
                ref={ref}
            >
                {arrProduct.slice(0, 4).map((item, index) => {
                    return <div key={index}>
                        <div style={contentStyle} className="d-flex">
                            <div className='w-50'>
                                <img className='w-100 h-100' style={{ objectFit: 'cover' }} src={item.image} alt="..." />
                            </div>
                            <div className='w-50 ms-5' style={{ marginTop: '200px', textAlign: 'left' }}>
                                <h3 style={{ lineHeight: '1.2' }}>{item.name}</h3>
                                <p style={{ lineHeight: '1' }}>{item.shortDescription}</p>
                                <NavLink
                                    className="btn btn-warning text-white"
                                    to={`/detail/${item?.id}`}
                                >
                                    Buy now
                                </NavLink>
                            </div>
                        </div>
                    </div>
                })}


            </Carousel>

            <div className='container'>
                <h3>Products Featured</h3>
                <div className='row'>
                    {arrProduct.map((prod, idx) => {
                        return <div className='col-4 mt-2' key={prod.id}>
                            <ShoesCard prod={prod} />
                        </div>
                    })}
                </div>
            </div>


        </div>
    );
}

export default Home