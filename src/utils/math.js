import { create, all } from 'mathjs';
const math = create(all)
math.import({ln: math.log})

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
    func: ({ f, ai, bi, ai1, bi1 }) => {
      let first = false
      if(!ai1) {
        ai1 = ai
        bi1 = bi
        first = true
      }
      const xi1 = (ai1+bi1)/2
      const fxi = math.evaluate(f, {x:xi1})
      if(fxi === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }
      const fai = math.evaluate(f, {x:ai1})
      const fbi = math.evaluate(f, {x:bi1})
      const e = (bi1-ai1)/2 * 100
      const ai0 = ai1
      const bi0 = bi1

      if(fxi > 0) {
        if(fai > 0) ai1 = xi1
        else if(fbi > 0) bi1 = xi1
      }
      else if(fxi < 0) {
        if(fai < 0) ai1 = xi1
        else if(fbi -564< 0) bi1 = xi1
      }

      if(first) {
        return {ai, bi, ai1, bi1, xi: xi1, fxi, e, result: xi1}
      }
      return {ai: ai0, bi: bi0, ai1, bi1, xi: xi1, fxi, e, result: xi1}
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
    func: ({ f, ai, bi, xi, F0, G0, F1, G1, bi1, ai1 }) => {
      if(!xi) xi = ai
      ai = ai1 ? ai1 : ai
      bi = bi1 ? bi1 : bi
      let F = F1 ? F1 : math.evaluate(f, {x:ai})
      let G = G1 ? G1 : math.evaluate(f, {x:bi})

      const fxi = math.evaluate(f, { x: xi })

      const xi1 = (ai*G-bi*F)/(G-F)
      const fxi1 = math.evaluate(f, {x:xi1})

      if(fxi1 === 0) return { ai, bi, xi: xi1, fxi, e: 0, result: xi1 }

      const e = ((xi1-xi)/(xi+1)) * 100

      //if(!xi) return {ai, bi, xi: xi1, fxi, e, result: xi1}
      F0 = F
      G0 = G
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

      return {ai, bi, ai1, bi1, xi: xi1, fxi1, e, G: G0, F: F0, G1: G, F1: F, result: xi1}
    }
  },
  {
    name: 'Método de Newton Rapson',
    params: [
      'f',
      'xi',
      'e',
    ],
    columns: [
      'i',
      'xi',
      'fxi',
      "dfxi",
      'xi1',
      'e'
    ],
    func: ({ f, df, xi, xi0, xi1 }) => {
      if(!xi1) xi1 = xi
      if(!df) df = math.derivative(f, 'x')
      const fxi = math.evaluate(f, {x: xi1})
      const dfxi = df.evaluate({x: xi1})

      xi0 = xi1

      xi1 = xi1 - (fxi/dfxi)

      const e = (xi1 - xi0)/(xi1)*100

      return { df, dfxi, xi: xi0, fxi, xi1, e, result: xi1 }
    }
  },
  {
    name: 'Método de la Secante',
    params: [
      'f',
      'x0',
      'x1',
      'e'
    ],
    columns: [
      'i',
      'xi0',
      'xi',
      "fxi0",
      'fxi',
      'xi1',
      'e'
    ],
    func: ({ f, x0, x1 }) => {
      const fx0 = math.evaluate(f, { x: x0 })
      const fxi = math.evaluate(f, { x: x1 })
      const xi1 = x1 - ((fxi)*(x0-x1))/(fx0-(fxi))
      const e = (xi1-x1)/xi1*100

      return { f, xi0: x0, xi: x1, fxi0: fx0, fxi, xi1, x0:x1, x1: xi1, e }
      //return { df, dfxi, xi: xi0, fxi, xi1, e, result: xi1 }
    }
  },
  {
    name: 'Regla del Trapecio',
    params: [
      'b',
      'a',
      'n',
      'r',
    ],
    columns: [
      'segmentos',
      'valor',
      'error',
    ],
    func: ({ f, b, a, r, n, current_n }) => {
      let ni = 2
      if (current_n) ni = current_n
      if (ni > n) ni = n
      const h = (b-a)/ni
      let sum = 0
      const x0 = a
      const xn = b
      for (let i = 1; i < ni; i++) {
        const xi = x0 + i*h
        sum += math.evaluate(f, { x: xi })
      }
      sum *= 2
      const fx0 = math.evaluate(f, { x:x0 })
      const fxn = math.evaluate(f, { x:xn })
      const I = (h/2)*(fx0+sum+fxn)
      let e = 100
      let error = (r - I)/r * 100
      console.log(ni, n)
      if (ni == n) {
        e = 0
      }
      return { fx0: 0, fxi: 0, valor: I, error: error, e, b, a, r, n, current_n: ni+1, segmentos:ni }
    },
  },
  {
    name: 'Regla de Simpson 1/3',
    params: [
      'b',
      'a',
      'n',
      'r',
      'e'
    ],
    columns: [
      'segmentos',
      'valor',
      'error',
    ],
    func: ({ f, b, a, r, n, current_n }) => {
      console.log(f,b,a,r,n,current_n)
      let ni = 2
      if (current_n) ni = current_n
      if (ni > n) ni = n
      const h = (b-a)/ni
      let sum = 0
      const x0 = a
      const xn = b
      for (let i = 1; i < ni; i+=2) {
        const xi = x0 + i*h
        sum += 4*math.evaluate(f, { x: xi })
      }
      for (let i = 2; i < ni-1; i+=2) {
        const xi = x0 + i*h
        sum += 2*math.evaluate(f, { x: xi })
      }
      const fx0 = math.evaluate(f, { x:x0 })
      const fxn = math.evaluate(f, { x:xn })
      const I = (h/3)*(fx0+sum+fxn)
      let e = 100
      let error = (r - I)/r * 100
      console.log(ni, n)
      if (ni == n) {
        e = 0
      }
      return { valor: I, error: error, e, b, a, r, n, current_n: ni+1, segmentos:ni }
    }
  },
  {
    name: 'Regla de Simpson 3/8',
    params: [
      'b',
      'a',
      'r',
      'e'
    ],
    columns: [
      'segmentos',
      'valor',
      'error',
    ],
    func: ({ f, b, a, r, n }) => {
      const h = (b-a)/3
      const x0 = a
      const x1 = a+h
      const x2 = a + 2*h
      const x3 = b
      const sum = math.evaluate(f, {x: x0}) + 3*math.evaluate(f, {x:x1}) + 3*math.evaluate(f, {x:x2}) + math.evaluate(f, {x:x3})
      const I = (3*h/8)*sum

      let error = (r - I)/r * 100
      return { valor: I, error: error, e: 0, b, a, r, n }
    }
  },
  {
    name: 'Regla de Simpson segmentos impares',
    params: [
      'b',
      'a',
      'r',
      'e',
      'n'
    ],
    columns: [
      's_1_3',
      's_3_8',
      'valor',
      'error',
    ],
    func: ({ f, b, a, r, n }) => {
      console.log(methods)
      const func_1_3 = methods[7].func
      const func_3_8 = methods[8].func
      const h = (b-a)/n
      const i1 = func_1_3({f, b:b-3*h, a, r, n:n-3})
      const i2 = func_3_8({f, b, a:b-3*h, r, n:3})
      const I = i1.valor + i2.valor

      let error = (r - I)/r * 100
      return { valor: I, s_1_3: i1.valor, s_3_8: i2.valor, error: error, e: 0, b, a, r, n }
    }
  },
  {
    name: 'Método de Gauss-Seidel',
    params: [
      'e',
    ],
    matrixLength: 3,
    columns: [
      'i',
      'x10',
      'x20',
      'x30',
      'ex1',
      'ex2',
      'ex3'
    ],
    func: ({ x1, x2, x3, x10, x20, x30 }) => {
      let cx10 = x10 ?? 0
      let cx20 = x20 ?? 0
      let cx30 = x30 ?? 0

      const nx10 = math.evaluate(x1, { x2: cx20, x3: cx30 })
      const nx20 = math.evaluate(x2, { x1: nx10, x3: cx30 })
      const nx30 = math.evaluate(x3, { x1: nx10, x2: nx20 })

      const ex1 = (nx10 - cx10)/nx10 * 100
      const ex2 = (nx20 - cx20)/nx20 * 100
      const ex3 = (nx30 - cx30)/nx30 * 100

      return { ex1, ex2, ex3, x1, x2, x3, x10: nx10, x20: nx20, x30: nx30 }
    }
  },
  {
    name: 'Método de Jacobi',
    params: [
      'e'
    ],
    matrixLength: 3,
    columns: [
      'i',
      'x10',
      'x20',
      'x30',
      'ex1',
      'ex2',
      'ex3'
    ],
    func: ({ x1, x2, x3, x10, x20, x30 }) => {
      let cx10 = x10 ?? 0
      let cx20 = x20 ?? 0
      let cx30 = x30 ?? 0
      console.log(x1)
      console.log(x2)
      console.log(x3)

      const nx10 = math.evaluate(x1, { x2: cx20, x3: cx30 })
      const nx20 = math.evaluate(x2, { x1: cx10, x3: cx30 })
      const nx30 = math.evaluate(x3, { x1: cx10, x2: cx20 })

      console.log(nx10, nx20, nx30)

      const ex1 = (nx10 - cx10)/nx10 * 100
      const ex2 = (nx20 - cx20)/nx20 * 100
      const ex3 = (nx30 - cx30)/nx30 * 100

      return { ex1, ex2, ex3, x1, x2, x3, x10: nx10, x20: nx20, x30: nx30 }
    }
  },
  {
    name: 'Método de Newton Rapson',
    params: [
      'x0',
      'y0',
      'e'
    ],
    columns: [
      'i',
      'xi',
      'yi',
      'ex',
      'ey',
    ],
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
  .replaceAll('\\pi', 'pi')
  .replaceAll('\\cos', 'cos')
  .replaceAll('\\ln', 'ln')
  .replace(/([a-z])([a-z0-9])/gi, '$1*$2');

  text = text.replace(/{([^{}]+)}/g, '($1)');
  text = text.replaceAll('\\', '');

  return text
}

export const calculateFromText = (text, x = 0) => {
  console.log(text)
  const result = math.evaluate(text, { x })
  return result
}
