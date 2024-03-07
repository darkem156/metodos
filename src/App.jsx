import { useState, useEffect } from 'react'
import './App.css'
import { methods } from './utils/math.js'
import Editor from './components/Editor'
import Method from './components/Method.jsx'

function App() {
  const [func, setFunc] = useState('(e^(-x))-x')
  const [selection, setSelection] = useState(-1)
  const [params, setParams] = useState({})//useState({f: func, ai: 0, bi: 1, e: 0.05})

  useEffect(() => {
    setParams({...params, f: func})
  }, [func])

  return (
    <>
      <Editor setFunc={setFunc} />
      {selection === -1 ? methods.map((method, index) => <div key={method.name}>
        <button type="" onClick={() => setSelection(index)}>{method.name}</button>
      </div>) : <div>
        <button onClick={() => setSelection(-1)}>Volver al menú</button>
        <Method params={params} setParams={setParams} method={methods[selection]} func={func} />
      </div>}
    </>
  )
}

export default App
