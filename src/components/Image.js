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
    
    /* to handle menu categories */
    const [menuCategory, setMenuCategory] = useState(''); // for menu handling
    const [menuCategoryButtons, setMenuCategoryButtons] = useState([]); // for menu handling

    // destructure from props
    const { tokenExists } = props;
    const { handleTokenExists } = props;

    /* image button cycles for the different categories */
    const narutoButtons = [1, 2, 3, 28, 29, 30, 31];
    const onepieceButtons = [32, 33, 34, 35, 36, 37, 38];
    const dbzButtons = [13, 14, 15, 16, 24, 25, 26];
    const miscButtons = [4, 5, 6, 7, 8, 9, 10, 11, 12, 27];
    const sportsButtons = [17, 18, 19, 20, 21, 22, 23];

    function handleImageSelection(newIndex, category) {
        setCurrentIndex(newIndex); // set new index
        setCurrentCategory(category); // set new category
        localStorage.setItem('currentIndex', newIndex); // store locally
        localStorage.setItem('currentCategory', category); // store locally
        setCurrentsrc(images[newIndex]); // new src based on index
    }

    function handleMenuCategory(category, categoryButtons) {
        setMenuCategory(category);
        setMenuCategoryButtons(categoryButtons);
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

            return arrayOfButtons[buttonIndex];
        };

        /* find category of currentIndex */
       
        const newIndex = calculateIndex(menuCategoryButtons, direction);
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
                    setMenuCategory(currentCategoryExists);
                    
                    switch (currentCategoryExists) {
                        case 'naruto':
                            setMenuCategoryButtons(narutoButtons);
                            break;
                        case 'one piece':
                            setMenuCategoryButtons(onepieceButtons);
                            break;
                        case 'dbz':
                            setMenuCategoryButtons(dbzButtons);
                            break;
                        case 'misc':
                            setMenuCategoryButtons(miscButtons);
                            break;
                        case 'sports':
                            setMenuCategoryButtons(sportsButtons);
                            break;
                    }

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

    function menuMaker(category, categoryButtons) {

        return (
            <div>
                <h2>
                    {categoryButtons.map((label, index) => (
                        <span className="number-button-span">
                            <button key={index} onClick={() => handleImageSelection(label, category)}>
                                {index + 1}
                            </button> &nbsp;
                        </span>
                    ))}
                </h2>
            </div>
        );

    }

    return (
        <div className='image-container'>
            
            <h2 className='centered-menu'>
                <span 
                    onClick={() => handleMenuCategory('misc', miscButtons)}
                    className={menuCategory === 'misc' ? 'active' : ''}
                >
                    Random
                </span>&nbsp;&nbsp;&nbsp;&nbsp;

                <span 
                    onClick={() => handleMenuCategory('one piece', onepieceButtons)}
                    className={menuCategory === 'one piece' ? 'active' : ''}
                >
                    One Piece
                </span>&nbsp;&nbsp;&nbsp;&nbsp;

                <span 
                    onClick={() => handleMenuCategory('dbz', dbzButtons)}
                    className={menuCategory === 'dbz' ? 'active' : ''}
                >
                    Dragonball
                </span>&nbsp;&nbsp;&nbsp;&nbsp;

                <span 
                    onClick={() => handleMenuCategory('naruto', narutoButtons)}
                    className={menuCategory === 'naruto' ? 'active' : ''}
                >
                    Naruto
                </span>&nbsp;&nbsp;&nbsp;&nbsp;

                <span
                    onClick={() => handleMenuCategory('sports', sportsButtons)}
                    className={menuCategory === 'sports' ? 'active' : ''}
                >
                    Sports
                </span>&nbsp;&nbsp;&nbsp;&nbsp;
                
                <br/>
            </h2>

            <h2 className='centered-menu'>
                {menuMaker(menuCategory, menuCategoryButtons)}
                <br/>
            </h2>

            {loading ? (
                <h2>Images are loading from the server...</h2>
            ) : (
                <img id="myImage" alt={currentsrc} src={currentsrc}/>
            )}

             <span>
                <br/>
                <button onClick={() => prevNextImageSelection('previous')}>Prev Image</button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => prevNextImageSelection('next')}>Next Image</button>
                <br/>
            </span>

            <PostNew currentIndex={currentIndex} handleTokenExists={handleTokenExists}/>
            <CaptionForm tokenExists={tokenExists} handleTokenExists={handleTokenExists} currentIndex={currentIndex}/>
        </div>
    );
}

export default Image;