import React, { memo, useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';
import { fetchCartItems } from '../../reduxstore/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = memo(() => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const user = useSelector((state: RootState) => state.userDetails.userDetails);
    const capitalizedUserId = user && user.userId ? user.userId.charAt(0).toUpperCase() + user.userId.slice(1) : null;
    // const [preCartItems,setPreCartItems]=useState(cartItems);
    useEffect(()=>{
        if(Object.keys(user).length===0){
            navigate('/login')
        }else{
            dispatch(fetchCartItems(user.userId))
        }
    },[])
    const handleCartItems=()=>{
        dispatch(fetchCartItems(user.userId))
    }
    
    return (
        <div>
            <div>
                <button type="button" onClick={handleCartItems} className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#cartModal">
                   <span className='bi bi-cart'></span> Cart
                </button>
                <div className="modal fade" id="cartModal" tabIndex={-1} aria-labelledby="cartModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="cartModalLabel">{capitalizedUserId}'s Cart</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                          cartItems &&  cartItems.map((item)=><tr key={item.id}>
                                                <td><img src={item.image} width={100} height={100}/></td>
                                                <td>{item.price}</td>
                                                <td>$ {item.qty}</td>
                                                <td>$ {item.price * item.qty}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Cart;