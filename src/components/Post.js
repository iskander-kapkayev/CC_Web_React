/* handles posts from users */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

/* this passes a prop called imageid */
function Post(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({});
    const [captionKeys, setCaptionKeys] = useState();

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
                setCaptionKeys(Object.keys(captionList));
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };

        grabCaptions();

    }, [currentIndex]); // if imageid changes, re-render 

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? (
                    <h2>Captions are loading from the server...</h2>
                ) : (
                    captionKeys.length === 0 ? (
                        <p>No captions available.</p>
                    ) : (
                        captionKeys.map(captionId => (
                            <div key={captionId}>
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
                        ))
                    )
                )}
            </div>
        </div>
    );
}

export default Post;