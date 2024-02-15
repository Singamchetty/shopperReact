import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import {useSelector, useDispatch} from 'react-redux'
import { fetchUsers } from '../../reduxstore/usersSlice';
import { RootState } from '../../reduxstore/store';

const Register = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const users=useSelector((state:RootState)=> state.users.users)
    const [userErr,setUserErr]=useState<string>('')
    const [enablesubmit, setEnablesubmit] = useState(true);

    const [values, setValues] = useState<any>({
        userId: "",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        password: ""
        })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })     
      };

      const validateUserID=useCallback(()=>{
            users.map((user)=>{
                if(user.userId==values.userId.trim()){
                    setUserErr("userId taken")
                    setEnablesubmit(true)
                }else{
                    setUserErr("userId available")
                    setEnablesubmit(false)
                }
            })

      },[values])

      useEffect(()=>{validateUserID()},[values])

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/registeruser', values)
        .then((res)=>{
            navigate("/login")
            console.log(res.data)})
        .catch((err)=>console.log(err))
    }
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, []);
 
    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit} noValidate>

                    <table>
                        <tr>
                            {/* <div className='userId'> */}
                                <td><label>User ID : </label></td>
                                <td><input value={values.userId} name='userId' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                       {
                        userErr!="" &&  <tr>
                        <td colSpan={2} style={{textAlign:"center",color:"red"}}><span>{userErr}</span></td>
                    </tr>
                       }
                        <tr>
                            {/* <div className='fname'> */}
                                <td><label>First Name : </label></td>
                                <td><input value={values.fname} name='fname' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='lname'> */}
                                <td><label>Last Name : </label></td>
                                <td><input value={values.lname} name='lname' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='email'> */}
                                <td><label>Email : </label></td>
                                <td><input value={values.email} name='email' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='mobile'> */}
                                <td><label>Mobile : </label></td>
                                <td><input value={values.mobile} name='mobile' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='password'> */}
                                <td><label>Password : </label></td>
                                <td><input value={values.password} name='password' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            <td></td>
                            <div className='submit'>
                                <td><button type='submit' disabled={enablesubmit}>Submit</button></td>
                            </div>
                        </tr>
                    </table>
                </form>   
            </div>   
        </div>
    );
};
export default Register;