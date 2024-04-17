import { useState } from 'react'
import { create, all } from 'mathjs';
const math = create(all)
math.import({ln: math.log})

export default function SystemMethod({ method, params, setParams }) {
  const [matrix1, setMatrix1] = useState([[],[],[]])
  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)

  let rows = []

  function onChange(e, matrix, index) {
    matrix[index] = Number(e.target.value)
  }

  function order() {
    let ordered = matrix1.sort((a, b) => a[0] < b[0] ? 1 : -1)
    const row1 = ordered[0]
    ordered = ordered.slice(1).sort((a, b) => a[1] < b[1] ? 1 : -1)
    const row2 = ordered[0]
    const row3 = ordered[1]

    return [row1, row2, row3]
  }

  function calculate() {
    params.ex1 = 0.1
    params.ex2 = 0.1
    params.ex3 = 0.1
    const ordered = order()
    const x1 = `(${ordered[0][3]} - (${ordered[0][1]}x2) - (${ordered[0][2]}x3))/${ordered[0][0]}`
    const x2 = `(${ordered[1][3]} - (${ordered[1][0]}x1) - (${ordered[1][2]}x3))/${ordered[1][1]}`
    const x3 = `(${ordered[2][3]} - (${ordered[2][0]}x1) - (${ordered[2][1]}x2))/${ordered[2][2]}`
    //console.log(math.derivative('2x+2x*y', 'x').toString())
    //params = {...params, x1, x2, x3}
    params.x1 = x1
    params.x2 = x2
    params.x3 = x3

    if (rows.length == 0) {
      console.log(params)
      const first = {...method.func(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.ex1) > Math.abs(params.ex1) || Math.abs(last.ex2) > Math.abs(params.ex2) || Math.abs(last.ex3) > Math.abs(params.ex3)) {
      const newData = {...method.func({...last, e:params.e, f: params.f}), i: rows.length}
      rows.push(newData)
      return calculate()
    }
    else {
      setResults(rows)
      setFinalResult(rows[rows.length-1].result)
    }
  }

  return(
    <>
      <h1>System Method</h1>
      <div>
        { Array(method.matrixLength).fill(0).map((row, i) => {
          return(
            <div className="flex" key={i}>
              { Array(method.matrixLength).fill(0).map((column, j) => {
                if(j < method.matrixLength-1) {
                  return(
                    <div key={i+j}>
                      <input type="number" step="1" name="" value={matrix1[i][j]} onChange={ e => onChange(e, matrix1[i], j) } />
                      <span>x{j+1}+</span>
                    </div>
                  )
                }
                else {
                  return(
                    <>
                      <div key={i+j}>
                        <input type="number" step="1" name="" value={matrix1[i][j]} onChange={ e => onChange(e, matrix1[i], j) } />
                        <span>x{j+1}=</span>
                      </div>
                      <div>
                        <input type="number" step="1" name="" value={matrix1[i][j+1]} onChange={ e => onChange(e, matrix1[i], j+1) } />
                      </div>
                    </>
                  )
                }
              }) }
            </div>
          )
        }) }
      </div>
      <button type="" onClick={ e => calculate() }></button>
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
