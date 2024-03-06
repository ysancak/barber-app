import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface State {
  workers: Worker[];
}

const initialState: State = {
  workers: [],
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkers: (state, action: PayloadAction<Worker[]>) => {
      state.workers = action.payload;
    },
    addWorker: (state, action: PayloadAction<Worker>) => {
      const workers = [...state.workers, action.payload];
      state.workers = workers;
    },
    editWorker: (state, action: PayloadAction<Worker>) => {
      const index = state.workers.findIndex(
        worker => worker._id === action.payload._id,
      );
      if (index !== -1) {
        state.workers[index] = action.payload;
      }
    },
    deleteWorker: (state, action: PayloadAction<string>) => {
      state.workers = state.workers.filter(
        worker => worker._id !== action.payload,
      );
    },
  },
});

export const {setWorkers, addWorker, editWorker, deleteWorker} =
  workersSlice.actions;

export default workersSlice.reducer;
