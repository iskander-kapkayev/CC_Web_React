/* this component will handle the About Me display */

import React from 'react';

function AboutMe() {
    return (
        <div>
            <div className="aboutmecontainer">

                <h2>About Me:</h2>

                <p id="aboutmetext">
                    This is a free to use caption contest!<br/>
                    Feel free to share the link with others.<br/><br/>
                    In order to participate:<br/>
                </p>
                
                <ol>
                    <li>Register and make an account.</li>
                    <li>Leave a caption on any image.</li>
                    <li>Vote for your favorite captions!</li>
                    <li><strong>Try to get the most likes!</strong></li>
                </ol>

                <p>**All images are borrowed!**</p>
            </div>
            
            <div className="contactcontainer">

                <p>
                    In order to contact me, you can email me at:<br/>
                    iskander.kapkayev@gmail.com
                </p>
            
            </div>
        </div>
    );
}

export default AboutMe;