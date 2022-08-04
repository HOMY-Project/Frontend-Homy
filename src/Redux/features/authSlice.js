import { createSlice } from '@reduxjs/toolkit';


// Create the initial state for the auth feature
const initialState = {
    token: null,
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
      setToken : (state, action) =>{
        state.token = action.payload;
      },
      clearUser: (state) => {
        state.token = null;
        state.user = null;
      },
    }
});

export default authSlice.reducer;
export const { setUser, clearUser, setToken } = authSlice.actions;