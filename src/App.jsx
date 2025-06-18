import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import CommentComp from "./components/CommentComp";
import CommentForm from "./components/CommentForm";

function App() {
  const { data } = useContext(GlobalContext);
  const sortedComments = [...data.comments].sort((a, b) => b.score - a.score)
  return (
    <main className="bg-gray-100 min-h-screen px-4 py-6">
      <div>
        {sortedComments.map(comment => (
          <CommentComp 
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
      <CommentForm />
    </main>
  );
}

export default App;
