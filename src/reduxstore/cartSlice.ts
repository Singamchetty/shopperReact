import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


type cartStateType = {
    loading: boolean;
    cartItems: any[];
    error: string | undefined;
};
type CartItemType = {
    userId: string,
    updateCartItems: any
}

const initialState: cartStateType = {
    loading: false,
    cartItems: [],
    error: ''
};

export const fetchCartItems: any = createAsyncThunk('cart/fetchCartItems', async (userid) => {
    return await axios.get(`http://localhost:4000/cartItems/${userid}`)
        .then(response => response.data.cartItems);
});

export const updateCartItems: any = createAsyncThunk('updatecart/updateCartItems', async ({ userId, updateCartItems }: CartItemType) => {
    return await axios.patch(`http://localhost:4000/updateCartItems/${userId}`, updateCartItems)
        .then(response => {
            console.log(response.data);
            return response.data
        });
});

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.loading = true;
            let prevCartItems = state.cartItems
            const newItem = action.payload;
            if (prevCartItems.find((item) => item.id === newItem.id)) {
                const index = prevCartItems.indexOf(prevCartItems.find((item) => item.id === newItem.id));
                let updatedItem = { ...prevCartItems[index], qty: prevCartItems[index].qty + 1 };
                prevCartItems[index] = updatedItem;
                state.cartItems = [...prevCartItems];
            } else {
                prevCartItems.push(newItem);
            }

        },
        removeFromCart: (state, action) => {
            state.loading = true;
            const removeItem = action.payload;
            console.log(removeItem)
            const filteredItems = state.cartItems.filter((item) => item.id !== removeItem.id);
            state.cartItems = filteredItems;
        },
        clearCart: (state) => (
            { ...state, cartItems: [] }
        ),
        incrementQuantity: (state, action) => {
            let prevCartItems = state.cartItems
            const index = prevCartItems.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                let updatedItem = { ...prevCartItems[index], qty: prevCartItems[index].qty + 1 };
                prevCartItems[index] = updatedItem;
                state.cartItems = [...prevCartItems];
            }
        },
        decrementQuantity: (state, action) => {
            let prevCartItems = state.cartItems
            if (action.payload.qty != 1) {
                const index = prevCartItems.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    const updatedItem = { ...prevCartItems[index], qty: prevCartItems[index].qty - 1 };
                    prevCartItems[index] = updatedItem;
                    state.cartItems = [...prevCartItems];
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
            state.error = "pending"
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
export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
