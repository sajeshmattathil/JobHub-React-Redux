import { configureStore } from '@reduxjs/toolkit';
import UserAuth from '../Slices/UserSlices';
import HRAuth from '../Slices/HRSlices'
import AdminAuth from '../Slices/AdminSlices'

const store = configureStore({
  reducer: {
    user: UserAuth,
    HR : HRAuth,
    admin : AdminAuth
  },
});

export default store;