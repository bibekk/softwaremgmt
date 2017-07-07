import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <ul className='navbar'>
                <li><NavLink activeClassName="selected" to="/" exact={true} >Home</NavLink></li>
                <li><NavLink activeClassName="selected" to="/AddSoftware">Manage</NavLink></li>
                <li><NavLink activeClassName="selected" to="/Categories">Categories</NavLink></li>
            </ul>
        );
    }
}

export default Header;

//use NavNavLink