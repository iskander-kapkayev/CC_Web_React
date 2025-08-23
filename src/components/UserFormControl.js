/* this component will handle logging in and signing up for a user */

import React, { useState } from 'react';
import { signInUser, signUpRegister } from './AsyncLogin.js';

function UserFormControl(props) {
    const [form, setForm] = useState('login'); // login form to start
    const [email, setEmail] = useState(''); // set email as user types
    const [password, setPassword] = useState(''); // set pw as user types
    const [username, setUsername] = useState(''); // set username as user types
    const [error, setError] = useState(''); // set null error
    const [loading, setLoading] = useState(false); // set loading to false
    const [success, setSuccess] = useState(null); // changes on submission

    /* eventually add a function to check for the user web token in cache */
    /* if the token exists and not expired, then user is logged in */

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    // login submission
    const submitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (await signInUser(email, password)) {
                setSuccess(true); // submission was successful!
                setEmail(''); // clear email
                setPassword(''); // clear pw
                setForm('login'); // sends you to login form
                
                props.viewChanger('home'); // set to home page after login!
                props.handleTokenExists(true); // set token exists to true
            } else {
                
                throw new Error('Login submission failed. Try again!');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // registration submission
    const submitRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (await signUpRegister(username, email, password)) {
                setSuccess(true); // submission was successful!
                setEmail(''); // clear email
                setPassword(''); // clear pw
                setUsername(''); // clear username
                setForm('login'); // sends you to login form
            } else {
                throw new Error('Registration submission failed');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    if (form === 'login') {
        return (
            <div className="form-container">
                <h2>LOGIN</h2>

                <form id="loginFormData" onSubmit={submitLogin}>
                    <input type="email" id="email" value={email} placeholder="email" onChange={handleEmail} required/>
                    <input type="password" id="password" value={password} placeholder="password" onChange={handlePassword}  required/>
                    <button type="submit" value="SUBMIT">SUBMIT</button>
                </form>
                {error && (<p>{error}</p>)}
                <div className="link">
                    <p>Don't have an account? <a onClick={() => setForm('register')}>REGISTER here</a></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="form-container">
                <h2>REGISTER</h2>

                <p>Please note:</p>
                <p>There is no email verification at this time.</p>
                <p>So, you can use any email address you want.</p>
                <p>Just don't forget what you choose!</p>
                
                <h2></h2>

                <form id="registerFormData" onSubmit={submitRegistration}>
                    <input type="text" id="usernameReg" value={username} placeholder='username' onChange={handleUsername} required pattern="[A-Za-z0-9._-]+" />
                    <input type="email" id="emailReg" value={email} placeholder='email' onChange={handleEmail} required />
                    <input type="password" id="passwordReg" value={password} placeholder='password' onChange={handlePassword} required minlength="8" />
                    <button type="submit" value="SUBMIT">SUBMIT</button>
                </form>

                <div className="link">
                    <p>Already have an account? <a onClick={() => setForm('login')}>LOGIN here</a></p>
                </div>

            </div>
        );
    }
}

export default UserFormControl;