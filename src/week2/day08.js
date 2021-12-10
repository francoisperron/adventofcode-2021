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
  const decoded = {}

  decoded[1] = patterns.find((p) => ofLength(p, 2))
  decoded[4] = patterns.find((p) => ofLength(p, 4))
  decoded[7] = patterns.find((p) => ofLength(p, 3))
  decoded[8] = patterns.find((p) => ofLength(p, 7))

  decoded[6] = patterns.find((p) => ofLength(p, 6) && withoutSegments(p, [decoded[1]]))
  decoded[9] = patterns.find((p) => ofLength(p, 6) && withoutSegments(p, [decoded[6]]) && withSegment(p, decoded[4]))
  decoded[0] = patterns.find((p) => ofLength(p, 6) && withoutSegments(p, [decoded[6], decoded[9]]))

  decoded[3] = patterns.find((p) => ofLength(p, 5) && withSegment(p, decoded[1]))
  decoded[5] = patterns.find((p) => ofLength(p, 5) && withoutSegments(p, [decoded[3]]) && withSegment(p, decoded[6]))
  decoded[2] = patterns.find((p) => ofLength(p, 5) && withoutSegments(p, [decoded[3], decoded[5]]))

  return decoded
}

export const decodeOutput = ({ patterns, output }) => parseInt(
  output
    .map((signal) => Object.keys(patterns).find(key => patterns[key] === signal))
    .join(''))

const ofLength = (pattern, length) => pattern.length === length
const withSegment = (pattern, segment) => includes(pattern, segment)
const withoutSegments = (pattern, segments) => segments.every(s => !includes(pattern, s))

const includes = (a, b) => b.split('').every(l => a.includes(l)) || a.split('').every(l => b.includes(l))
