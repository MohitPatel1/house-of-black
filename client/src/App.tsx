import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App
