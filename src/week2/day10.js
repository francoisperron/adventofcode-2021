// part 2
export const middleScore = lines => {
  const scores = lines
    .filter(line => firstIllegalCharacter(line) === null)
    .map(line => completeIncompleteLine(line))
    .map(line => calculateCompletionScore(line))
    .sort((a, b) => b - a)

  return scores[Math.round((scores.length - 1) / 2)]
}

export const completeIncompleteLine = line => line
  .split('')
  .reduce((chunks, c) => opens.includes(c) ? [...chunks, c] : chunks.slice(0, -1), [])
  .map(c => closeOf(c)).reverse().join('')

export const calculateCompletionScore = line => line
  .split('')
  .reduce((score, c) => score * 5 + score2Map[c], 0)

// part 1
export const syntaxErrorScore = lines => lines
  .map(line => firstIllegalCharacter(line))
  .filter(c => c !== null)
  .map(c => scoreMap[c])
  .reduce((sum, score) => sum + score, 0)

export const firstIllegalCharacter = line => {
  const chunks = []

  for (const c of line.split('')) {
    if (opens.includes(c))
      chunks.push(c)
    else if (openOf(c) === chunks.at(-1))
      chunks.pop()
    else
      return c
  }

  return null
}

const scoreMap = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
const score2Map = { ')': 1, ']': 2, '}': 3, '>': 4 }

const rules = { '<': '>', '[': ']', '{': '}', '(': ')' }
const openOf = close => Object.keys(rules).find(open => rules[open] === close)
const closeOf = open => rules[open]
const opens = Object.keys(rules)
