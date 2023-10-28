import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const authInitialState: UserResponse = {
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: authInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserResponse>) => {
      state.email = action.payload.email;
    },
  },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
