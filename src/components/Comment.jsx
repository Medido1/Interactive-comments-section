import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import {useState, useContext } from "react";
import DeleteModal from "./DeleteModal";
import { AnimatePresence } from 'framer-motion';

function Comment({comment, isReply}) {
  const {user, createdAt, content, score, replies, id} = comment;
  const [currentScore, setCurrentScore] = useState(score);
  const originalScore = score;
  const currentUser =  "juliusomo";

  /* show modal */
  const [showModal, setShowModal] = useState(false); 
  const [currentId, setCurrentId] = useState("");

  function incrementScore() {
    if (currentScore > originalScore) return;
    setCurrentScore(prev => prev + 1);
  }

  function decrementScore() {
    if (currentScore < originalScore) return;
    setCurrentScore(prev => prev - 1)
  }
  
  function deleteComment(id) {
    setShowModal(true);
    setCurrentId(id)
  }

  return (
    <div className="bg-gray-100">
      <div className="bg-white p-4 rounded-lg mb-4 relative">
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
          <p>{createdAt}</p>
        </div>
        <p className="text-gray-500 my-4">
          <span className="inline-block text-blue-700 font-bold mr-2">
            {isReply ? `@${user.username}` : ""}
          </span> 
            {content}
        </p>
        <div className="flex justify-between">
          <div className="flex justify-between p-2 items-center gap-2 w-[30%] rounded-md
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
            <div
              className="flex items-center gap-2 text-blue-700 font-bold text-lg
                cursor-pointer">
              <img src={iconReply} alt="reply icon" />
              <p>Reply</p>
            </div>
          }
          {user.username === currentUser &&
            <div className="flex gap-4">
              <button 
                onClick={() => deleteComment(id)}
                className="flex items-center gap-2 cursor-pointer">
                <img src={deleteIcon} alt="delete icon" />
                <p className="text-red-400 font-bold text-lg">Delete</p>
              </button>
              <button className="flex items-center gap-2 cursor-pointer">
                <img src={editIcon} alt="edit icon" />
                <p className="text-blue-700 font-bold text-lg">Edit</p>
              </button>
            </div>
          }
        </div>
      </div>
      <ul className="pl-4 shadow-lg relative">
        {replies && replies.map(reply => (
          <Comment 
            key={reply.id}
            comment={reply}
            isReply={true}
          />
        ))}
      </ul>
      {showModal && 
        <div>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div className="absolute top-[20%] z-40">
            <DeleteModal 
              setShowModal = {setShowModal}
              id = {currentId}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default Comment;