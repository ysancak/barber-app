import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: null | number;
  name: string;
  email: string;
}

const initialState: UserState = {
  id: null,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
    },
  },
});

// Actions
export const { setUser, clearUser } = userSlice.actions;

// Reducer
export default userSlice.reducer;
