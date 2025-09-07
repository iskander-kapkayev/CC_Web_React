/* this component will render each row of captions independently */

import React from 'react';

function CaptionRow({ captionId, caption, userVotes, sessionUser, currentIndex, handleUserVote, handleDeletion }) {
  return (
    <div className="post">
      <span id="captuser">
        <span id="postCaption">{caption.captiontext} </span>
        <span id="postUser">
          - {caption.username} #{caption.category}
        </span>
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
          <a onClick={() => handleUserVote("downvote", caption.captiontext, caption.username, currentIndex)}>
            <i
              id={
                captionId in userVotes
                  ? userVotes[captionId].type === "downvote"
                    ? "downhighlight"
                    : "downvoteheart"
                  : "downvoteheart"
              }
              className="material-symbols-outlined"
            >
              remove
            </i>
          </a>
        </span>
        <span className="votenum">{caption.votecount}</span>
        <span className="heart">
          <a onClick={() => handleUserVote("upvote", caption.captiontext, caption.username, currentIndex)}>
            <i
              id={
                captionId in userVotes
                  ? userVotes[captionId].type === "upvote"
                    ? "uphighlight"
                    : "upvoteheart"
                  : "upvoteheart"
              }
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