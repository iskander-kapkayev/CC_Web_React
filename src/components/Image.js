/* image container wraps around the following: */
/* the image itself */
/* the buttons to navigate to a specific image (numbers and next/prev) */
/* the user posts */
/*  */

import React, { useState, useEffect } from 'react';
import { servURL } from './FetchURL.js';
import PostNew from './PostNew.js';
import CaptionForm from './CaptionForm.js';

function Image(props) {
    /* holds image urls */
    const [images, setImages] = useState({}); // will grab from server every time

    /* for processing fetch */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentsrc, setCurrentsrc] = useState(`public/assets/images/guy_kakashi.gif`); // will default to first image
    
    /* to handle image changes */
    const [currentIndex, setCurrentIndex] = useState(1); // set original state to 1
    const [currentCategory, setCurrentCategory] = useState('naruto'); // set original category to naruto

    // destructure from props
    const { tokenExists } = props;
    const { handleTokenExists } = props;

    function handleImageSelection(newIndex, category) {
        setCurrentIndex(newIndex); // set new index
        setCurrentCategory(category); // set new category
        localStorage.setItem('currentIndex', newIndex); // store locally
        localStorage.setItem('currentCategory', category); // store locally
        setCurrentsrc(images[newIndex]); // new src based on index
    }

    function prevNextImageSelection(direction) {

        /* this function used to calculate the prev or next index of the current category */
        const calculateIndex = (arrayOfButtons, direction) => {

            let buttonIndex = arrayOfButtons.indexOf(currentIndex);
            
            if (direction === 'previous') {
                if (buttonIndex === 0) {
                    buttonIndex = arrayOfButtons.length - 1;
                } else {
                    buttonIndex = buttonIndex - 1;
                }
            }

            if (direction === 'next') {
                if (buttonIndex === arrayOfButtons.length - 1) {
                    buttonIndex = 0;
                } else {
                    buttonIndex = buttonIndex + 1;
                }
            }

            return buttonIndex;
        };

        /* find category of currentIndex */
        let buttonValues = [];
        switch (currentCategory) {
            case 'naruto':
                buttonValues = [1, 2, 3, 28, 29, 30, 31];
                break;
            case 'one piece':
                buttonValues = [32, 33, 34, 35, 36, 37, 38];
                break;
            case 'dbz':
                buttonValues = [13, 14, 15, 16, 24, 25, 26];
                break;
            case 'misc':
                buttonValues = [4, 5, 6, 7, 8, 9, 10, 11, 12, 27];
                break;
            case 'sports':
                buttonValues = [17, 18, 19, 20, 21, 22, 23];
                break;
        }

        const newIndex = calculateIndex(buttonValues, direction);
        setCurrentIndex(newIndex); // set new index
        localStorage.setItem('currentIndex', newIndex);
        setCurrentsrc(images[newIndex]); // new src based on index
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
                const currentCategoryExists = localStorage.getItem('currentCategory');
                if (currentIndexExists) {
                    setCurrentIndex(currentIndexExists);
                    setCurrentCategory(currentCategoryExists);
                } else {
                    localStorage.setItem('currentIndex', 1);
                    localStorage.setItem('currentCategory', 'naruto');
                }

                setCurrentsrc(imageURL[currentIndexExists]);
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
    const narutoButtons = [1, 2, 3, 28, 29, 30, 31];
    const onepieceButtons = [32, 33, 34, 35, 36, 37, 38];
    const dbzButtons = [13, 14, 15, 16, 24, 25, 26];
    const miscButtons = [4, 5, 6, 7, 8, 9, 10, 11, 12, 27];
    const sportsButtons = [17, 18, 19, 20, 21, 22, 23];
    
    return (
        <div className='image-container'>
            
            <span>
                <h2>One Piece:&nbsp;&nbsp;&nbsp;&nbsp;{onepieceButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label, 'one piece')}>
                        {index+1}
                    </button>
                ))} </h2>

                <h2>Dragonball:&nbsp;&nbsp;{dbzButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label, 'dbz')}>
                        {index+1}
                    </button>
                ))} </h2>

                <h2>Naruto:&nbsp;&nbsp;{narutoButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label, 'naruto')}>
                        {index+1}
                    </button>
                ))} </h2>

                <h2>Sports:&nbsp;&nbsp;{sportsButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label, 'sports')}>
                        {index+1}
                    </button>
                ))} </h2>

                <h2>Random:&nbsp;&nbsp;{miscButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label, 'misc')}>
                        {index+1}
                    </button>
                ))} </h2>                

                <br/>
            </span>

            {loading ? (
                <h2>Images are loading from the server...</h2>
            ) : (
                <img id="myImage" alt={currentsrc} src={currentsrc}/>
            )}

             <span>
                <br/>
                <button onClick={() => prevNextImageSelection('previous')}>Prev Image</button>
                <button onClick={() => prevNextImageSelection('next')}>Next Image</button>
                <br/>
            </span>

            <PostNew currentIndex={currentIndex} handleTokenExists={handleTokenExists}/>
            <CaptionForm tokenExists={tokenExists} handleTokenExists={handleTokenExists} currentIndex={currentIndex}/>
        </div>
    );
}

export default Image;