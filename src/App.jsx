import "./App.css";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import CommentComp from "./components/CommentComp";
import CommentForm from "./components/CommentForm";

function App() {
  const { data } = useContext(GlobalContext);
  return (
    <main className="bg-gray-100 min-h-screen px-4 py-6">
      <ul>
        {data.comments?.map(comment => (
          <CommentComp 
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
      <CommentForm />
    </main>
  );
}

export default App;
