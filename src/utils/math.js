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
  },
  {
    name: 'Método de la regla falsa mejorada',
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
      'F',
      'G',
      'xi',
      'fxi1',
      'e'
    ],
    func: ({ f, ai, bi, xi, F, G, bi1, ai1 }) => {
      if(!xi) xi = ai
      ai = ai1 ? ai1 : ai
      bi = bi1 ? bi1 : bi
      F = F ? F : math.evaluate(f, {x:ai})
      G = G ? G : math.evaluate(f, {x:bi})

      const fxi = math.evaluate(f, { x: xi })

      const xi1 = (ai*G-bi*F)/(G-F)
      const fxi1 = math.evaluate(f, {x:xi1})

      if(fxi1 === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }

      const e = ((xi1-xi)/(xi+1)) * 100

      //if(!xi) return {ai, bi, xi: xi1, fxi, e, result: xi1}
      if(F*fxi1 < 0) {
        bi1 = xi1
        G = fxi1

        if(fxi * fxi1 > 0) {
          F = F/2
        }
      }
      else if(F*fxi1 > 0) {
        ai1 = xi1
        F = fxi1
        if(fxi * fxi1 > 0) {
          G = G/2
        }
      }

      return {ai, bi, ai1, bi1, xi: xi1, fxi1, e, G, F, result: xi1}
    }
  },
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
