/* caption form for handling known user captions */

import React, { useState } from 'react';
import { servURL } from './FetchURL.js';

function CaptionForm(props) {
    const [showCaptionForm, setShowCaptionForm] = useState(false); // do not auto show caption form
    const [text, setText] = useState(''); // empty text to start
    const [error, setError] = useState(null); // set null error
    const [loading, setLoading] = useState(false); // set loading to false
    const [success, setSuccess] = useState(null); // changes on submission

    // destructure props from image
    // checks user status and updates if necessary
    const { tokenExists } = props;
    const { handleTokenExists } = props;
    const { currentIndex } = props;

    /* show/unshow caption form */
    function handleClick() {
        if (tokenExists) {
            (showCaptionForm) ? setShowCaptionForm(false) : setShowCaptionForm(true);
        }
    }

    /* shows change in caption as user types */
    function handleText(e) {
        setText(e.target.value);
    }

    // submit caption to be added to image block
    const submitNewCaption = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // check for token
        const sessionToken = sessionStorage.getItem('usertoken');
        const sessionUsername = sessionStorage.getItem('username');
        if (!sessionToken || !sessionUsername) return null;

        // set up url and body for post request
        const URL = `${servURL}/addnewcaption`;
        const body = {
            captiontext: text, 
            imageid: currentIndex,
            sessionUsername: sessionUsername
        }; // body data 

        try {   
            
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // set body format to json
                    'Authorization': `Bearer ${sessionToken}` // send authorization token
                },
                body: JSON.stringify(body)  // stringifies the data to send in the body
            });

            if (!response.ok) {
                /* if response fails, likely because token has expired */
                /* destroy session tokens */
                handleTokenExists(false);
                setSessionUser('');
                throw new Error('Token has expired or does not exist');
            }

            const addedCaption = await response.json(); // this isn't really necessary anyway
            setText(''); // empty text string
            setShowCaptionForm(false); // remove caption form
            setSuccess(true);
            window.location.reload(); // refresh entire page to reset colors
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="caption-form">
            {tokenExists ?
                !showCaptionForm ?
                    <h2 id="caption-form-link" onClick={() => handleClick()}>Click on me to leave a caption</h2>
                    :
                    <div id="caption-form-box-border">
                        <h2>Type in your caption below:</h2>
                        <form onSubmit={submitNewCaption}>
                            <input type="text" id="text" value={text} placeholder="make me laugh..." onChange={handleText} required/>
                            <button type="submit" value="SUBMIT">SUBMIT</button>
                        </form>
                    </div>
                :
                <h2>Please create an account to leave a caption!</h2>
            }      
        </div>
    );
}

export default CaptionForm;