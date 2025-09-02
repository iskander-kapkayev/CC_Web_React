/* handles posts from users */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

/* this passes a prop called imageid */
function Post(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({});

    const { currentIndex } = props;

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

    }, [currentIndex]); // if imageid changes, re-render 

    console.log(captions);

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? 
                    ( <h2>Captions are loading from the server...</h2>) 
                    : 
                    (
                        <div>
                            <p>nothing to see here</p>
                            {Object.keys(captions).forEach(captionid => {
                                (
                                <div>
                                    <span id='captuser'>
                                        <span id='postCaption'>{captions[captionid].captiontext} </span>
                                        <span id='postUser'> - {captions[captionid].username} #{captions[captionid].category} </span>
                                    </span>
                                    <div id='postUpvotes'>
                                        <span class='heart'> <a><i id='downvoteheart' class="material-symbols-outlined">remove</i></a></span>
                                        <span class='votenum'>{captions[captionid].votecount}</span>
                                        <span class='heart'> <a><i id='upvoteheart' class="material-symbols-outlined">add</i></a></span>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Post;