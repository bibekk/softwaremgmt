import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <ul className='nav nav-tabs navbar-inverse   navbar-static-top'>
                <li><NavLink activeClassName="active" to="/" exact={true} >Home</NavLink></li>
                <li><NavLink activeClassName="active" to="/AddSoftware">Manage</NavLink></li>
                <li><NavLink activeClassName="active" to="/Categories">Categories</NavLink></li>
            </ul>
        );
    }
}

export default Header;

//use NavNavLink