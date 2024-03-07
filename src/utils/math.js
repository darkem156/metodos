import * as math from 'mathjs';

export const methods = [
  {
    name: 'Méthodo de Bisección',
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
    func: ({ f, ai, bi }) => {
      return {f, ai, bi}
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

  text = text.replace(/{([^{}]+)}/g, '($1)');

  return text
}

export const calculateFromText = (text, x = 0) => {
  console.log(text)
  const result = math.evaluate(text, { x })
  return result
}
