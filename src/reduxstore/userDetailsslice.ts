import { createSlice } from "@reduxjs/toolkit"

type  User = {
    userId: string;
    fname: string;  lname: string;  email: string
    mobile: string;
    password: string;}|null;

export type UserDetailsType={
    userDetails:User|null
}
const initialState:UserDetailsType={
    userDetails:null
}

const userDetailsSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            state.userDetails=action.payload
        },
        logoutUser:(state)=>{
            state.userDetails=null
        },
    },
})

export default userDetailsSlice.reducer
export const{loginUser,logoutUser}=userDetailsSlice.actions



