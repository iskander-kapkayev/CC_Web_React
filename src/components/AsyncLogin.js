/* for all the async handling functions for signing in */

import { servURL, postNoAuth } from './FetchURL.js';

/* this will allow us to see the payload from jwt */
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// check user email and username for uniqueness
export async function signUpCheck(thisUsername, thisEmail) {
    const URL = `${servURL}/checkifexists`;
    const body = {
        username: thisUsername,
        email: thisEmail
    };
    const signUpCheck = await postNoAuth(URL, body); // this will fetch a success or error for signing up
    return (signUpCheck.message === 'Success');
}

// registers a new user
export async function signUpRegister(thisUsername, thisEmail, thisPassword) {
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
export async function signInUser(thisEmail, thisPassword) {
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
        sessionStorage.setItem('usertoken', signInCheck.token);
        const payloadFromToken = parseJwt(signInCheck.token);
        sessionStorage.setItem('username', payloadFromToken.username);

        /* timer */
        /* const now = new Date();
        const expirationTime = now.getTime() + 30 * 60 * 1000; // minutes * seconds * milliseconds
        sessionStorage.setItem('expirationTime', expirationTime); // store an expiration time */
        return true;
    }
}