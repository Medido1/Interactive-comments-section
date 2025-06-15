import { useState, useContext, useEffect } from "react";
import userAvatar from "/avatars/image-juliusomo.png";
import {GlobalContext} from "../context/GlobalContext";

function Form(){
  const {data, setData} = useContext(GlobalContext)
  const [comment, setComment] = useState("")

  function getNextId(data) {
    let lastId = -Infinity;

    data.comments.forEach(comment => {
      if (comment.id > lastId) {
        lastId = comment.id;
      }

      if (comment.replies) {
        comment.replies.forEach(reply => {
          if (reply.id > lastId) {
            lastId = comment.id;
          }
        })
      }
    })
    return lastId + 1;
  }

  function submitComment(e) {
    e.preventDefault();
    let updatedComments = [];

    if (comment.trim() === ''){
      alert("Comment cannot be empty!!");
      return;
    }
    const newComment = {
      id: getNextId(data),
      content: comment,
      score: 0,
      user : {
        "image": { 
        "png": "/avatars/image-juliusomo.png",
        "webp": "/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      replies: [],
    }
    updatedComments = [...data.comments, newComment]
    setData(prev => ({...prev, comments: updatedComments}));
    setComment("");
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <form 
      onSubmit={submitComment}
      className="bg-white p-4">
      <label htmlFor="comment" className="sr-only">Add a comment</label>
      <textarea 
        className="border-gray-200 border-1 p-4 rouded-lg mb-4" 
        name="comment" id="comment"
        rows="3"
        cols="30"
        placeholder="Add a comment..."
        value = {comment}
        onChange={(e) => setComment(e.target.value)}
        ></textarea>
      <div className="flex justify-between items-center">
        <img 
          className="h-8"
          src={userAvatar} alt="user avatar" 
        />
        <button 
          className="px-6 py-2 bg-blue-800 text-white rounded-lg 
            font-bold cursor-pointer"
          type="submit">
          SEND
        </button>
      </div>
    </form>
  )
}

export default Form;