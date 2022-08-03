import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

// Create the store, and export it for use in the application
const store = configureStore({
  reducer: {
    // reducer name
    // reducer function
    auth: authReducer,
  },
});

export default store;