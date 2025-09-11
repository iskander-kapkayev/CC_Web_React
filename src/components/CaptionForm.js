/* caption form for handling known user captions */

import React, { useState, useEffect } from 'react';

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

    /* show/unshow caption form */
    function handleClick() {
        (showCaptionForm) ? setShowCaptionForm(false) : setShowCaptionForm(true);
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

        try {
            // change this to match the function to update captions
            if (await signUpRegister(username, email, password)) {
                setSuccess(true); // submission was successful!

            } else {
                throw new Error('Registration submission failed');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            {showCaptionForm ?
                <h2 onClick={() => handleClick()}>Click on me to leave a caption</h2>
                :
                <form id="nothing" onSubmit={submitNewCaption}>
                    <input type="text" id="text" value={text} placeholder="type your caption here..." onChange={handleText} required/>
                    <button type="submit" value="SUBMIT">SUBMIT</button>
                </form>
            }
        </div>
    );
}

export default CaptionForm;