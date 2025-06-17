import { useState } from "react";
import userAvatar from "/avatars/image-juliusomo.webp"

function ReplyForm() {
  const [commentText, setCommentText] = useState("");
  return (
    <form className="bg-white p-4">
      <label htmlFor="commentText" className="sr-only">Add a comment</label>
      <textarea 
        className="border-gray-200 border p-4 rounded-lg mb-4" 
        name="commentText" id="commentText"
        rows="3"
        cols="30"
        placeholder="Add a comment..."
        value = {commentText}
        onChange={(e) => setComment(e.target.value)}
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