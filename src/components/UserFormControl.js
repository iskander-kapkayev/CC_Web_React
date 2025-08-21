/* this component will handle logging in and signing up for a user */

import React, { useState } from 'react';

function UserFormControl() {
    const [form, setForm] = useState('login'); // login form to start
    const [email, setEmail] = useState(''); // set email as user types
    const [password, setPassword] = useState(''); // set pw as user types
    const [username, setUsername] = useState(''); // set username as user types

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

    function submitLogin(e) {
        e.preventDefault();
        alert(`your email is: ${email}, and your pw is ${password}`);
    }

    function submitRegistration(e) {
        e.preventDefault();
        alert(`your email is: ${email}, and your pw is ${password}, and your un is ${username}`);
    }

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