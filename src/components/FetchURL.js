/* this contains the URLs for both server and client side */

// Universal URL to access server
export const webURL = 'https://cc-web-react.vercel.app/'; // adjusted for new react page
export const servURL = 'https://cc-server-lake.vercel.app';

/*
Async function call to fetch http request.
One will be for gets.
One will be for posts.
*/

export async function getDBData (URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

// we need a post without authorization to
// sign up check, sign in user, register a user
export async function postNoAuth(URL, bodyData) {
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

// we need a post with authorization to
// write a caption and like a caption
async function postAuth(URL, bodyData, token) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // set body format to json
            'Authorization': `Bearer ${token}` // send authorization token
        },
        body: JSON.stringify(bodyData)  // stringifies the data to send in the body
    });
    const data = await response.json();
    return data;
}