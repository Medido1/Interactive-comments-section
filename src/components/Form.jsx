import userAvatar from "/avatars/image-juliusomo.png";

function Form(){
  return (
    <form className="bg-white p-4">
      <label htmlFor="comment" className="sr-only">Add a comment</label>
      <textarea 
        className="border-gray-200 border-1 p-4 rouded-lg mb-4" 
        name="comment" id="comment"
        rows="3"
        cols="30"
        placeholder="Add a comment..."
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