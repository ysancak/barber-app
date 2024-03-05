import {createSlice} from '@reduxjs/toolkit';

const initialState: {workers: Worker[]} = {
  workers: [],
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkers: (state, action) => {
      state.workers = action.payload;
    },
    deleteWorker: (state, action) => {
      state.workers = state.workers.filter(
        worker => worker._id !== action.payload,
      );
    },
  },
});

export const {setWorkers, deleteWorker} = workersSlice.actions;

export default workersSlice.reducer;
