import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function EditForm({commentText, setShowEditForm}) {
  const [commentContent, setCommentContent] = useState(commentText)
  const {setDisabledButtons } = useContext(GlobalContext);

  function cancelEdit() {
    setShowEditForm(false)
    setDisabledButtons(false)
  }
  return (
    <form className="flex flex-col">
      <label htmlFor="commentText" className="sr-only">Edit comment</label>
      <textarea 
        className="border-gray-200 border p-4 rounded-lg my-4 max-w-[100%]"
        name="commentText" id="CommentText"
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
        <button className="bg-red-200 px-2 rounded-lg cursor-pointer
          hover:bg-red-400 font-bold">
          Save
        </button>
      </div>
    </form>
  )
}

export default EditForm;