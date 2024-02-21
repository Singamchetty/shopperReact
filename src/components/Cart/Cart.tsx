import React, { memo,useMemo, useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';
import { fetchCartItems, updateCartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../../reduxstore/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const user = useSelector((state: RootState) => state.userDetails.userDetails);
    const capitalizedUserId = user && user.userId ? user.userId.charAt(0).toUpperCase() + user.userId.slice(1) : null;

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate('/login')
        } else {
            dispatch(fetchCartItems(user.userId))
        }
    }, [user])
    const handleCartChanges = () => {
        dispatch(updateCartItems({ userId: user.userId, updateCartItems: cartItems }))
    }
    const totalPay=useMemo(()=>{
        return cartItems.reduce((acc,curr)=>{
          return acc=acc+ (parseInt(curr.price) * parseInt(curr.qty));
    },0)
},[cartItems])


    return (
        <div>
            <div>
                <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#cartModal">
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
                                <table className='table table-hover m-0'>
                                    <thead>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.length > 0 && cartItems.map((item) => <tr key={item.id}>
                                                <td><img src={item.image} width={50} height={50} /></td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <span className='d-flex justify-content-start align-items-center'>
                                                    <button onClick={()=>{dispatch(decrementQuantity(item))}} className='btn btn-tranparent fw-bolder d-flex justify-content-center align-items-center' style={{ height: "15px", width: "15px" }}>-</button>
                                                    <span> {item.qty} </span>
                                                    <button onClick={()=>{dispatch(incrementQuantity(item))}} className='btn btn-tranparent fw-bolder d-flex justify-content-center align-items-center' style={{ height: "10px", width: "8px" }}>+</button>
                                                    </span>
                                                </td>
                                                <td>$ {(item.price * item.qty).toFixed()}</td>
                                                <td><button onClick={() => dispatch(removeFromCart(item))} className='bi bi-trash text-danger bg-transparent border-0'></button></td>
                                            </tr>)
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} align='right'>Total:</td>
                                            <td colSpan={2}>{`${totalPay}`}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleCartChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Cart;