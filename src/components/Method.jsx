import { useState, useEffect } from 'react'
import Graph from './Graph'

export default function Method({ method, func, params, setParams }) {
  const [handleParams, setHandleParams] = useState(params)
  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)
  let rows = []

  useEffect(() => {
    if(params.e) calculate()
  }, [params])

  const calculate = () => {
    if (rows.length == 0) {
      console.log(params)
      const first = {...method.func(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.e) > Math.abs(params.e)) {
      const newData = {...method.func({...last, e:params.e, f: params.f}), i: rows.length}
      rows.push(newData)
      return calculate()
    }
    else {
      setResults(rows)
      setFinalResult(rows[rows.length-1].result)
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setHandleParams({...handleParams, [e.target.id]: Number(value) || value})
    console.log(value)
  }

  return(
    <>
      <p>{method.name}</p>
      <div>
        {method.params.map(param => param !== "f" ? <div key={param}>
            <label htmlFor={param}>{param}</label>
            <input onChange={handleChange} id={param} type="text" name="" value={handleParams[param]?.toString() || ""} />
          </div> : null)}
      </div>
      <button type="button" onClick={() => {
        setParams({...handleParams, f: func})
      }}>Calcular</button>
      <table>
        <thead>
          <tr>
            {method.columns.map(column => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {results.map(result => <tr key={result.e+Math.random()}>
              { method.columns.map(column => <td key={result.e+Math.random()}>{result[column]}</td>) }
            </tr>)
          }
        </tbody>
      </table>
      { finalResult ? <p>Aproximación final: {finalResult}</p> : <></> }
      <Graph func={func} />
    </>
  )
}
