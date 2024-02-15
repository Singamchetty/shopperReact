import React, { memo, useState } from 'react';
import axios from 'axios';

const Register = memo(() => {
    // const [userId,setUserId]=useState('')
    // const [fname,setFname]=useState('')
    // const [lname,setLname]=useState('')
    // const [email,setEmail]=useState('')
    // const [mobile,setMobile]=useState('')
    // const [password,setPassword]=useState('')
    // const [confirmpassword,setConfirmpassword]=useState('')
    
    // const values1={
    //     "userId":userId,
    //     "fname":fname,
    //     "lname":lname,
    //     "email": email.toLowerCase(),
    //     "mobno": mobile,
    //     "passwd": password,
    //     "c_passwd": confirmpassword
    // }

    const [values, setValues] = useState({
        userid: "",
        fname: "",
        lname: "",
        email: "",
        mobno: "",
        passwd: "",
        c_passwd: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        console.log(values)
    }
 
    return (
        <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit} noValidate>

                    <table>
                        <tr>
                            {/* <div className='userId'> */}
                                <td><label>User ID : </label></td>
                                <td><input value={values.userid} name='userid' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
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
                                <td><input value={values.mobno} name='mobno' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='password'> */}
                                <td><label>Password : </label></td>
                                <td><input value={values.passwd} name='passwd' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            {/* <div className='confirmpassword'> */}
                                <td><label>Confirm Password : </label></td>
                                <td><input value={values.c_passwd} name='c_passwd' onChange={handleChange}/></td>
                            {/* </div> */}
                        </tr>
                        <tr>
                            <td></td>
                            <div className='submit'>
                                <td><button>Submit</button></td>
                            </div>
                        </tr>
                    </table>
                </form>   
            </div>   
        </div>
    );
});
 
export default Register;