import { GlobalContext } from "../context/GlobalContext";
import { useContext, useEffect } from "react";

function CommentComp({ comment }) {
  const { user, createdAt, content, score, replies, id } = comment;
  const { currentUser } = useContext(GlobalContext);
  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <div className="bg-gray-100 relative">
      <div className="bg-white p-4 rounded-lg mb-4 ">
        <div className="flex gap-4 items-center">
          <img 
            className="h-10"
            src={user.image.webp} alt={`${user.username} avatar`} 
          />
          <p className="font-bold">{user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentComp;
