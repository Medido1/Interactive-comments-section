import { useState, useContext } from "react";
import userAvatar from "/avatars/image-juliusomo.webp"
import {GlobalContext} from "../context/GlobalContext";

function ReplyForm({id, setShowReplyForm}) {
  const [commentText, setCommentText] = useState("");
  const {data, setData} = useContext(GlobalContext)

  function addReply(comments, id, newReply) {
    return comments.map(comment => {
      if (comment.id === id) {
        // insert reply here
        return {
          ...comment,
          replies : [...(comment.replies || []), newReply]
        }
      }
      if (comment.replies){
        return {
          ...comment,
          replies: addReply(comment.replies, id, newReply)
        }
      }
      return comment;
    })
  }

  function submitReply(e) {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Write something damn it!!")
      return;
    }

    function getNextId(data) { /* get the id of the new reply */
      let lastId = - Infinity;
      
      function traverseComments(comments) {
        for (let comment of comments) {
          if (comment.id > lastId) {
            lastId = comment.id
          }
          if (comment.replies) {
            traverseComments(comment.replies)
          }
        }
      }

      traverseComments(data.comments)
      return lastId + 1;
    }

    function findUserById(comments){ /* find the user being replied to */
      for (let comment of comments){
        if (comment.id === id){
          return comment.user.username
        } else if (comment.replies) {
          const result = findUserById(comment.replies)
          if (result) return result
        }
      }
      return null;
    }

    const replyingToUser = findUserById(data.comments, id)
    const newReply = {
      id: getNextId(data),
      content: commentText,
      createdAt: new Date().toISOString(), //use time stamp
      score: 0,
      replyingTo: replyingToUser,
      user: {
        "image": { 
          "png": "/avatars/image-juliusomo.png",
          "webp": "/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      replies : []
    }
    const updatedComments = addReply(data.comments, id, newReply)
    setData(prev => ({...prev, comments: updatedComments}))
    setCommentText("");
    setShowReplyForm(false);
  }
  
  return (
    <form 
      onSubmit={submitReply}
      className="bg-white p-4">
      <label htmlFor="commentText" className="sr-only">Add a comment</label>
      <textarea 
        className="border-gray-200 border p-4 rounded-lg mb-4" 
        name="commentText" id="commentText"
        rows="3"
        cols="30"
        placeholder="Add a comment..."
        value = {commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center">
        <img 
          className="h-8"
          src={userAvatar} alt="user avatar" 
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-blue-800 text-white rounded-lg 
            font-bold cursor-pointer">
          Reply
        </button>
      </div>
    </form>
  )
}

export default ReplyForm;