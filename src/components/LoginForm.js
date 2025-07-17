/* this component will handle logging in and signing up for a user */

import React from 'react';

function LoginForm() {

    return (
        <div className="form-container">
            <h2>LOGIN</h2>

            <form id="loginFormData">
                <input type="email" id="email" name="email" placeholder="email" required/>
                <input type="password" id="password" name="password" placeholder="password" required/>
                <button type="submit" value="Submit">SUBMIT</button>
            </form>

            <div class="link">
            <p>Don't have an account? <a href="./signup.html">REGISTER here</a></p>
        </div>
        
    </div>
    );
}

export default LoginForm;