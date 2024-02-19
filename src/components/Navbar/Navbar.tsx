import React, { useEffect, useState } from 'react';
import './Navbar.css'
import logo from './logo.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';
import { loginUser, logoutUser } from '../../reduxstore/userDetailsslice';
import NavButtons from './NavButtons';

 
const Navbar = () => {
    const user=useSelector((state:RootState)=>state.userDetails.userDetails)
    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch(logoutUser());
    }
 
    return (
        <div className='navbar' >
            <div className='nav-logo'>
                <img src={logo} alt=""/>
                <p>SHOPPER</p>
            </div>
            <NavButtons handleLogout={handleLogout}/>
        </div>
       
    );
};
 
export default Navbar;