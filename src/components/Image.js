/* image container wraps around the following: */
/* the image itself */
/* the buttons to navigate to a specific image (numbers and next/prev) */
/* the user posts */
/*  */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

function Image() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
    function handleImageSelection(newIndex) {
        setCurrentIndex(newIndex);
    }

    /* on startup of webpage, double check if imageURLs is in cache */
    useEffect( () => {
        
        const checkImagesExist = sessionStorage.getItem('imageURLs');
        if (checkImagesExist) {

            /* set currentIndex of image roullette */
            const currentIndexExists = localStorage.getItem('currentIndex');
            currentIndexExists ? setCurrentIndex(Number(currentIndexExists)) : setCurrentIndex(0);
            setImages(JSON.parse(checkImagesExist)); // changes string to array
            
        } else {

            const grabImages = async () => {
                try {
                    setLoading(true);
                    const URL = `${servURL}/graballimages`;
                    const response = await fetch(URL);
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const imageURL = await response.json();

                    
                    setImages(imageURL.imageurls);
                    setCurrentIndex(0);
                    sessionStorage.setItem('imageURLs', JSON.stringify(imageURL.imageurls));
                    localStorage.setItem('currentIndex', 0);
                    setLoading(false);
                    setError(null);
                } catch (err) {
                    setError(err);
                    console.log(err);
                    /* setRetry(prev => prev + 1); */
                }
            };

            grabImages();
        } //end of else

    }, []); //no dependency, but we can change to for server issues

    /* if server is loading */
    if (loading) {
        return (
            <div className='image-container'>
                <h2>Images are loading from the server...</h2>
            </div>
        );
    }

    console.log(images);
    /* display the current image! */
    const currentSRC = `.${images[currentIndex]}`;
    const imageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <div className='image-container'>
            {images}
            <span>
                {imageButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(index)}>
                        {label}
                    </button>
                ))}
            </span>

            <img id="myImage" alt="imageServerURL" src={currentSRC}/>

            <span>
                <br/>
                <button>Prev Image</button>
                <button>Next Image</button>
                <br/>
            </span>
        </div>
    );
}

export default Image;