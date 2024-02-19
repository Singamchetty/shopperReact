import { configureStore } from '@reduxjs/toolkit'
import cartReducer,{CartStateType} from './cartSlice'
import productsReducer,{ProductsStateType} from './productsSlice'
import usersReducer,{UsersStateType} from './usersSlice'
import userDetailsslice,{UserDetailsType} from './userDetailsslice'

export type RootState= {
    products:ProductsStateType;
    cart: CartStateType;
    users: UsersStateType;
    userDetails:UserDetailsType
  }
const store=configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        users: usersReducer,
        userDetails:userDetailsslice
    },
})


export default store