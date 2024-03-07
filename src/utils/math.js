import * as math from 'mathjs';

export const methods = [
  {
    name: 'Método de Bisección',
    params: [
      'f',
      'ai',
      'bi',
      'e',
    ],
    columns: [
      'i',
      'ai',
      'bi',
      'xi',
      'fxi',
      'e'
    ],
    func: ({ f, ai, bi, xi }) => {
      const xi1 = (ai+bi)/2
      const fxi = math.evaluate(f, {x:xi1})
      if(fxi === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }
      const fai = math.evaluate(f, {x:ai})
      const fbi = math.evaluate(f, {x:bi})
      const e = (bi-ai)/2 * 100
      if(!xi) return {ai, bi, xi: xi1, fxi, e, result: xi1}
      if(fxi > 0) {
        if(fai > 0) ai = xi1
        else if(fbi > 0) bi = xi1
      }
      else if(fxi < 0) {
        if(fai < 0) ai = xi1
        else if(fbi < 0) bi = xi1
      }


      return {ai, bi, xi: xi1, fxi, e, result: xi1}
    }
  }
]

export function fromLatex(latex) {
  let text = latex
  text = text.replace(/\\sqrt\[([^\[\]]+)\]{([^{}]+)}/g, '(($2)^(1/$1))');
  text = text.replace(/\\sqrt{([^{}]+)}/g, 'sqrt($1)');
  text = text.replace(/([0-9]+)\^\{([^{}]+)\}/g, '($1^($2))');
  text = text.replace(/\\frac{([^{}]+)}{([^{}]+)}/g, '(($1)/($2))');
  text = text.replace(/\\cdot/g, '*');
  text = text.replaceAll('\\left(', '(')
  text = text.replaceAll('\\right)', ')')

  text = text.replace(/{([^{}]+)}/g, '($1)');

  return text
}

export const calculateFromText = (text, x = 0) => {
  console.log(text)
  const result = math.evaluate(text, { x })
  return result
}
