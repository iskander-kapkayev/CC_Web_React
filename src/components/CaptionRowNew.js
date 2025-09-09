/* this component will render each row of captions independently */

import React from 'react';

function CaptionRow({ 
    captionId, caption, 
    initialUserVote, sessionUser, 
    currentIndex, handleUserVote, 
    handleDeletion }) {
  
    const [userVote, setUserVote] = useState(initialUserVote || null);
    const [voteCount, setVoteCount] = useState(caption.votecount);

    // keep local vote state in sync if parent sends updated props
    useEffect(() => {
        setUserVote(initialUserVote || null);
        setVoteCount(caption.votecount);
    }, [initialUserVote, caption.votecount]);

    const handleVote = async (voteType) => {
        const result = await handleUserVote(voteType, caption.captiontext, caption.username, currentIndex);
        
        if (result) {
            // backend tells us the new state
            setVoteCount(result.newVoteCount);
            setUserVote(result.newUserVote);
        } else {
        // fallback optimistic update
            setUserVote(voteType);
            setVoteCount(prev => voteType === 'upvote' ? prev + 1 : prev - 1);
        }
    };
  
    return (
        <div className="post">
            <span id="captuser">
                <span id="postCaption">{caption.captiontext} </span>
                <span id="postUser"> - {caption.username} #{caption.category} </span>
                {caption.username === sessionUser && (
                <span className="deletion">
                    <a onClick={() => handleDeletion(caption.captiontext, currentIndex)}>
                    <i id="deleteicon" className="material-symbols-outlined">delete</i>
                    </a>
                </span>
                )}
            </span>

            <div id="postUpvotes">
                <span className="heart">
                    <a onClick={() => handleVote("downvote")}>
                        <i
                            id={ userVote.type === "downvote" ? "downhighlight" : "downvoteheart" }
                            className="material-symbols-outlined"
                        >
                        remove
                        </i>
                    </a>
                </span>
                <span className="votenum">{caption.votecount}</span>
                <span className="heart">
                    <a onClick={() => handleVote("upvote")}>
                        <i
                            id={ userVote.type === "upvote" ? "uphighlight" : "upvoteheart" }
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

export default React.memo(CaptionRow);