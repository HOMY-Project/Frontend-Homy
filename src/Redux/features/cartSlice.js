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
            if(state.products.find(product => product.id === action.payload.id)){
                state.products.find(product => product.id === action.payload.id).quantity += 1;
                state.quantity += 1;
                state.total += action.payload.price; // product quantity * product price
            }else{
            state.products.push(action.payload);
            state.quantity += 1; // cart quantity
            state.total += action.payload.price  // product quantity * product price
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        incrementQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload);
            item.quantity++;
            state.quantity += 1;
            state.total += item.price;
          },
        decrementQuantity: (state, action) => {
        const item = state.products.find((item) => item.id === action.payload);
        if (item.quantity === 1) {
            item.quantity = 1
        } else {
            item.quantity--;
            state.quantity -= 1;
            state.total -= item.price;
        }
        },
        removeItem: (state, action) => {
            const removeItem = state.products.filter((item) => item.id !== action.payload);
            state.products = removeItem;
            state.quantity = state.products.length;
            state.total = state.products.reduce((total, item) => total + item.price, 0);
        }
    }
})
export default cartSlice.reducer;
export const { addProduct, clearCart, removeItem, incrementQuantity, decrementQuantity, addProductQuantity } = cartSlice.actions;