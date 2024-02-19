import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  HREmail : null
};

const HRAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    HRLogin(state, action) {
      console.log(action.payload,'payload');
      
      state.isLoggedIn = true;
      state.HREmail = action.payload.HREmail;

    },
    HRLogout(state) {
      state.isLoggedIn = false;
      state.HREmail = null

    },
  },
});

export const { HRLogin, HRLogout } = HRAuthSlice.actions;
export default HRAuthSlice.reducer;

