import { useState } from 'react'
import './App.css'
import Editor from './components/Editor'
import Graph from './components/Graph'
import Method from './components/Method.jsx'

function App() {
  const [func, setFunc] = useState('')

  return (
    <>
      <Editor setFunc={setFunc} />
    </>
  )
}

export default App
