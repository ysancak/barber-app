import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  saloons: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSaloons: (state, action) => {
      state.saloons = action.payload;
    },
  },
});

export const {setSaloons} = searchSlice.actions;

export default searchSlice.reducer;
