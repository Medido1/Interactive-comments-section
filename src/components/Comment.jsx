import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";

function Comment({data}) {
  const {user, createdAt, content, score} = data

  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <div className="flex gap-4 items-center">
        <img
          className="h-10"
          src={user.image.webp} alt="avatar"
        />
        <p className="font-bold">{user.username}</p>
        <p>{createdAt}</p>
      </div>
      <p className="text-gray-500 my-4">
        {content}
      </p>
      <div>
        <div className="flex justify-between p-2 items-center gap-2 w-[30%] rounded-md
          bg-gray-100">
          <button className="cursor-pointer">
            <img src={iconPlus} alt="icon plus" />
          </button>
          <p className="text-blue-600 text-lg font-bold">{score}</p>
          <button className="cursor-pointer">
            <img src={iconMinus} alt="icon minus" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Comment;