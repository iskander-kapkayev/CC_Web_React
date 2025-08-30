/* image container wraps around the following: */
/* the image itself */
/* the buttons to navigate to a specific image (numbers and next/prev) */
/* the user posts */
/*  */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

function Image() {
    const [images, setImages] = useState({}); // will grab from server every time
    const [currentIndex, setCurrentIndex] = useState(1); // set original state to 1
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [currentsrc, setCurrentsrc] = useState(null); // will default to first image
    
    function handleImageSelection(newIndex) {
        setLoading(true); // loading screen
        setCurrentIndex(newIndex); // set new index
        setCurrentsrc(images[currentIndex]); // new src based on index
        setLoading(false); // done loading
    }

    function previousImageSelection() {
        setLoading(true); // loading screen

        const newIndex = currentIndex - 1;
        if (newIndex < 1) {
            newIndex = 20; // reset back to 20
        }

        setCurrentIndex(newIndex); // set new index
        setCurrentsrc(images[currentIndex]); // new src based on index
        setLoading(false); // done loading
    }

    function nextImageSelection() {
        setLoading(true); // loading screen

        const newIndex = currentIndex + 1;
        if (newIndex > 20) {
            newIndex = 1; // reset back to 20
        }

        setCurrentIndex(newIndex); // set new index
        setCurrentsrc(images[currentIndex]); // new src based on index
        setLoading(false); // done loading
    }

    /* on startup, always grab all images from server */
    useEffect( () => {

        const grabImages = async () => {
            try {
                setLoading(true);
                const URL = `${servURL}/graballimages`;
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const imageURL = await response.json();

                setImages(imageURL);
                
                const currentIndexExists = Number(localStorage.getItem('currentIndex'));
                if (currentIndexExists) {
                    setCurrentIndex(currentIndexExists);
                } else {
                    localStorage.setItem('currentIndex', 1);
                }
                
                sessionStorage.setItem('imageURLs', JSON.stringify(imageURL));
                setCurrentsrc(images[currentIndex]);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
                /* setRetry(prev => prev + 1); */
            }
        };

        grabImages();

    }, []); //no dependency, but we can change to for server issues

    /* display the current image! */
    const imageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <div className='image-container'>
            
            <span>
                {imageButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label)}>
                        {label}
                    </button>
                ))}
            </span>
            
            <h2></h2>

            {loading ? (
                <h2>Images are loading from the server...</h2>
            ) : (
                <img id="myImage" alt={currentsrc} src={currentsrc}/>
            )}

            <span>
                <br/>
                <button onClick={previousImageSelection}>Prev Image</button>
                <button onClick={nextImageSelection}>Next Image</button>
                <br/>
            </span>
        </div>
    );
}

export default Image;