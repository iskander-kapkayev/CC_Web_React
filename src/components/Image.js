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
    const [images, setImages] = useState({}); // will grab from server every time
    const [currentIndex, setCurrentIndex] = useState(1); // set original state to 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentsrc, setCurrentsrc] = useState(`public/assets/images/guy_kakashi.gif`); // will default to first image
    
    // destructure from props
    const { tokenExists } = props;
    const { handleTokenExists } = props;

    function handleImageSelection(newIndex) {
        setCurrentIndex(newIndex); // set new index
        localStorage.setItem('currentIndex', newIndex); // store locally
        setCurrentsrc(images[newIndex]); // new src based on index
    }

    function previousImageSelection() {
        let newIndex = currentIndex - 1;
        if (newIndex < 1) {
            newIndex = 20; // reset back to 20
        }

        setCurrentIndex(newIndex); // set new index
        localStorage.setItem('currentIndex', newIndex);
        setCurrentsrc(images[newIndex]); // new src based on index
    }

    function nextImageSelection() {
        let newIndex = currentIndex + 1;
        if (newIndex > 20) {
            newIndex = 1; // reset back to 20
        }

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
                if (currentIndexExists) {
                    setCurrentIndex(currentIndexExists);
                } else {
                    localStorage.setItem('currentIndex', 1);
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
    const imageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const narutoButtons = [1, 2, 3];
    const onepieceButtons = [];
    const dbzButtons = [13, 14, 15, 16];
    const miscButtons = [4, 5, 6, 7, 8, 9, 10, 11, 12];
    const basketballButtons = [17, 18, 19, 20, 21, 22, 23];


    return (
        <div className='image-container'>
            
            <span>
                {imageButtons.map((label, index) => (
                    <button key={index} onClick={() => handleImageSelection(label)}>
                        {label}
                    </button>
                ))}
                <br/>
                <br/>
            </span>

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

            <PostNew currentIndex={currentIndex} handleTokenExists={handleTokenExists}/>
            <CaptionForm tokenExists={tokenExists} handleTokenExists={handleTokenExists} currentIndex={currentIndex}/>
        </div>
    );
}

export default Image;