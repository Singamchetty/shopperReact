import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../utils/constants';

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
    return await axios.get(`${base_url}/products`)
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
