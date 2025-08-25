/* this component will handle the Leaderboard display */

import React, { useState, useEffect} from 'react';
import { servURL } from './FetchURL.js';

function Leaderboard() {
    const [error, setError] = useState(null); // set null error
    const [loading, setLoading] = useState(null); // set loading to null
    const [leaders, setLeaders] = useState([]); // set empty leaderboard
    /* const [retry, setRetry] = useState(0); */

    // try to grab the leaderboard
    // if there's a server grab error, try again
    
    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                setLoading(true);
                const URL = `${servURL}/leaderboard`;
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const leaderData = await response.json();
                const leaderDataArray = Object.values(leaderData).map(value => value); // array of the values

                setLeaders(leaderDataArray);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
                /* setRetry(prev => prev + 1); */
            }
        };

        getLeaderboard();

    }, []);

    console.log(leaders);

    if (loading) {
        return (
            <div className="aboutmecontainer">

                <h2>Leaderboard:</h2>
                <p>Leaderboard is currently loading...</p>

            </div>
        );
    } 
    
    return (
        <div className="aboutmecontainer">

            <h2>Leaderboard:</h2>

                <table id="leaderdisplay" style={{ width: "75%" }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Aura</th>
                            <th>Power Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map( user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.votecount}</td>
                            <td>{user.category}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default Leaderboard;