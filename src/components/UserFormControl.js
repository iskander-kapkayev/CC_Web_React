/* this component will handle logging in and signing up for a user */

import React, { useState } from 'react';

function UserFormControl() {
    const [form, setForm] = useState('login'); // login form to start

    /* eventually add a function to check for the user web token in cache */
    /* if the token exists and not expired, then user is logged in */

    if (form === 'login') {
        return (
            <div className="form-container">
                <h2>LOGIN</h2>

                <form id="loginFormData">
                    <input type="email" id="email" name="email" placeholder="email" required/>
                    <input type="password" id="password" name="password" placeholder="password" required/>
                    <button type="submit" value="Submit">SUBMIT</button>
                </form>

                <div className="link">
                    <p>Don't have an account? <a onClick={() => setForm('register')}>REGISTER here</a></p>
                </div>
            </div>
        );
    } else {
        return (
            <div class="form-container">
                <h2>REGISTER</h2>

                <form id="registerFormData">
                    <input type="text" id="usernameReg" name="usernameReg" placeholder='username' required pattern="[A-Za-z0-9._-]+" />
                    <input type="email" id="emailReg" name="emailReg" placeholder='email' required />
                    <input type="password" id="passwordReg" name="passwordReg" placeholder='password' required minlength="8" />
                    <button type="submit" value="Submit">SUBMIT</button>
                </form>

                <div className="link">
                    <p>Already have an account? <a onClick={() => setForm('login')}>LOGIN here</a></p>
                </div>

            </div>
        );
    }
}

export default UserFormControl;