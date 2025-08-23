/* for all the async handling functions */

// Universal URL to access server
export const servURL = 'https://cc-server-lake.vercel.app';

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