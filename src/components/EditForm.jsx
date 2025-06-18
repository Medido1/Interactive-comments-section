import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function EditForm({commentText, setShowEditForm, id}) {
  const [commentContent, setCommentContent] = useState(commentText)
  const {setDisabledButtons, data, setData } = useContext(GlobalContext);

  function cancelEdit() {
    setShowEditForm(false)
    setDisabledButtons(false)
  }

  function saveEdit(e){
    e.preventDefault();
    if (!commentContent.trim()) {
      alert("Write something damn it!!")
      return;
    }

    function findComment(comments) {
      return comments.map(comment => {
        if (comment.id === id) {
          return {
            ...comment,
            content: commentContent,
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: findComment(comment.replies)
          }
        }
        return comment
      })
    }

    const updatedComments = findComment(data.comments);
    setData(prev => ({...prev, comments: updatedComments}))
    setShowEditForm(false)
    setDisabledButtons(false)
  }
  return (
    <form 
      onSubmit={saveEdit}
      className="flex flex-col">
      <label htmlFor="commentText" className="sr-only">Edit comment</label>
      <textarea 
        className="border-gray-200 border p-4 rounded-lg my-4 max-w-[100%]"
        name="commentText" id="commentText"
        rows="3"
        cols="30"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}></textarea>
      <div className="flex gap-4 self-end">
        <button 
          onClick={cancelEdit}
          type="button"
          className="bg-gray-200 p-2 rounded-lg cursor-pointer
          hover:bg-gray-400 font-bold">
          Cancel
        </button>
        <button 
          type="submit"
          className="bg-red-200 px-2 rounded-lg cursor-pointer
          hover:bg-red-400 font-bold">
          Save
        </button>
      </div>
    </form>
  )
}

export default EditForm;