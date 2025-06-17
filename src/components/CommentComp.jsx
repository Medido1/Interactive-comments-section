//icons imports 
import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";

import { GlobalContext } from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";

function CommentComp({ comment }) {
  const { user, createdAt, content, score, replies, id, replyingTo } = comment;
  const { currentUser } = useContext(GlobalContext);

  // score logic
  const [currentScore, setCurrentScore] = useState(score);
  const originalScore = score

  function incrementScore() {
    if (currentScore > originalScore) return;
    setCurrentScore(prev => prev + 1);
  }

  function decrementScore() {
    if (currentScore < originalScore) return;
    setCurrentScore(prev => prev - 1);
  }
  return (
    <div className="bg-gray-100 relative">
      <div className="bg-white p-4 rounded-lg mb-4 ">
        <div className="flex gap-4 items-center">
          <img 
            className="h-10"
            src={user.image.webp} alt={`${user.username} avatar`} 
          />
          <p className="font-bold">{user.username}</p>
          {user.username === currentUser && 
            <div className="bg-blue-600 rounded-md text-white
              px-2">
              <p>you</p>
            </div>
          }
          <p className="text-gray-500">{createdAt}</p>
        </div>
        <p className="text-gray-500 my-4">
          {replyingTo && 
            <span className="inline-block text-blue-700 font-bold mr-2">
              {replyingTo}
            </span>}
          {content}
        </p>
        <div className="flex justify-between">
          <div  
            className="flex justify-between p-2 items-center gap-2 w-[30%] rounded-md
            bg-gray-100">
            <button
              onClick={incrementScore}
              className="cursor-pointer">
              <img src={iconPlus} alt="icon plus" />
            </button>
            <p className="text-blue-700 text-lg font-bold">{currentScore}</p>
            <button
              onClick={decrementScore}
              className="cursor-pointer">
              <img src={iconMinus} alt="icon minus" />
            </button>
          </div>
          {user.username !== currentUser && 
            <button
              onClick={() => replyToComment(id)}
              type="button"
              className="flex items-center gap-2 text-blue-700 font-bold text-lg
                cursor-pointer">
              <img src={iconReply} alt="reply icon" />
              <p>Reply</p>
            </button>
          }
        </div>
      </div>
      <ul className="pl-4 shadow-lg relative">
        {replies?.map(reply => (
          <CommentComp 
            key={reply.id}
            comment={reply}
          />
        ))}
      </ul>
    </div>
  );
}

export default CommentComp;
