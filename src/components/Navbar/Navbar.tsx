import React, { useState } from 'react';
import './Navbar.css'
import logo from './logo.png'
import { Link } from 'react-router-dom';
 
const Navbar = () => {
    //  const [menu,setMenu]=useState("Shop")
 
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt=""/>
                <p>SHOPPER</p>
            </div>
           
            {/* <ul className="nav-menu">
                <li onClick={()=>setMenu("Shop")} ><Link style={{textDecoration:"none"}} to="/">Shop</Link> {menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>setMenu("mens")} ><Link style={{textDecoration:"none"}} to="/mens">Men</Link> {menu==="mens"?<hr/>:<></>}</li>
                <li  onClick={()=>setMenu("Womens")}><Link style={{textDecoration:"none"}} to="/Womens">Women</Link> {menu==="Womens"?<hr/>:<></>}</li>
                <li  onClick={()=>setMenu("kids")}><Link style={{textDecoration:"none"}}  to="/Kids">Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
            </ul> */}
           
            <div className='nav-login-cart'>
                <Link to="/login"><button >Login</button> </Link>
                <Link to="/register"><button >Register</button> </Link>
            </div>
        </div>
       
    );
};
 
export default Navbar;