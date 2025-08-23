/* for all the async handling functions for signing in */

import { servURL, postNoAuth } from './FetchURL.js';

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
        return 'false';
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