//rxslice

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLogin: null
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    }
  }
});

export const { loginAction } = userReducer.actions

export default userReducer.reducer