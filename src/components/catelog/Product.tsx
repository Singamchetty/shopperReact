import React, { memo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateCartItems } from '../../reduxstore/updatecartSlice';
import { RootState } from '../../reduxstore/store';

type ProductType = {
    _id:string
    id?: string
    title: string
    price: number
    inStock: boolean
    description: string
    category:string
    image:string
    rating:{rate:number,count:number}
    qty:number
}
type ProductPropsType = {
    product: ProductType  | null
}

const Product = memo((props: ProductPropsType) => {
    const user= useSelector((state: RootState) => state.userDetails.userDetails)
    const dispatch=useDispatch()
  
    const {id,title,description,category,image,rating:{rate,count},qty,price}:ProductType= props.product!;

    const handleAddtoCart=()=>{
        if(Object.keys(user).length!=0){
        dispatch(updateCartItems({userId:user.userId,updateCartItems:props.product}))
        }    
    }



    return (<div className='col-lg-4 col-md-2 col-sm-1 my-2' style={{width: "300px"}}>
        <div className="card" >
            <img src={image} className="img-fluid" style={{width:"100%",height:"200px"}} alt="..."/>
                <div className="card-body" style={{width:"100%",height:"130px",overflowY: "scroll"}}>
                    <p className="card-title fw-bolder">Title: {title}</p>
                    <p className="card-text" style={{fontSize:"10px"}}><span className='fw-bold'>Description:</span><br/>{description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className='fw-bold'>Category : </span> {category}</li>
                    <li className="list-group-item">Rating  :{rate}/5({count})</li>
                    <li className="list-group-item">Price :{price}</li>
                </ul>
                <div className="card-body">
                    <button className='btn btn-danger w-100' onClick={handleAddtoCart}>Add To Cart</button>
                </div>
        </div>
    </div>
    );
});

export default Product;