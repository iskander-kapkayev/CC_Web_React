/* caption form for handling user inputs */

import React from 'react';

function CaptionForm(props) {
    return (

        <div className="form-container" id="captionform">
            <h3>Can you make us laugh?</h3> 
            <form id="captionFormData">
                <input type="caption" id="caption" name="caption" placeholder="Type your caption here..." required> </input>
                <button type="submit" value="Submit">Add Cap</button>
            </form>
        </div>
        
    );
}

export default CaptionForm;