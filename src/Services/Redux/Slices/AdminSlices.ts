import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  adminEmail : null
};

const AdminAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    adminLogin(state, action) {
      console.log(action.payload,'payload');
      
      state.isLoggedIn = true;
      state.adminEmail = action.payload.userEmail;

    },
    adminLogout(state) {
      state.isLoggedIn = false;
      state.adminEmail = null

    },
  },
});

export const { adminLogin, adminLogout } = AdminAuthSlice.actions;
export default AdminAuthSlice.reducer;

