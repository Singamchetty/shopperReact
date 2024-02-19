import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type cartStateType = {
    loading: boolean;
    cartItems: any[]; 
    error: string | undefined;
};

const initialState: cartStateType = {
    loading: false,
    cartItems: [],
    error: ''
};

export const fetchCartItems:any= createAsyncThunk('cart/fetchCartItems', async (userid) => {
    return await axios.get(`http://localhost:4000/cartItems/${userid}`)
        .then(response => response.data.cartItems);
});

const cartSlice = createSlice({
    name: 'cartItems', 
    initialState,
    reducers: {}, 
    extraReducers: builder => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
            state.error="pending"
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
            state.error = '';
        });
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.cartItems = [];
            state.error = action.error || 'Something went wrong!';
        });
    }
});

export default cartSlice.reducer;
export type CartStateType = ReturnType<typeof cartSlice.reducer>;
