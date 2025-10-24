/* this component will handle the About Me display */

import React from 'react';

function AboutMe() {
    return (
        <div>
            <div className="aboutmecontainer">

                <h2>Welcome to Caption Chaos!</h2>

                <p id="aboutmetext">
                    This is a free to play caption contest!<br/>
                    Feel free to share the link with friends.<br/><br/>
                    In order to participate:<br/>
                        1.    Register and make an account.<br/>
                        2.    Leave a caption on any image.<br/>
                        3.    Vote for your favorite captions!<br/>
                        4.    <strong>Try to get the most likes!</strong><br/><br/>
                    **All images are borrowed!**
                </p>
            </div>
            <br/>
            <div className="aboutmecontainer">

                <p>
                    If you need to contact me, you can email me at:<br/>
                    iskander.kapkayev@gmail.com
                </p>
            
            </div>
        </div>
    );
}

export default AboutMe;