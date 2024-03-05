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
    addWorker: (state, action) => {
      const workers = [...state.workers, action.payload];
      state.workers = workers;
    },
    deleteWorker: (state, action) => {
      state.workers = state.workers.filter(
        worker => worker._id !== action.payload,
      );
    },
  },
});

export const {setWorkers, addWorker, deleteWorker} = workersSlice.actions;

export default workersSlice.reducer;
