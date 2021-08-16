import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { CreateUserWithEmailAndPassword, handelGoogleSignIn, handelGoogleSingOut, initilaizeFrameWork, SignInWithEmailAndPassword } from './loginManager';
import { Button } from '@material-ui/core';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   } from '@fortawesome/free-solid-svg-icons';





const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
    });

    initilaizeFrameWork();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {

        handelGoogleSignIn()
            .then(res => {
                handelResponse(res, true);
            })
    }

    const SignOut = () => {
        handelGoogleSingOut()
            .then(res => {
                handelResponse(res, false);
            })
    }

    const handelResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }


    const handelBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);


        }
        if (e.target.name === 'password') {
            const isPassWordValid = e.target.value.length > 6;
            const isHasPasswordNunber = /\d{1}/.test(e.target.value);
            isFieldValid = isPassWordValid && isHasPasswordNunber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handelSubmit = (e) => {
        console.log(user.email, user.password);
        if (newUser && user.name && user.password) {
            CreateUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handelResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            SignInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handelResponse(res, true);
                })

        }


        e.preventDefault();
    }

    return (
        <div style={{ textAlign: 'center' }}>



            <h2 style={{color: 'orange'}}>Sign In or Sign Up</h2>

            <div className="signIn-col">
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign Up</label>

                <form onSubmit={handelSubmit}>
                    {
                        newUser && <input type="text" onBlur={handelBlur} name="name" placeholder="Your Name" />
                    }
                    <br />
                    <input type="text" onBlur={handelBlur} name="email" placeholder="Your Email" required />
                    <br />
                    <input type="password" name="password" onBlur={handelBlur} id="" placeholder="Your PassWord" required />
                    <br />
                    <input className="btn-sub" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'log in'} successfully</p>
                }
            </div>
            <div className="google-col">
                {
                    user.isSignIn ? <button onClick={SignOut}>Sign Out</button> :
                    <Button variant="contained" color="primary" onClick={googleSignIn}> Sign In With Google</Button>
                        
                }
                
                {
                    user.isSignIn && <div>
                        <p>Welcome, {user.name}</p>
                        <p>Your email: {user.email}</p>
                        <img src={user.photo} alt="" />
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;