//rxslice
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  http,
  getStoreJson,
  setCookie,
  setStoreJson,
  TOKEN,
  USER_LOGIN,
  eraseStore,
  eraseCookie,
} from '../../utils/config';

const initialState = {
  newUser: {},
  userLogin: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  profile: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.newUser = action.payload;
    },
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    logoutAction: (state) => {
      state.userLogin = null;
      //
      eraseStore(USER_LOGIN);
      eraseCookie(TOKEN);
    },
    getProfileAction: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { registerAction, loginAction, getProfileAction, logoutAction } =
  userReducer.actions;

export default userReducer.reducer;

export const registerApi = (newUserData) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        'https://shop.cyberlearn.vn/api/Users/signup',
        newUserData
      );
      console.log(result);
      const action = registerAction(result.data.content);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post(`/api/Users/signin`, userLogin);
      const action = loginAction(result.data.content);
      console.log(result);
      dispatch(action);

      setStoreJson(USER_LOGIN, result.data.content);
      setCookie(TOKEN, result.data.content.accessToken);

      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post(`/api/Users/getProfile`);
      console.log(result);
      const action = getProfileAction(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfileApi = (updatedData) => {
  return async () => {
    try {
      await http.post(`/api/Users/updateProfile`, updatedData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
};

