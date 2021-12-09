export const count1478 = (data) => data
  .map(d => d.split(' | ')[1].split(' '))
  .flat()
  .filter(output => [2, 4, 3, 7].includes(output.length))
  .length

export const decodePart2 = lines => lines
  .map(line => parsePatternsAndOutput(line))
  .map(note => ({ patterns: decodePatterns(note.patterns), output: note.output }))
  .reduce((sum, note) => sum + decodeOutput(note), 0)

export const parsePatternsAndOutput = (line) => {
  const [patterns, output] = line
    .split(' | ')
    .map((part) => part.split(' ').map((value) => value.split('').sort().join('')))

  return { patterns: patterns, output: output }
}

export const decodePatterns = (patterns) => {
  const decodingOrder = [1, 4, 7, 8, 6, 9, 0, 3, 5, 2]
  const decoded = {}

  for (const number of decodingOrder) {
    decoded[number] = patterns.find((pattern) => decodeNumber(number, pattern, decoded))
  }

  return swapKeyValue(decoded)
}

const decoder = {
  1: { length: 2, excludes: [], includes: [] },
  4: { length: 4, excludes: [], includes: [] },
  7: { length: 3, excludes: [], includes: [] },
  8: { length: 7, excludes: [], includes: [] },

  6: { length: 6, excludes: [1], includes: [] },
  9: { length: 6, excludes: [6], includes: [4] },
  0: { length: 6, excludes: [6, 9], includes: [] },

  3: { length: 5, excludes: [], includes: [1] },
  5: { length: 5, excludes: [3], includes: [6] },
  2: { length: 5, excludes: [3, 5], includes: [] }
}

const decodeNumber = (number, pattern, decoded) => pattern.length === decoder[number].length
  && decoder[number].excludes.every(e => !includes(pattern, decoded[e]))
  && decoder[number].includes.every(e => includes(pattern, decoded[e]))

export const decodeOutput = ({ patterns, output }) => parseInt(output.map((signal) => patterns[signal]).join(''))

const swapKeyValue = object => Object.assign({}, ...Object.entries(object).map(([a, b]) => ({ [b]: a })))
const includes = (a, b) => b.split('').every(l => a.includes(l)) || a.split('').every(l => b.includes(l))
