import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  hrEmail : null
};

const HRAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    HRLogin(state, action) {
      console.log(action.payload,'payload');
      
      state.isLoggedIn = true;
      state.hrEmail = action.payload.userEmail;

    },
    HRLogout(state) {
      state.isLoggedIn = false;
      state.hrEmail = null

    },
  },
});

export const { HRLogin, HRLogout } = HRAuthSlice.actions;
export default HRAuthSlice.reducer;

