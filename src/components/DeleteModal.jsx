import { useContext } from "react";
import {GlobalContext} from "../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";

function DeleteModal({setShowDeleteModal, id}) {
  const {data, setData} = useContext(GlobalContext);

  function confirmDelete(id) {
    setShowDeleteModal(false);

    function deleteComment(comments, id) {
      return comments.map(comment => {
        if (comment.id === id) {
          return null;
        }
        if (comment.replies) {
          const updatedReplies = deleteComment(comment.replies, id);
          return {...comment, replies: updatedReplies}
        }
        return comment
      })
      .filter(Boolean)
    }

    const updatedComments = deleteComment(data.comments, id)
    setData(prev => ({...prev, comments: updatedComments}))
  }

  return (
    <AnimatePresence>
      <motion.div className="p-4 bg-white rounded-lg"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ duration: 0.4 }}
        >
        <h2 className="text-lg font-bold">
          Delete comment
        </h2>
        <p className="text-gray-400">
          Are you sure you want to delete this comment ? this will remove the comment
          and can't be undone.
        </p>
        <motion.div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="py-2 px-6 bg-gray-600 text-white rounded-md cursor-pointer">
            NO, CANCEL
          </button>
          <button
            onClick={() =>confirmDelete(id)}
            className="py-2 px-6 bg-red-400 text-white rounded-md cursor-pointer">
            YES, DELETE
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DeleteModal;