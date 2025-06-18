import { useState, useContext, useEffect } from "react";
import userAvatar from "/avatars/image-juliusomo.png"
import {GlobalContext} from "../context/GlobalContext";
import { getNextId } from "./utility";

function CommentForm() {
  const [commentText, setCommentText] = useState("");
  const {data, setData} = useContext(GlobalContext)

  function submitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Write something damn it!!")
      return;
    }

    const newComment = {
      id: getNextId(data),
      content : commentText,
      createdAt: new Date().toISOString(), // use time stamp
      score: 0,
      user: {
        "image": { 
          "png": "/avatars/image-juliusomo.png",
          "webp": "/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      replies: []
    }

    const updatedComments = [...data.comments, newComment];
    setData(prev => ({...prev, comments: updatedComments}))
    setCommentText("")
  }
  return (
    <form 
      onSubmit={submitComment}
      className="bg-white p-4 max-w-[1000px] relative">
      <label htmlFor="commentText" className="sr-only">Add a comment</label>
      <textarea 
        className="border-gray-200 border p-4 rounded-lg mb-4 md:w-[80%] md:ml-20" 
        name="commentText" id="commentText"
        rows="3"
        cols="30"
        placeholder="Add a comment..."
        value = {commentText}
        onChange={(e) => setCommentText(e.target.value)}
        aria-label="Add a comment"
      ></textarea>
      <div className="flex justify-between items-center">
        <img 
          className="h-8 md:absolute md:top-6 md:h-12"
          src={userAvatar} alt="user avatar" 
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-blue-800 hover:bg-blue-400 text-white rounded-lg 
            font-bold cursor-pointer md:absolute md:top-4 md:right-4">
          Send
        </button>
      </div>
    </form>
  )
}

export default CommentForm;