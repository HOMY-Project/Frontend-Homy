import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1; // cart quantity
            state.total += action.payload.price * action.payload.quantity; // product quantity * product price
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        incrementQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload);
            item.quantity++;
          },
        decrementQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        if (item.quantity === 1) {
            item.quantity = 1
        } else {
            item.quantity--;
        }
        },
        removeItem: (state, action) => {
            const removeItem = state.products.filter((item) => item.id !== action.payload);
            state.products = removeItem;
            state.quantity--;
          },
    }
})
export default cartSlice.reducer;
export const { addProduct, clearCart, removeItem } = cartSlice.actions;