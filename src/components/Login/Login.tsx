import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../reduxstore/usersSlice';
import { RootState } from '../../reduxstore/store';
import { loginUser } from '../../reduxstore/userDetailsslice';


const Login: React.FC = memo(() => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users)
    const user = useSelector((state: RootState) => state.userDetails.userDetails)

    const [error, setError] = useState<string>('');

    const [values, setValues] = useState<any>({
        userId: "",
        password: ""
    })

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    useEffect(() => {
        if (user) {
            navigate('/products')
        } else {
            navigate('/login')
        }

    }, [user])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/login', values)
            .then((res) => {
                dispatch(loginUser(res.data.user))
                // console.log(res.data.user)
                navigate("/products")
            })
            .catch((err) => setError(err.response.data.message))
    }
 

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     users.map((user) => {
    //         if (user.userId == values.userId.trim()) {
    //             if (user.password == values.password.trim()) {
    //                 // console.log(user)  
    //                 dispatch(loginUser(user))
    //                 navigate("/products")

    //             }
    //             else {
    //                 setError(("UserId/Password is incorrect"))
    //             }
    //         }
    //         else {
    //             setError(("UserId/Password is incorrect"))
    //         }
    //     })


    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    };

    return (
        <div className='loginsignup py-5'>
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
                    {error != "" && <span style={{ textAlign: "center", color: "red" }}>{error}</span>}
                    <button type="submit" >Login</button>
                </form>
                <p className='loginsignup-login'>
                    <span>New user <Link to="/register">Register</Link></span>
                </p>

            </div>
        </div>
    );
});

export default Login;