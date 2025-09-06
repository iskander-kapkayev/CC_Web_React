/* handles posts from users */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

/* this passes a prop called imageid from image */
/* also passes along tokenExists and handleTokenExists() from main */
function Post(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({});
    const [userVotes, setUserVotes] = useState({});
    const [sessionUser, setSessionUser] = useState('');

    /* destructure from props */
    const { currentIndex } = props; // de-structure prop from image
    const { tokenExists } = props;
    const { handleTokenExists } = props;

    async function handleUserVote(voteType, captionText, captionUser, image) {

        // set up url and body for deletion request
        const URL = `${servURL}/votecaption`;
        const body = {
            captiontext: captionText, 
            captionuser: captionUser,
            type: voteType,
            imageid: image
        }; // body data  

        // check for token
        const sessionToken = sessionStorage.getItem('usertoken');
        
        // send body and token to server
        try {
            setLoading(true);

            if (sessionToken) {
            
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',  // set body format to json
                        'Authorization': `Bearer ${sessionToken}` // send authorization token
                    },
                    body: JSON.stringify(body)  // stringifies the data to send in the body
                });

                if (!response.ok) {
                    /* if response fails, likely because token has expired */
                    /* destroy session tokens */
                    handleTokenExists(false);
                    setSessionUser('');
                    throw new Error('Token has expired or does not exist');
                }

                const voteResponse = await response.json(); // this isn't really necessary anyway
                console.log(`Vote by ${sessionUser} was successfully added!`);
            }
        } catch (err) {
            setError("Failed to apply user vote.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeletion(caption, image) {

        // set up url and body for deletion request
        const URL = `${servURL}/deletecaption`;
        const body = {
            captiontext: caption, 
            imageid: image
        }; // body data 

        // check for token
        const sessionToken = sessionStorage.getItem('usertoken');
        
        // send body and token to server
        try {
            setLoading(true);
            if (sessionToken) {
                
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',  // set body format to json
                        'Authorization': `Bearer ${sessionToken}` // send authorization token
                    },
                    body: JSON.stringify(body)  // stringifies the data to send in the body
                });

                if (!response.ok) {
                    /* if response fails, likely because token has expired */
                    /* destroy session tokens */
                    handleTokenExists(false);
                    setSessionUser('');
                    throw new Error('Token has expired or does not exist');
                }

                const deletionResponse = await response.json(); // this isn't really necessary anyway
                console.log(`Caption successfully deleted by ${sessionUser}`);
            }
        } catch (err) {
            setError("Failed to handle deletion.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        const grabCaptions = async () => {
            try {
                setLoading(true);
                const URL = `${servURL}/collectcaptions?imageid=${currentIndex}`;
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const captionList = await response.json();

                setCaptions(captionList);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        grabCaptions();

         const grabUserVotes = async () => {
            try {
                setLoading(true);
                // grab username from token encryption
                const sessionToken = sessionStorage.getItem('usertoken');
                const sessionUsername = sessionStorage.getItem('username');
                setSessionUser(sessionUsername); // set current user
                if (sessionToken) {
                    /* body data for grabbing user votes */
                    const body = {
                        username: sessionUsername,
                        imageid: currentIndex
                    }; 

                    const URL = `${servURL}/grabuservotes`;
                    
                    const response = await fetch(URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',  // set body format to json
                            'Authorization': `Bearer ${sessionToken}` // send authorization token
                        },
                        body: JSON.stringify(body)  // stringifies the data to send in the body
                    });

                    if (!response.ok) {
                        /* if response fails, likely because token has expired */
                        /* destroy session tokens */
                        handleTokenExists(false);
                        setSessionUser('');
                        throw new Error('Token has expired or does not exist');
                    }

                    const currentUserVotes = await response.json();
                    setUserVotes(currentUserVotes);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        grabUserVotes(); 

    }, [currentIndex]); // if imageid changes, re-render 

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? 
                    ( <h2>Captions are loading from the server...</h2>) 
                    : (Object.keys(captions).map(captionId => 
                        (
                        <div key={captionId} className='post'>
                            <span id='captuser'>
                                <span id='postCaption'>{captions[captionId].captiontext} </span>
                                <span id='postUser'> - {captions[captionId].username} #{captions[captionId].category} </span>
                                {captions[captionId].username === sessionUser && <span class="deletion"> <a onclick={() => handleDeletion(captions[captionId].captiontext, currentIndex)}><i id="deleteicon" class="material-symbols-outlined">delete</i></a></span>}
                            </span>
                                
                            <div id='postUpvotes'>
                                <span className='heart'>
                                    <a onclick={() => handleUserVote('downvote', captions[captionId].captionText, captions[captionId].captionUser,currentIndex)}><i id={captions[captionId].username === sessionUser ?
                                                (userVotes[captionId].type === 'downvote' ?
                                                    'downvoteheartVOTE':
                                                    'downvoteheart'
                                                )
                                                :
                                                'downvoteheart'}
                                    className="material-symbols-outlined">remove</i></a>
                                </span>
                                <span className='votenum'>{captions[captionId].votecount}</span>
                                <span className='heart'>
                                    <a onclick={() => handleUserVote('upvote', captions[captionId].captionText, captions[captionId].captionUser,currentIndex)}><i id={captions[captionId].username === sessionUser ?
                                                (userVotes[captionId].type === 'upvote' ?
                                                    'upvoteheartVOTE':
                                                    'upvoteheart'
                                                )
                                                :
                                                'upvoteheart'} 
                                    className="material-symbols-outlined">add</i></a>
                                </span>
                            </div>
                        </div>
                        )
                    ))
                }
            </div>
        </div>
    );
}

export default Post;