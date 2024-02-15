import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import ForgetPasswordForm from './components/ForgetPasswordForm/ForgetPasswordForm';
 
function App() {
 
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/home" Component={Home}/>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/cart" Component={Cart}/>
        <Route path="/profile" Component={Profile}/>
        <Route path="/forgot-password"  Component={ForgetPasswordForm}/>
           
        </Routes>
      </BrowserRouter>
  );
}
export default App