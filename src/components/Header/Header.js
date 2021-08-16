import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
import Button from '@material-ui/core/Button';
//import SettingsPowerIcon from '@material-ui/icons/SettingsPower';

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
        <div class="header">
            <img src={logo} alt="" />
            <nav>
            <Link to="/shop">Shop</Link>
                <Link to="/review">Review Order</Link>
                <Link to="/inventory">Manage Inventory</Link>
              
                <Button onClick={() => setLoggedUser({})} variant="contained" color="primary">
                   Sign Out
                </Button>

            </nav>
        </div>
    );
};

export default Header;