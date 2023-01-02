import React, { useEffect } from 'react';
import { Carousel } from 'antd';
//import redux
import { useSelector, useDispatch } from 'react-redux'
import ShoesCard from '../../components/ShoesCard/ShoesCard';
import axios from 'axios';
import { getAllProductApi, getProductAction } from '../../redux/reducers/productReducer';

const contentStyle = {
    margin: 0,
    height: '560px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const Home = () => {
    //Dùng user slector lấy state từ redux về
    const { arrProduct } = useSelector(state => state.productReducer);
    console.log('arrProduct', arrProduct);
    const dispatch = useDispatch();
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

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
            <button className='position-absolute' style={{ zIndex: "right" }} onClick={() => {
                Carousel.next();
            }}>{">"}</button>
            <Carousel afterChange={onChange} autoplay={true} effect={"scroll"}>
                {arrProduct.slice(0, 4).map((item, index) => {
                    return <div key={index}>
                        <div style={contentStyle} className="d-flex">
                            <div className='w-50'>
                                <img className='w-100 h-100' style={{ objectFit: 'cover' }} src={item.image} alt="..." />
                            </div>
                            <div className='w-50'>
                                <h3>{item.name}</h3>
                                <p>{item.shortDescription}</p>
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