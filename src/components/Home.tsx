import React, { memo, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { fetchProducts,ProductsStateType } from '../reduxstore/productsSlice';
import { fetchUsers,UsersStateType } from '../reduxstore/usersSlice';
import {useDispatch,useSelector } from 'react-redux';
import { RootState } from '../reduxstore/store';


const Home = memo(() => {
  const dispatch=useDispatch()
  const users=useSelector((state:RootState)=> state.users.users)

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, []);

  const testDispatch=useCallback(()=>{
    console.log(users)
  },[users])

    return (
        <div>
          Home
          <button onClick={testDispatch}>CLick</button>    
        </div>
    );
});

export default Home;