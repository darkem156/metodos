import { useEffect, useState } from "react";
import { fromLatex } from '../utils/math.js'
import { create, all } from 'mathjs';

const math = create(all)
math.import({ln: math.log})

export default function NewtonRapsomSystem({ method, func, params, setParams }) {
  const [handleParams, setHandleParams] = useState(params)
  const [parsedFunc, setParsedFunc] = useState([])
  const [results, setResults] = useState([])
  const [finalResult, setFinalResult] = useState(false)

  let rows = []

  useEffect(() => {
    let all = true
    method.params.map(param => all = all ? (handleParams[param] ? true : false) : false)
    if(all) calculate()
  }, [params])

  useEffect(() => {
    console.log(func)
    const newFunc = func.split(',')
    setParsedFunc(newFunc)
  }, [func])

  function calculate() {
    if (rows.length == 0) {
      console.log(params)
      const first = {...methodFunc(params), i: 0}
      rows.push(first)
      setResults(rows)
      return calculate()
    }
    if(rows.length > 100) return
    const last = rows[rows.length-1]
    if(Math.abs(last.ex) > Math.abs(params.e) || Math.abs(last.ey) > Math.abs(params.e)) {
      const newData = {...methodFunc({...last, e:params.e, f: params.f}), i: rows.length}
      rows.push(newData)
      return calculate()
    }
    else {
      setResults(rows)
      setFinalResult(rows[rows.length-1].result)
    }
  }

  function methodFunc({ x0, y0 }) {
    const params = { x: x0, y: y0 }

    const dux = math.derivative(parsedFunc[0], 'x').evaluate(params)
    const dvx = math.derivative(parsedFunc[1], 'x').evaluate(params)

    const duy = math.derivative(parsedFunc[0], 'y').evaluate(params)
    const dvy = math.derivative(parsedFunc[1], 'y').evaluate(params)

    const jacob = (dux*dvy)-(dvx*duy)

    const u = math.evaluate(parsedFunc[0], { x: x0, y: y0 })
    const v = math.evaluate(parsedFunc[1], { x: x0, y: y0 })
    console.log(u, v)

    const x11 = x0 - (u*dvy - v*duy)/jacob
    const y11 = y0 - (v*dux - u*dvx)/jacob

    const ex = (x11-x0)/x11 * 100
    const ey = (y11-y0)/y11 * 100

    return { ex, ey, xi: x0, yi: y0, x0: x11, y0: y11 }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setHandleParams({...handleParams, [e.target.id]: Number(value) || value})
    console.log(value)
  }

  return(
    <>
      <h1>Newton Rapson</h1>
      <p>{ parsedFunc[0] }, { parsedFunc[1] }</p>
      <div>
        {method.params.map(param => param !== "f" ? <div key={param}>
            <label htmlFor={param}>{param}</label>
            <input onChange={handleChange} id={param} type="text" name="" value={handleParams[param]?.toString() || ""} />
          </div> : null)}
      </div>
      <button type="button" onClick={() => {
        let all = true
        method.params.map(param => all = all ? (handleParams[param] ? true : false) : false)
        if(all) setParams({...handleParams, f: func})
        else alert('Se deben ingresar todos los parámetros')
      }}>Calcular</button>
      <div id="table-container">
        <table>
          <thead>
            <tr>
              {method.columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {results.map(result => <tr key={Math.random()}>
                { method.columns.map(column => <td key={Math.random()}>{result[column]}</td>) }
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
