/* this component will handle logging in and signing up for a user */

import React, { useState } from 'react';

// Universal URL to access server
const servURL = 'https://cc-server-lake.vercel.app';

// we need a post without authorization to
// sign up check, sign in user, register a user
async function postNoAuth(URL, bodyData) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // ensures the body is in JSON format
        },
        body: JSON.stringify(bodyData)  // stringifies the data to send in the body
    });
    const data = await response.json();
    return data;
}

// check user email and username for uniqueness
async function signUpCheck(thisUsername, thisEmail) {
    const URL = `${servURL}/checkifexists`;
    const body = {
        username: thisUsername,
        email: thisEmail
    };
    const signUpCheck = await postNoAuth(URL, body); // this will fetch a success or error for signing up
    return (signUpCheck.message === 'Success');
}

// registers a new user
async function signUpRegister(thisUsername, thisEmail, thisPassword) {
    // first check that you can sign up
    const uniqueUser = await signUpCheck(thisUsername, thisEmail);

    if (uniqueUser) {
        const URL = `${servURL}/register`;
        const body = { 
            username: thisUsername, 
            email: thisEmail, 
            password: thisPassword 
        };
        const regCheck = await postNoAuth(URL, body); // this will fetch a success or error for signing up
        return (regCheck.message === 'Success');
    } else {
        // if you can't sign up, then abort
        return false;
    }
}

// create a way to sign in as a regular user
async function signInUser(thisEmail, thisPassword) {
    const URL = `${servURL}/signin`;
    const body = {
        email: thisEmail,
        password: thisPassword
    };
    const signInCheck = await postNoAuth(URL, body); // this will fetch a token
    if (signInCheck.message === 'Error generating token') {
        // no token was created
        return false;
    } else {
        // a user token was created and should be stored as a session
        // also store a 30 minute timer for the token
        sessionStorage.setItem('usertoken', signInCheck.token);
        const now = new Date();
        const expirationTime = now.getTime() + 30 * 60 * 1000; // minutes * seconds * milliseconds
        sessionStorage.setItem('expirationTime', expirationTime); // store an expiration time
        return true;
    }
}


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
                props.tokenExists(true); // set token exists to true
            } else {
                throw new Error('Login submission failed');
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