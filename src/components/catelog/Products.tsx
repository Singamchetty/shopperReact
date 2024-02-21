import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../reduxstore/store';
import { fetchProducts } from '../../reduxstore/productsSlice';
import Product from './Product';


const Products = memo(() => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const products = useSelector((state: RootState) => state.products);
    const user = useSelector((state: RootState) => state.userDetails.userDetails)
    
    useEffect(() => {
        // if (user !== null) {
        //     const isEmpty = Object.keys(user).length === 0 && user.constructor === Object;
        //     if (isEmpty) {
        //         navigate('/login');
        //     } else {
        //         dispatch(fetchProducts());
        //     }
        // } else {
        //     navigate('/login');
        // }
        if (user) {
            dispatch(fetchProducts())
          } else {
            navigate('/login')
          }

    }, [user])
    if (products.loading) { return <div className="text-center mt-5">Loading...</div> }
    else if(products.loading && products.error!="") { return <h1>{products.error}</h1>}
    else {
        return (
            <div className='row d-flex justify-content-evenly bg-dark'>
                {
                    products.products && products.products.map((product) => <Product key={product.id} product={product} />)
                }
            </div>
        );
    }
});

export default Products;