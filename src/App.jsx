import { useState, useEffect } from 'react'
import './App.css'
import { methods } from './utils/math.js'
import Editor from './components/Editor'
import Method from './components/Method.jsx'
import SystemMethod from './components/SystemMethod.jsx'
import NewtonRapsomSystem from './components/NewtonRapsomSystem.jsx'

function App() {
  const [func, setFunc] = useState('')
  const [section, setSection] = useState(-1)
  const [selection, setSelection] = useState(-1)
  const [params, setParams] = useState({})

  useEffect(() => {
    setParams({...params, f: func})
  }, [func])

  return (
    <>
      <Editor setFunc={setFunc} />
      <div id="method">
        { section === -1 ? <div>
            <button type="" onClick={()=> setSection(1)}>Métodos de solución de ecuaciones</button>
            <button type="" onClick={()=> setSection(2)}>Métodos de solución de sistemas ecuaciones</button>
            <button type="" onClick={()=> setSection(3)}>Métodos de integración</button>
          </div> 
            : <div>
              <button type="" onClick={()=>setSection(-1) & setSelection(-1)}>Atrás</button>
              {
                  selection === -1 ?
                    section === 1 ? methods.slice(0,3).map((method, index) => <div key={method.name}>
                        <button type="" onClick={() => setSelection(index)}>{method.name}</button>
                      </div>) 
                    : section === 2 ? methods.slice(8,11).map((method, index) => <div key={method.name}>
                        <button type="" onClick={() => setSelection(index+8)}>{method.name}</button>
                      </div>) : section === 3 ? methods.slice(4,8).map((method, index) => <div key={method.name}>
                        <button type="" onClick={() => setSelection(index+4)}>{method.name}</button>
                      </div>) : <div></div>
                    :
                    selection === -1 ? methods.map((method, index) => <div key={method.name}>
                      <button type="" onClick={() => setSelection(index)}>{method.name}</button>
                    </div>) : <div>
                      { selection > 7
                          ? selection < 10
                            ? <SystemMethod params={params} setParams={setParams} method={methods[selection]} />
                            : <NewtonRapsomSystem params={params} setParams={setParams} method={methods[selection]} func={func} />
                          : <Method params={params} setParams={setParams} method={methods[selection]} func={func} />}
                    </div>
              }
            </div>
        }
      </div>
    </>
  )
}

export default App
