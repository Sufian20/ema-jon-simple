import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { CreateUserWithEmailAndPassword, handelGoogleSignIn, handelGoogleSingOut, initilaizeFrameWork, SignInWithEmailAndPassword } from './loginManager';





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
        if(redirect){
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
            <h1>This login</h1>

            {
                user.isSignIn ? <button onClick={SignOut}>Sign Out</button> :
                    <button onClick={googleSignIn}>Sign In With Google</button>
            }
            {
                user.isSignIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>


            <form onSubmit={handelSubmit}>
                {
                    newUser && <input type="text" onBlur={handelBlur} name="name" placeholder="Enter Your Name" />
                }
                <br />
                <input type="text" onBlur={handelBlur} name="email" placeholder="Enter Your Email Address" required />
                <br />
                <input type="password" name="password" onBlur={handelBlur} id="" placeholder="Enter Your PassWord" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'log in'} successfully</p>
            }
        </div>
    );
};

export default Login;