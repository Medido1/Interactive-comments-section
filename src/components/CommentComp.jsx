//icons imports 
import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";

import { GlobalContext } from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";

function CommentComp({ comment }) {
  const { user, createdAt, content, score, replies, id } = comment;
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
          <p className="text-gray-500">{createdAt}</p>
        </div>
        <div className="flex justify-between">
          <div  
            className="flex justify-between p-2 items-center gap-2 w-[30%] rounded-md
            bg-gray-100 mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default CommentComp;
