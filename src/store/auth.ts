import {createSlice} from '@reduxjs/toolkit';

const authInitialState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearTokens: state => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const {setTokens, clearTokens} = authSlice.actions;

export default authSlice.reducer;
