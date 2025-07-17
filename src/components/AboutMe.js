/* this component will handle the About Me display */

import React from 'react';

function AboutMe() {
    return (
        <div>
            <div className="aboutmecontainer">

                <h2>About Me:</h2>

                <p id="aboutmetext">
                    This is a free to use caption contest!<br/>
                    Feel free to enjoy it and share the link with others.<br/>
                    In order to participate, you will need to register an account.<br/>
                    After you register, you can vote and leave your own caption.<br/>
                    <strong>Try to get the most likes for your caption!</strong><br/><br/>
                    
                    All images/gifs are borrowed and are not owned by me.
                </p>
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