import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type usersStateType = {
    loading: boolean;
    users: any[]; 
    error: string | undefined;
};

const initialState: usersStateType = {
    loading: false,
    users: [],
    error: ''
};

export const fetchUsers:any= createAsyncThunk('users/fetchUsers', async () => {
    return await axios.get('http://localhost:4000/users')
        .then(response => response.data);
});

const usersSlice = createSlice({
    name: 'users', 
    initialState,
    reducers: {}, 
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error="pending"
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error || 'Something went wrong!';
        });
    }
});

export default usersSlice.reducer;
export type UsersStateType = ReturnType<typeof usersSlice.reducer>;
