import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
 
const Login: React.FC = memo(() => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
 
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
 
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitted values:', { name, email, password });
    };
 
    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='loginsighnup-fields'>
                        <input
                            type="text"
                            placeholder='Your Name'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <input
                            type="email"
                            placeholder='Email Address'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className='loginsignup-login'>
                    <span>  <Link to="/forgot-password">Forgot Password</Link></span>
                </p>
               
            </div>
        </div>
    );
});
 
export default Login;