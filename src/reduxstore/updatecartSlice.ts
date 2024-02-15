import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type updateCartStateType = {
    loading: boolean;
    cartItems: any[]; 
    error: string | undefined;
};

type  CartItemType = {
    userId:string,
    updateCartlist:any[]
}

const initialState: updateCartStateType = {
    loading: false,
    cartItems: [],
    error: ''
};

export const updateCartItems:any= createAsyncThunk('updatecart/updateCartItems', async ({userId,updateCartlist}:CartItemType) => {
    return await axios.post(`http://localhost:4000/updateCartItems/${userId}`,updateCartlist)
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
