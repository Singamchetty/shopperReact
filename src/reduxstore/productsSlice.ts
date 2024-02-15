import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type productsStateType = {
    loading: boolean;
    products: any[]; 
    error: string | undefined;
};

const initialState: productsStateType = {
    loading: false,
    products: [],
    error: ''
};

export const fetchProducts:any= createAsyncThunk('products/fetchProducts', async () => {
    return await axios.get('http://localhost:4000/products')
        .then(response => response.data);
});

const productsSlice = createSlice({
    name: 'products', 
    initialState,
    reducers: {}, 
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error="pending"
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = '';
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error || 'Something went wrong!';
        });
    }
});

export default productsSlice.reducer;
export type ProductsStateType = ReturnType<typeof productsSlice.reducer>;
