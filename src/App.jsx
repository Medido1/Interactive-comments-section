import { useContext } from 'react'
import './App.css'
import Comment from './components/Comment';
import Form from './components/Form';
import {GlobalContext} from "./context/GlobalContext";

function App() {
  const {data} = useContext(GlobalContext)

  return (
    <main className='bg-gray-100 min-h-screen px-4 py-6'>
      <ul>
        {data.comments && data.comments.map(comment => (
          <Comment 
            key={comment.id}
            comment = {comment}
          />
        ))}
      </ul>
      <Form 
        isReply = {false}
      />
    </main>
  )
}

export default App
