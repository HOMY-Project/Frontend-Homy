import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Create the initial state for the auth feature
const initialState = {
    token: '',
    user: null,
  };
  // Create the authSlice, which will contain the reducer and the actions

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      clearUser: (state) => {
        state.isAuthenticated = false;
        state.user = null;
      },
    }
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;