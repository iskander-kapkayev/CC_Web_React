/* handles posts from users */

import React, { useState, useEffect } from 'react';

/* this passes a prop called imageid */
function Post(props) {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [captions, setCaptions] = useState({});

    const { currentIndex } = props;

/*     useEffect(() => {

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

    }, [currentIndex]); // if imageid changes, re-render */

    return (
        <div className='image-container'>
            <h2>User Captions:</h2>
            <div className="post-container">
                {loading ? 
                    ( <h2>Captions are loading from the server...</h2>) 
                    : 
                    (
                        <div>
                            {captions}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Post;