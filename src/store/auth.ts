import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authType: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.authType = action.payload.authType;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: state => {
      state.authType = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setTokens, clearTokens} = authSlice.actions;

export default authSlice.reducer;
