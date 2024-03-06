import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface State {
  upcoming: WorkerDayOff[];
  past: WorkerDayOff[];
}

const initialState: State = {
  upcoming: [],
  past: [],
};

const dayOffsSlice = createSlice({
  name: 'dayOffs',
  initialState,
  reducers: {
    setUpcomingDayOffs: (state, action: PayloadAction<WorkerDayOff[]>) => {
      state.upcoming = action.payload;
    },
    addUpcomingDayOff: (state, action: PayloadAction<WorkerDayOff>) => {
      const data = [...state.upcoming, action.payload];
      state.upcoming = data;
    },
    editUpcomingDayOff: (state, action: PayloadAction<WorkerDayOff>) => {
      const index = state.upcoming.findIndex(
        dayOff => dayOff._id === action.payload._id,
      );
      if (index !== -1) {
        state.upcoming[index] = action.payload;
      }
    },
    deleteUpcomingDayOff: (state, action: PayloadAction<string>) => {
      state.upcoming = state.upcoming.filter(
        dayOff => dayOff._id !== action.payload,
      );
    },
    setPastDayOffs: (state, action: PayloadAction<WorkerDayOff[]>) => {
      state.past = action.payload;
    },
  },
});

export const {
  setUpcomingDayOffs,
  addUpcomingDayOff,
  editUpcomingDayOff,
  deleteUpcomingDayOff,
  setPastDayOffs,
} = dayOffsSlice.actions;

export default dayOffsSlice.reducer;
