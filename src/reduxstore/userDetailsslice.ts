import { createSlice } from "@reduxjs/toolkit"
export type UserDetailsType={
    userDetails:{}|null
}
const initialState:UserDetailsType={
    userDetails:{},
}

const userDetailsSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            state.userDetails=action.payload
        },
        logoutUser:(state)=>{
            state.userDetails=[]
        },
    },
})

export default userDetailsSlice.reducer
export const{loginUser,logoutUser}=userDetailsSlice.actions



