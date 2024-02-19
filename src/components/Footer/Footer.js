import React from 'react'; 
import './Footer.css'; 
import footer_logo from './logo_big.png' ;
import instagram_icon from "./instagram_icon.png";
import pintester_icon from "./pintester_icon.png";
import whatsapp_icon from "./whatsapp_icon.png";

const Footer = () => {
    return (
        <div className='footer'>
           <div className='footer-logo'>

            </div> 
            <ul className='footer-link'>
               <li>Products</li> 
               <li>About</li> 
               <li>Contact</li>
            </ul> 
            <div className='footer-social-icon'> 
            <div className='footer-icons-container'>
                 <img src={instagram_icon} alt=""/> 
            </div> 
            <div className='footer-icons-container'>
                 <img src={pintester_icon} alt=""/>       
            </div> 
            <div className='footer-icons-container'>
                 <img src={whatsapp_icon} alt=""/>       
            </div>
            </div>
            <div className='footer-copyright'>
                   <hr/>
                   <p>Copyright @ 2024 - All Right Reserved. Developed by PVP</p>
            </div>
        </div>
    );
};

export default Footer;