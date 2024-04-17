import { useState, useEffect } from 'react'
import './App.css'
import { methods } from './utils/math.js'
import Editor from './components/Editor'
import Method from './components/Method.jsx'
import SystemMethod from './components/SystemMethod.jsx'
import NewtonRapsomSystem from './components/NewtonRapsomSystem.jsx'

function App() {
  const [func, setFunc] = useState('(e^(-x))-x')
  const [selection, setSelection] = useState(-1)
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams({...params, f: func})
  }, [func])

  return (
    <>
      <Editor setFunc={setFunc} />
      <div id="method">
        {selection === -1 ? methods.map((method, index) => <div key={method.name}>
          <button type="" onClick={() => setSelection(index)}>{method.name}</button>
        </div>) : <div>
          <button onClick={() => setSelection(-1)}>Volver al menú</button>
          { selection > 3
              ? selection < 6
                ? <SystemMethod params={params} setParams={setParams} method={methods[selection]} />
                : <NewtonRapsomSystem params={params} setParams={setParams} method={methods[selection]} func={func} />
              : <Method params={params} setParams={setParams} method={methods[selection]} func={func} />}
        </div>}
      </div>
    </>
  )
}

export default App
