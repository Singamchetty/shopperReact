import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Profile from '../Profile/Profile';


type NavButtonsProps = {
    handleLogout: () => void;
}

const NavButtons = memo((props:NavButtonsProps) => {
    const user = useSelector((state: RootState) => state.userDetails.userDetails);
    return (
        <div className='d-flex'>
            { user && (Object.keys(user).length===0 && user.constructor === Object) ?(
                <div className='nav-login-cart'>
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/register">
                        <button>Register</button></Link>
                </div>
            ): (<>
                <Profile/>
                <Cart/>
                <Link to="/">
                    <button className='btn btn-danger' onClick={props.handleLogout}>Logout</button>
                </Link>
                </>
            ) }
        </div>
    );
});

export default NavButtons;