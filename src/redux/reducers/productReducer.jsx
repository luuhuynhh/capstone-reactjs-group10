//rxslice
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  arrProduct: [
    // { id: 1, name: 'nike 1', price: 1000, image: 'https://picsum.photos/id/1/200/200' }
  ],
  productDetail: null,
  productSearch: []
}

const productReducer = createSlice({
  name: 'productReducer', //tên của reducer
  initialState, //giá trị state ban đầu (default)
  reducers: {
    getProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    getProductSearchAction: (state, action) => {
      state.productSearch = action.payload;
    }
  }
});

export const { getProductAction, getProductDetailAction, getProductSearchAction } = productReducer.actions

export default productReducer.reducer



/* ---------------- async action ---------------- */
//closure function 
export const getAllProductApi = () => {
  return async (dispatch) => {
    const result = await axios({
      url: 'https://shop.cyberlearn.vn/api/Product',
      method: 'GET'
    });
    const action = getProductAction(result.data.content);
    console.log(action);
    dispatch(action);
  }
}

//middleware (redux thunk)
export const getProductByIdApi = (id) => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      method: 'GET'
    });
    //Sau khi có được dữ liệu từ api => dispatch lần 2 lên reducer
    const action = getProductDetailAction(result.data.content);
    dispatch(action);
  }
}

export const getProductSearchApi = (keySearch) => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product?keyword=${keySearch}`,
      method: 'GET'
    })

    const action = getProductSearchAction(result.data.content);
    dispatch(action);
  }
}



// function main (param) {

//   return function () {
//     console.log(params);
//   }
// }

// main()();
