/* this component will render each row of captions independently */

import React, { useState, useEffect } from 'react';

function CaptionRowNew({ 
    captionId, captionText, captionUsername, 
    captionVoteCount, captionCategory, initialUserVote, sessionUser, 
    currentIndex, handleUserVote, handleDeletion }) {
  
    const [userVote, setUserVote] = useState(initialUserVote ?? null); // user may not have voted
    /* set initial state from caption */
    const [text, setText] = useState(captionText); 
    const [username, setUsername] = useState(captionUsername);
    const [voteCount, setVoteCount] = useState(captionVoteCount);
    const [category, setCategory] = useState(captionCategory);

    // keep local vote state in sync if parent sends updated props
    useEffect(() => {
        setUserVote(initialUserVote || null);
        setVoteCount(captionVoteCount);
    }, [initialUserVote, captionVoteCount]);

    const handleVote = async (voteType) => {
        const result = await handleUserVote(voteType, text, username, currentIndex, captionId);
        
        if (result) {
            // backend tells us the new state
            setVoteCount(result.newVoteCount);
            setUserVote(result.newUserVote);
        } else {
            // fallback optimistic update
            // but should only be if user is logged in
            if (sessionUser) {
                setUserVote(voteType);
                setVoteCount(voteCount => voteType === 'upvote' ? voteCount + 1 : voteCount - 1);
            }
        }
    };
  
    return (
        <div className="post">
            <span id="captuser">
                <span id="postCaption">{text} </span>
                <span id="postUser"> - {username} #{category} </span>
                {username === sessionUser && (
                <span className="deletion">
                    <a onClick={() => handleDeletion(text, currentIndex)}>
                        <i id="deleteicon" className="material-symbols-outlined">delete</i>
                    </a>
                </span>
                )}
            </span>

            <div id="postUpvotes">
                <span className="heart">
                    <a onClick={sessionUser ? () => handleVote("downvote") : undefined}>
                        <i
                            id={ sessionUser ? userVote === "downvote" ? "downhighlight" : "downvoteheart" }
                            className="material-symbols-outlined"
                        >
                            remove
                        </i>
                    </a>
                </span>
                <span className="votenum">{voteCount}</span>
                <span className="heart">
                    <a onClick={sessionUser ? () => handleVote("upvote") : undefined}>
                        <i
                            id={ sessionUser ? userVote === "upvote" ? "uphighlight" : "upvoteheart" }
                            className="material-symbols-outlined"
                        >
                            add
                        </i>
                    </a>
                </span>
            </div>
        </div>
    );
}

export default React.memo(CaptionRowNew);