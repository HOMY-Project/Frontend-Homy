import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        shipmentTotal: 0,
        wishlist: [],
    },
    reducers:{
        addProduct: (state, action) => {
            if(state.products.find(product => product.id === action.payload.id)){
                state.products.find(product => product.id === action.payload.id).quantity += 1;
                state.quantity += 1;
                state.total += action.payload.price; // product quantity * product price
                state.shipmentTotal += action.payload.shipment
            }else{
            state.products.push(action.payload);
            state.quantity += 1; // cart quantity
            state.total += action.payload.price; // product quantity * product price
            state.shipmentTotal += action.payload.shipment;
            }
        },

        addWishlist: (state, action) => {
            state.wishlist.push(action.payload);
        },
        clearWishlist: (state, action) => {
            state.wishlist=[]
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        setTotalAfterDiscount: (state) => {
            state.total -= state.payload;
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
            state.shipmentTotal = state.products.reduce((total, item) => total + item.shipment, 0);
        },
        removeItemFromWishlist: (state, action) => {
            const removeItem = state.wishlist.filter((item) => item.id !== action.payload);
            state.products = removeItem;
        }
    }
})
export default cartSlice.reducer;
export const { addProduct, clearCart, removeItem, incrementQuantity,clearWishlist, decrementQuantity, setTotalAfterDiscount, addWishlist, removeItemFromWishlist } = cartSlice.actions;