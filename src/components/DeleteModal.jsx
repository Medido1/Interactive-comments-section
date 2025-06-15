import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";

function DeleteModal({setShowModal, id}) {
  const {data, setData} = useContext(GlobalContext);

  function confirmDelete(id) {
    setShowModal(false);

    const isComment = data.comments.some(comment => comment.id === id);

    if (isComment) {
      const updatedComments = data.comments.filter(comment => comment.id !== id);
      setData(prev => ({...prev, comments: updatedComments}))
      return;
    }

    // if its a reply
    const updatedComments = data.comments.map(comment => {
      if (comment.replies) {
        const filteredReplies = comment.replies.filter(reply => reply.id !== id);
        return {...comment, replies: filteredReplies}
      }
      return comment
    })

    setData(prev => ({...prev, comments: updatedComments}))
  }

  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-lg font-bold">
        Delete comment
      </h2>
      <p className="text-gray-400">
        Are you sure you want to delete this comment ? this will remove the comment
        and can't be undone.
      </p>
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => setShowModal(false)}
          className="py-2 px-6 bg-gray-600 text-white rounded-md cursor-pointer">
          NO, CANCEL
        </button>
        <button 
          onClick={() =>confirmDelete(id)}
          className="py-2 px-6 bg-red-400 text-white rounded-md cursor-pointer">
          YES, DELETE
        </button>
      </div>
    </div>
  )
}

export default DeleteModal;