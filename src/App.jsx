import "./App.css";
import { useContext, useMemo } from "react";
import { GlobalContext } from "./context/GlobalContext";
import CommentComp from "./components/CommentComp";
import CommentForm from "./components/CommentForm";

function App() {
  const { data } = useContext(GlobalContext);

   /* only sort when data is modified insted of sorting at every render */
  const sortedComments = useMemo(() => {
    return data.comments ? [...data.comments].sort((a, b) => b.score - a.score): []
  }, [data.comments])
  return (
    <main className="bg-gray-100 min-h-screen px-4 py-6 flex justify-center">
      <div>
        <div>
          {sortedComments.map(comment => (
            <CommentComp
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
        <CommentForm />
      </div>
    </main>
  );
}

export default App;
