import { createSlice } from '@reduxjs/toolkit';


// Create the initial state for the auth feature
const initialState = {
    token: null,
    user: null,
    isFetching: false,
    error: false,
    searchWord: null,
    allProducts:null
  };
  // Create the authSlice, which will contain the reducer and the actions

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginStart: (state) => {
        state.isFetching = true;
      } ,
      setUser: (state, action) => {
        state.user = action.payload;
        state.isFetching = false;
      },
      setToken : (state, action) =>{
        state.token = action.payload;
      },
      clearUser: (state) => {
        state.token = null;
        state.user = null;
      },
      loginFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      setSearchWord: (state, action) => {
        state.searchWord = action.payload;
      },
      clearSearchWord: (state) => {
        state.searchWord = null;
      },
      setAllProducts: (state, action) => {
        state.allProducts = action.payload;
      }
      
    }
});

export default authSlice.reducer;
export const { setUser, clearUser, setToken, loginFailure, loginStart, setSearchWord, setAllProducts } = authSlice.actions;