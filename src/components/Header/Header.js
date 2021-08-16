import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
        <div class="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review Order</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={()=> setLoggedUser({}) }>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;