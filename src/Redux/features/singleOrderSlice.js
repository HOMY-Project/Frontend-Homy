import { createSlice } from '@reduxjs/toolkit';

const singleOrderSlice = createSlice({
    name: 'singleOrder',
    initialState: {
        orderDetails: [],
        total: 0,
    },
    reducers:{
        setOrder: (state, action) => {
            state.orderDetails = action.payload;
        },
        setTotal: (state, action) => {
            state.total += action.payload.price * action.payload.quantity;
        }
    }
})
export default singleOrderSlice.reducer;
export const { setOrder, setTotal } = singleOrderSlice.actions;