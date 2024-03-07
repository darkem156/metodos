import React, { useState } from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import { fromLatex, calculateFromText } from '../utils/math.js'

addStyles()

export default function Editor({ setFunc }) {
  const [latex, setLatex] = useState('e^{-x}-x')
  const [result, setResult] = useState(0)

  const calculate = () => {
    const text = fromLatex(latex)
    const result = calculateFromText(text, 2)
    setResult(result)
  }

  return (
    <div>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex())
        }}
      />
      <button type="" onClick={() => setFunc(fromLatex(latex))}>Enter</button>
    </div>
  )
}
