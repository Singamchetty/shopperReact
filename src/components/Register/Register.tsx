import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../reduxstore/usersSlice';
import { RootState } from '../../reduxstore/store';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users.users)
    const [userErr, setUserErr] = useState<any | null>(null);
    const [enablesubmit, setEnablesubmit] = useState<boolean>(true);

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

    const validateUserID = useCallback(() => {
        let errors = {
            userIdErr: "",
            fnameErr: "",
            lnameErr: "",
            emailErr: "",
            mobileErr: "",
            passwordErr: ""
        };

        if (values.userId !== "" && values.userId.length < 5) {
            errors.userIdErr = "UserId should have atleast 5 to 10 characters"
        }
        if (values.userId !== "" && values.userId.length >= 5) {
            users.map((user) => {
                if (user.userId == values.userId.trim()) {
                    errors.userIdErr = "User ID is already taken"
                } else {
                    errors.userIdErr = ""
                }
            })
        }
        if (values.userId !== "" && values.userId.length > 10) {
            errors.userIdErr = "UserId should be only upto 10 characters"
        }
        if (values.fname != "" && values.fname.length <= 4) {
            errors.fnameErr = "Name should be more than 4 characters"
        } else {
            errors.fnameErr = ""
        }
        if (values.lname != "" && values.lname.length <= 4) {
            errors.lnameErr = "Last Name should be more than 4 characters"
        } else {
            errors.lnameErr = ""
        }
        if (values.email !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(values.email)) {
                errors.emailErr = "Enter valid email address"
            } else {
                errors.emailErr = ""
            }
        }
        if (values.mobile !== "") {
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(values.mobile)) {
                errors.mobileErr = "Enter valid mobile number"
            } else {
                errors.mobileErr = ""
            }
        }
        if (values.password !== "") {
            const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
            if (!passwordRegex.test(values.password)) {
                errors.passwordErr = "Password >5 characters and one special character"
            } else {
                errors.passwordErr = ""
            }
        }

        if (
            values.userId.trim() === "" ||
            values.fname.trim() === "" ||
            values.lname.trim() === "" ||
            values.email.trim() === "" ||
            values.mobile.trim() === "" ||
            values.password.trim() === ""
        ) {
            setEnablesubmit(true);
        } else if (
            Object.values(errors).every(error => error === "")
        ) {
            setEnablesubmit(false);
        } else {
            setEnablesubmit(true);
        }
        setUserErr(errors);
    }, [values])



    useEffect(() => {
        validateUserID();
    }, [values, validateUserID]);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/registeruser', values)
            .then((res) => {
                navigate("/login")
                // console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit} noValidate={true}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>User ID : </label></td>
                                <td><input value={values.userId} name='userId' onChange={handleChange} type='text' /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.userIdErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td><label>First Name : </label></td>
                                <td><input value={values.fname} name='fname' onChange={handleChange} type='text' /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.fnameErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td><label>Last Name : </label></td>
                                <td><input value={values.lname} name='lname' onChange={handleChange} type='text' /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.lnameErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td><label>Email : </label></td>
                                <td><input value={values.email} name='email' type='email' onChange={handleChange} /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.emailErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td><label>Mobile : </label></td>
                                <td><input value={values.mobile} name='mobile' onChange={handleChange} type='tel' /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.mobileErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td><label>Password : </label></td>
                                <td><input value={values.password} name='password' onChange={handleChange} /></td>
                            </tr>
                            {
                                userErr && <tr>
                                    <td colSpan={2} style={{ textAlign: "center", color: "red" }}><span>{userErr.passwordErr}</span></td>
                                </tr>
                            }
                            <tr>
                                <td colSpan={2} style={{ textAlign: "center" }}><button type='submit' disabled={enablesubmit} style={enablesubmit ? { width: "100px", height: "30px", color: "black", fontWeight: "bolder", backgroundColor: "grey", borderRadius: "10%", boxShadow: "0px 0px 10px", marginTop: "10px" } : { color: "white", backgroundColor: "green", width: "100px", height: "30px", borderRadius: "10%", boxShadow: "0px 0px 20px black", marginTop: "10px" }}>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div className='d-flex justify-content-end mt-3'>
                <span>Already registered <Link to={"/login"}><button className='btn btn-warning'>Sign In</button></Link></span>
            </div>
            </div>
            
        </div>
    );
};
export default Register;