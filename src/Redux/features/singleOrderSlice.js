import { createSlice } from '@reduxjs/toolkit';

const singleOrderSlice = createSlice({
    name: 'singleOrder',
    initialState: {
        orderDetails: [],
        subTotal: 0
    },
    reducers:{
        setOrder: (state, action) => {
            state.orderDetails = action.payload;
        },
        setSubTotal: (state, action) => {
            state.subTotal = action.payload;
        }
    }
})
export default singleOrderSlice.reducer;
export const { setOrder, setSubTotal } = singleOrderSlice.actions;