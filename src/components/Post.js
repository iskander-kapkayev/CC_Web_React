/* handles posts from users */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

/* this passes a prop called imageid from image */
/* also passes along tokenExists and handleTokenExists() from main */
function Post(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({});

    /* destructure from props */
    const { currentIndex } = props; // de-structure prop from image
    const { tokenExists } = props;
    const { handleTokenExists } = props;

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

/*         const grabUserCheckToken = async () => {
            try {
                setLoading(true);
                // grab username from token encryption
                const sessionToken = sessionStorage.getItem('usertoken');
                if (sessionToken) {
                    let body = {}; // empty body data 
                    let URL = `${servURL}/grabusername`;
                    let response = await fetch(URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',  // set body format to json
                            'Authorization': `Bearer ${sessionToken}` // send authorization token
                        },
                        body: JSON.stringify(body)  // stringifies the data to send in the body
                    });

                    if (!response.ok) {
                        handleTokenExists(false);
                        throw new Error('Token has expired or does not exist');
                    }

                    let currentUser = await response.json();
                } 
                // now that we have the user
                // grab the captiontext user voted for
                body = {
                    username: thisusername.username,
                    imageid: currentIndex,
                }; // body data 
                URL = `${servURL}/grabuservotes`;
                const thisuservotes = await postAuth(URL, body, thistoken);

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

        grabCaptions(); */

    }, [currentIndex]); // if imageid changes, re-render 

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? (
                    <h2>Captions are loading from the server...</h2>
                ) : (
                    Object.keys(captions).map(captionId => 
                        (
                        <div key={captionId} className='post'>
                            <span id='captuser'>
                                <span id='postCaption'>{captions[captionId].captiontext} </span>
                                <span id='postUser'> - {captions[captionId].username} #{captions[captionId].category} </span>
                            </span>
                            <div id='postUpvotes'>
                                <span className='heart'>
                                    <a><i id='downvoteheart' className="material-symbols-outlined">remove</i></a>
                                </span>
                                <span className='votenum'>{captions[captionId].votecount}</span>
                                <span className='heart'>
                                    <a><i id='upvoteheart' className="material-symbols-outlined">add</i></a>
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