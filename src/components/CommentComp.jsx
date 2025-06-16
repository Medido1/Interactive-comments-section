import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function CommentComp({ comment }) {
  const { user, createdAt, content, score, replies, id } = comment;
  const { currentUser } = useContext(GlobalContext);
  return (
    <div className="bg-gray-100 relative">
      <div className="bg-white p-4 rounded-lg mb-4 ">
        <div className="flex gap-4 items-center">
          <img 
            className="h-10"
            src={user.image.webp} alt={`${user.username} avatar`} />
        </div>
      </div>
    </div>
  );
}

export default CommentComp;
