import { createSlice } from '@reduxjs/toolkit';

const singleOrderSlice = createSlice({
    name: 'singleOrder',
    initialState: {
        orderDetails: [],
        total: 0,
        bill:[],
    },
    reducers:{
        setOrder: (state, action) => {
            state.orderDetails = action.payload;
        },
        setTotal: (state, action) => {
            state.total += action.payload.price * action.payload.quantity;
        },
        setBill: (state, action) => {
            state.bill= action.payload;
        },
    
    }})
export default singleOrderSlice.reducer;
export const { setOrder, setTotal, setBill } = singleOrderSlice.actions;