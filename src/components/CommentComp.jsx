//icons imports 
import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";
import deleteIcon from '../assets/icon-delete.svg';
import editIcon from "../assets/icon-edit.svg";

import { GlobalContext } from "../context/GlobalContext";
import { useContext, useState } from "react";
import DeleteModal from "./DeleteModal";
import ReplyForm from "./replyForm";
import EditForm from "./EditForm";

function CommentComp({ comment }) {
  const { user, createdAt, content, score, replies, id, replyingTo } = comment;
  const { currentUser, disabledButtons, setDisabledButtons,
    data, setData} = useContext(GlobalContext);
  const [currentId, setCurrentId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [originalScore, setOriginalScore] = useState(score);

   /* format time */
   function formatTime(time) {
    const seconds = Math.floor((new Date() - new Date(time)) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }


  //update the score in data
  function updateScore(id, delta) {
    const updatedComments = data.comments.map(comment => {
      if (comment.id === id) {
        return {...comment, score: comment.score + delta}
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            return reply.id === id ? {...reply, score: reply.score + delta} : reply
          })
        }
      }
      return comment
    })
    setData(prev => ({...prev, comments: updatedComments}))
  }

  function incrementScore() {
    if (score > originalScore) return;
    updateScore(id, +1)
  }

  function decrementScore() {
    if (score < originalScore) return;
    updateScore(id, -1)
  }

  function deleteComment(id) {
    setCurrentId(id);
    setShowDeleteModal(true);
  }

  function replyToComment(id) {
    setShowReplyForm(true);
    setCurrentId(id);
  }

  function editComment(id) {
    setShowEditForm(true)
    setCurrentId(id);
    setDisabledButtons(true);
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
          <p className="text-gray-500">{formatTime(createdAt)}</p>
        </div>
        {showEditForm && 
          <EditForm 
            commentText = {content}
            setShowEditForm = {setShowEditForm}
            id = {currentId}
          />
        }
        {!showEditForm && 
          <>
            <p className="text-gray-500 my-4">
              {replyingTo && 
                <span className="inline-block text-blue-700 font-bold mr-2">
                  @{replyingTo}
                </span>}
              {content}
            </p>
            <div className="flex justify-between">
              <div  
                className="flex justify-between p-2 items-center gap-2 w-[30%] rounded-md
              bg-gray-100">
                <button
                  disabled ={disabledButtons}
                  onClick={incrementScore}
                  className="cursor-pointer">
                  <img src={iconPlus} alt="icon plus" />
                </button>
                <p className="text-blue-700 text-lg font-bold">{score}</p>
                <button
                  disabled ={disabledButtons}
                  onClick={decrementScore}
                  className="cursor-pointer">
                  <img src={iconMinus} alt="icon minus" />
                </button>
              </div>
              {user.username !== currentUser && 
                <button
                  disabled ={disabledButtons}
                  onClick={() => replyToComment(id)}
                  type="button"
                  className="flex items-center gap-2 text-blue-700 font-bold text-lg
                    cursor-pointer">
                  <img src={iconReply} alt="reply icon" />
                  <p>Reply</p>
                </button>
              }
              {user.username === currentUser && 
                <div className="flex gap-4">
                  <button 
                    disabled ={disabledButtons}
                    onClick={() => deleteComment(id)}
                    className="flex items-center gap-2 cursor-pointer">
                    <img src={deleteIcon} alt="delete icon" />
                    <p className="text-red-400 font-bold text-lg">Delete</p>
                  </button>
                  <button 
                    disabled = {disabledButtons}
                    onClick={() => editComment(id)}
                    className={`flex items-center gap-2`}>
                      <img src={editIcon} alt="edit icon" />
                      <p className="text-blue-700 font-bold text-lg">Edit</p>
                  </button>
                </div>
              }
            </div>
          </>
        }
      </div>
      {showReplyForm && 
        <div className="mb-4">
          <ReplyForm
            id = {currentId}
            setShowReplyForm = {setShowReplyForm}
          />
        </div>
      }
      <ul className="pl-4 shadow-lg relative">
        {replies?.map(reply => (
          <CommentComp 
            key={reply.id}
            comment={reply}
          />
        ))}
      </ul>
      {showDeleteModal && 
      <div>
        <div className="fixed inset-0 bg-black/25 z-40"></div>
        <div className="absolute top-[20%] z-40">
          <DeleteModal 
            setShowDeleteModal = {setShowDeleteModal}
            id = {currentId}
          />
        </div>
    </div>}
    </div>
  );
}

export default CommentComp;
