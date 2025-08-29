/* image container wraps around the following: */
/* the image itself */
/* the buttons to navigate to a specific image (numbers and next/prev) */
/* the user posts */
/*  */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';

function Image() {
    const [images, setImages] = useState({});
    const [currentIndex, setCurrentIndex] = useState(null); // set original state to 1
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
            currentIndexExists ? setCurrentIndex(Number(currentIndexExists)) : setCurrentIndex(1);
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
                    /* const imageURLArray = Object.values(imageURL).map(value => value); // array of the values */
                    
                    setImages(imageURL);
                    setCurrentIndex(1);
                    sessionStorage.setItem('imageURLs', JSON.stringify(imageURL));
                    localStorage.setItem('currentIndex', 1);
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

    /* display the current image! */
    const currentSRC = './assets/images/guy_kakashi.gif';
    const imageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    console.log(images);
    console.log(currentIndex);
    console.log(images[currentIndex]);
    return (
        <div className='image-container'>
            
            <span>
                {imageButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(index)}>
                        {label}
                    </button>
                ))}
            </span>

            <img id="myImage" alt={currentSRC} src={currentSRC}/>

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