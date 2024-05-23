import { useState, useEffect } from 'react'
import { create, all } from 'mathjs';
import Graph from './Graph'
const math = create(all)
math.import({ln: math.log})

export default function SystemMethod({ method, params, setParams }) {
  const [handleParams, setHandleParams] = useState(params)
  const [matrix1, setMatrix1] = useState([[],[],[]])
  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)

  let rows = []

  function onChange(e, matrix, index) {
    matrix[index] = Number(e.target.value)
  }

  function order() {
    let ordered = matrix1.sort((a, b) => Math.abs(a[0]) < Math.abs(b[0]) ? 1 : -1)
    const row1 = ordered[0]
    ordered = ordered.slice(1).sort((a, b) => Math.abs(a[1]) < Math.abs(b[1]) ? 1 : -1)
    const row2 = ordered[0]
    const row3 = ordered[1]

    return [row1, row2, row3]
  }

  function calculate() {
    const ordered = order()
    console.log(ordered)
    const x1 = `(${ordered[0][3]} + (${ordered[0][1]*-1}x2) + (${ordered[0][2]*-1}x3))/${ordered[0][0]}`
    const x2 = `(${ordered[1][3]} + (${ordered[1][0]*-1}x1) + (${ordered[1][2]*-1}x3))/${ordered[1][1]}`
    const x3 = `(${ordered[2][3]} + (${ordered[2][0]*-1}x1) + (${ordered[2][1]*-1}x2))/${ordered[2][2]}`
    //console.log(math.derivative('2x+2x*y', 'x').toString())
    //params = {...params, x1, x2, x3}
    params.x1 = x1
    params.x2 = x2
    params.x3 = x3
    console.log(params.e)

    if (rows.length == 0) {
      console.log(params)
      const first = {...method.func(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.ex1) > Math.abs(params.e) || Math.abs(last.ex2) > Math.abs(params.e) || Math.abs(last.ex3) > Math.abs(params.e)) {
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
      <h1>{method.name}</h1>
      <div>
        {method.params.map(param => param !== "f" ? <div key={param}>
            <label htmlFor={param}>{param}</label>
            <input onChange={handleChange} id={param} type="text" name="" value={handleParams[param]?.toString() || ""} />
          </div> : null)}
      </div>
      <div>
        { Array(method.matrixLength).fill(0).map((row, i) => {
          return(
            <div className="flex" key={i}>
              { Array(method.matrixLength).fill(0).map((column, j) => {
                if(j < method.matrixLength-1) {
                  return(
                    <div key={i+j}>
                      <input type="number" name="" value={matrix1[i][j]} onChange={ e => onChange(e, matrix1[i], j) } />
                      <span>x{j+1}+</span>
                    </div>
                  )
                }
                else {
                  return(
                    <>
                      <div key={i+j}>
                        <input type="number" name="" value={matrix1[i][j]} onChange={ e => onChange(e, matrix1[i], j) } />
                        <span>x{j+1}=</span>
                      </div>
                      <div>
                        <input type="number" name="" value={matrix1[i][j+1]} onChange={ e => onChange(e, matrix1[i], j+1) } />
                      </div>
                    </>
                  )
                }
              }) }
            </div>
          )
        }) }
      </div>
      <button type="" onClick={ () => {
        let all = true
        method.params.map(param => all = all ? (handleParams[param] ? true : false) : false)
        if(all) {
          setParams({...handleParams})
          calculate()
        }
        else alert('Se deben ingresar todos los parámetros')
      } }>Calcular</button>
      <div id="table-container">
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
      </div>
    </>
  )
}
