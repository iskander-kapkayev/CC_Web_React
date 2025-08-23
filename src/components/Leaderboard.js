/* this component will handle the Leaderboard display */

import React, { useState, useEffect} from 'react';
import { servURL } from './FetchURL.js';

function Leaderboard() {
    const [error, setError] = useState(''); // set null error
    const [loading, setLoading] = useState(null); // set loading to null
    const [leaders, setLeaders] = useState(''); // set empty leaderboard
    const [retry, setRetry] = useState(0);

    // try to grab the leaderboard
    // if there's a server grab error, try again
    useEffect(() => {
        const getleaderboard = async () => {
            try {
                setLoading(true);
                const URL = `${servURL}/leaderboard`;
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const leaderData = await response.json();
                setLeaders(leaderData);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
                setRetry(prev => prev + 1);
            }
        };

        getleaderboard();
    }, [retry]); // dependency on retry

    console.log(leaders);

    if (loading) {
        return (
            <div>
                <div className="aboutmecontainer">

                    <h2>Leaderboard:</h2>
                    <p>Leaderboard is currently loading...</p>

                </div>
            </div>
        );
    } else {
        console.log('inside of else');
        return (
            <div>
                <div className="aboutmecontainer">

                    <h2>Leaderboard:</h2>

                        {/* <table id="leaderdisplay" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Aura</th>
                                    <th>Power Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(leaders).map(([key,[username, votecount, category]]) => (
                                <tr key={key}>
                                    <td>{username}</td>
                                    <td>{votecount}</td>
                                    <td>{category}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table> */}
        
                </div>
            </div>
        );
    }
}

export default Leaderboard;