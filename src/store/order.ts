import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface State {
  upcoming: Order[];
  past: Order[];
}

const initialState: State = {
  upcoming: [],
  past: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setUpcomingOrders: (state, action: PayloadAction<Order[]>) => {
      state.upcoming = action.payload;
    },
    setPastOrders: (state, action: PayloadAction<Order[]>) => {
      state.past = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.upcoming = state.upcoming.filter(
        order => order._id !== action.payload,
      );
    },
  },
});

export const {setUpcomingOrders, setPastOrders, deleteOrder} =
  orderSlice.actions;

export default orderSlice.reducer;
