import {createSlice} from '@reduxjs/toolkit';

type SearchSlice = {
  saloons: [Saloon] | [];
};

const initialState: SearchSlice = {
  saloons: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSaloons: (state, action) => {},
  },
});

export const {setSaloons} = searchSlice.actions;

export default searchSlice.reducer;
