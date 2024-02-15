import { configureStore } from '@reduxjs/toolkit'
import cartReducer,{CartStateType} from './cartSlice'
import productsReducer,{ProductsStateType} from './productsSlice'
import usersReducer,{UsersStateType} from './usersSlice'

export type RootState= {
    products:ProductsStateType;
    cart: CartStateType;
    users: UsersStateType;
  }
const store=configureStore({
    reducer:{
        products:productsReducer,
        cart: cartReducer,
        users: usersReducer
    },
})


export default store