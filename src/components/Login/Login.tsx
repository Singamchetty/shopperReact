import React, { memo, useState,useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { fetchUsers } from '../../reduxstore/usersSlice';
import { RootState } from '../../reduxstore/store';

 
const Login: React.FC = memo(() => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const users=useSelector((state:RootState)=> state.users.users)

    const [error, setError] = useState<string>('');
    
    const [values, setValues] = useState<any>({
        userId: "",
        password: ""
        })
//     const validateUserID=useCallback(()=>{
        

//   },[values]) 

//   useEffect(()=>{validateUserID()},[values])
 
  useEffect(() => {
        dispatch(fetchUsers());
  }, []);
   
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        users.map((user)=>{
            if(user.userId==values.userId.trim()){
                if(user.password==values.password.trim()){
                    console.log(user.userId)                
                   navigate("/")
                }
                else{
                    setError(("UserId/Password is incorrect"))
                }
            }
            else{
                setError(("UserId/Password is incorrect"))
            }
        })
       
        
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })     
      };
 
    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='loginsighnup-fields'>
                        <input
                            type="text"
                            placeholder='User Id'
                            value={values.userId} 
                            name='userId'
                            onChange={handleChange}
                        />
                        
                        <input
                            type="password"
                            placeholder='Password'
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    {error!="" && <span style={{textAlign:"center",color:"red"}}>{error}</span>}
                    <button type="submit" >Login</button>
                </form>
                <p className='loginsignup-login'>
                    <span>  <Link to="/forgot-password">Forgot Password</Link></span>
                </p>
               
            </div>
        </div>
    );
});
 
export default Login;