import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type updateCartStateType = {
    loading: boolean;
    cartItems: any[]; 
    error: string | undefined;
};

type  CartItemType = {
    userId:string,
    updateCartItems:any
}

const initialState: updateCartStateType = {
    loading: false,
    cartItems: [],
    error: ''
};

export const updateCartItems:any= createAsyncThunk('updatecart/updateCartItems', async ({userId,updateCartItems}:CartItemType) => {
    return await axios.patch(`http://localhost:4000/updateCartItems/${userId}`,updateCartItems)
        .then(response => response.data);
});

const updatecartSlice = createSlice({
    name: 'updatecartItems', 
    initialState,
    reducers: {}, 
    extraReducers: builder => {
        builder.addCase(updateCartItems.pending, (state) => {
            state.loading = true;
            state.error="pending"
        });
        builder.addCase(updateCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
            state.error = '';
        });
        builder.addCase(updateCartItems.rejected, (state, action) => {
            state.loading = false;
            state.cartItems = [];
            state.error = action.error || 'Something went wrong!';
        });
    }
});

export default updatecartSlice.reducer;
export type UpdateCartStateType = ReturnType<typeof updatecartSlice.reducer>;
