import { useEffect, useState } from 'react'
import './App.css'
import Comment from './components/Comment';

function App() {
  const [data, setData] = useState({});
  const comments = data.comments;

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [])

  return (
    <main className='bg-gray-100 min-h-screen px-4 py-6'>
      <ul>
        {comments && comments.map(comment => (
          <Comment 
            key={comment.id}
            data = {comment}
          />
        ))}
      </ul>
    </main>
  )
}

export default App
