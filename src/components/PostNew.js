/* handles posts from users */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';
import CaptionRowNew from './CaptionRowNew.js';

/* this passes a prop called imageid from image */
/* also passes handleTokenExists() from main */
function PostNew(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({}); // tracks captions
    const [userVotes, setUserVotes] = useState({}); // tracks all the user votes
    const [sessionUser, setSessionUser] = useState('');
    const [reRunCaptions, setReRunCaptions] = useState(0);
    
    /* destructure from props */
    const { currentIndex } = props; // de-structure prop from image
    const { handleTokenExists } = props;

    const handleUserVote = async (voteType, captionText, captionUser, image, caption) => {

        // set up url and body for deletion request
        const URL = `${servURL}/votecaption`;
        const body = {
            captiontext: captionText, 
            captionuser: captionUser,
            type: voteType,
            imageid: image,
            sessionUser: sessionUser,
            captionid: caption
        }; // body data  

        // check for token
        const sessionToken = sessionStorage.getItem('usertoken');
        if (!sessionToken) return null;
        
        // send body and token to server
        try {
   
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

            const updatedCaption = await response.json(); // this isn't really necessary anyway
            return updatedCaption;

        } catch (err) {
            setError("Failed to apply user vote.");
            return null;
        }
    }
  
    const handleDeletion = async (caption, image) => {

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

                const deletionResponse = await response.json(); // not used right now
                console.log(`Caption successfully deleted by ${sessionUser}`);
            }
        } catch (err) {
            setError("Failed to handle deletion.");
        } finally {
            setLoading(false);
            window.location.reload(); // refresh entire page to reset colors
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

        grabCaptions();
        grabUserVotes(); 

    }, [currentIndex, reRunCaptions]); // if imageid or reRunCaptions changes

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? 
                    ( <h2>Captions are loading from the server...</h2>) 
                    : (Object.keys(captions).map(captionId => 
                          <CaptionRowNew
                            key={captionId}
                            captionId={captionId}
                            captionText={captions[captionId]?.captiontext}
                            captionUsername={captions[captionId]?.username}
                            captionVoteCount={captions[captionId]?.votecount}
                            captionCategory={captions[captionId]?.category}
                            initialUserVote={userVotes[captionId]?.type}   // just this caption's vote
                            sessionUser={sessionUser}
                            currentIndex={currentIndex}
                            handleUserVote={handleUserVote}
                            handleDeletion={handleDeletion}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default PostNew;