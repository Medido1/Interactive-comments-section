import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import {useState, useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";

function Comment({comment, isReply}) {
  const {data, setData} = useContext(GlobalContext)
  const {user, createdAt, content, score, replies, id} = comment;
  const [currentScore, setCurrentScore] = useState(score);
  const originalScore = score;
  const currentUser =  "juliusomo";

  function incrementScore() {
    if (currentScore > originalScore) return;
    setCurrentScore(prev => prev + 1);
  }

  function decrementScore() {
    if (currentScore < originalScore) return;
    setCurrentScore(prev => prev - 1)
  }
  
  function deleteComment(id) {
    const isComment = data.comments.some(comment => comment.id === id);

    if (isComment) {
      const updatedComments = data.comments.filter(comment => comment.id !== id);
      setData(prev => ({...prev, comments: updatedComments}))
      return;
    }

    // if its a reply
    const updatedComments = data.comments.map(comment => {
      if (comment.replies) {
        const filtredReplies = comment.replies.filter(reply => reply.id !== id);
        return {...comment, replies: filtredReplies}
      }
      return comment
    })

    setData(prev => ({...prev, comments: updatedComments}))
  }

  return (
    <div className="bg-gray-100">
      <div className="bg-white p-4 rounded-lg mb-4">
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
      <ul className="pl-4 shadow-lg">
        {replies && replies.map(reply => (
          <Comment 
            key={reply.id}
            comment={reply}
            isReply={true}
          />
        ))}
      </ul>
    </div>
  )
}

export default Comment;