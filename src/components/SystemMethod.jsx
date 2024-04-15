import { useState } from 'react'
import { create, all } from 'mathjs';
const math = create(all)
math.import({ln: math.log})

export default function SystemMethod() {
  const [matrix1, setMatrix1] = useState([[],[],[]])

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
    const ordered = order()
    const x1 = `(${ordered[0][3]} - (${ordered[0][1]}x2) - (${ordered[0][2]}x3))/${ordered[0][0]}`
    const x2 = `(${ordered[1][3]} - (${ordered[1][0]}x1) - (${ordered[1][2]}x3))/${ordered[1][1]}`
    const x3 = `(${ordered[2][3]} - (${ordered[2][0]}x1) - (${ordered[2][1]}x2))/${ordered[2][2]}`
    //console.log(math.derivative('2x+2x*y', 'x').toString())
  }

  return(
    <>
      <h1>System Method</h1>
      <div>
        <div className="flex">
          <div>
            <input type="number" step="1" name="" value={matrix1[0][0]} onChange={ e => onChange(e, matrix1[0], 0) } />
            <span>x1+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[0][1]} onChange={ e => onChange(e, matrix1[0], 1) } />
            <span>x2+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[0][2]} onChange={ e => onChange(e, matrix1[0], 2) } />
            <span>x3=</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[0][3]} onChange={ e => onChange(e, matrix1[0], 3) } />
          </div>
        </div>
        <div className="flex">
          <div>
            <input type="number" step="1" name="" value={matrix1[1][0]} onChange={ e => onChange(e, matrix1[1], 0) } />
            <span>x1+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[1][1]} onChange={ e => onChange(e, matrix1[1], 1) } />
            <span>x2+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[1][2]} onChange={ e => onChange(e, matrix1[1], 2) } />
            <span>x3=</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[1][3]} onChange={ e => onChange(e, matrix1[1], 3) } />
          </div>
        </div>
        <div className="flex">
          <div>
            <input type="number" step="1" name="" value={matrix1[2][0]} onChange={ e => onChange(e, matrix1[2], 0) } />
            <span>x1+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[2][1]} onChange={ e => onChange(e, matrix1[2], 1) } />
            <span>x2+</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[2][2]} onChange={ e => onChange(e, matrix1[2], 2) } />
            <span>x3=</span>
          </div>
          <div>
            <input type="number" step="1" name="" value={matrix1[2][3]} onChange={ e => onChange(e, matrix1[2], 3) } />
          </div>
        </div>
      </div>
      <button type="" onClick={ e => calculate() }></button>
    </>
  )
}
