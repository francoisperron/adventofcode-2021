// noinspection CommaExpressionJS

const numberOfPointsWithTwoLinesOverlapping = (lines, withDiagonals = false) => {
  const coordinates = lines
    .map(line => parseLineSegment(line, withDiagonals))
    .flat()
    .reduce((groups, c) => ((groups[c] ||= []).push(c), groups), {}) // ugly groupBy

  return Object.values(coordinates).filter(c => c.length >= 2).length
}

const parseLineSegment = (lineSegment, withDiagonals = false) => {
  const [end1, end2] = lineSegment.split(' -> ').map(segment => segment.split(',').map(c => parseInt(c)))

  if (end1[0] === end2[0])
    return arrayFrom(end1[1], end2[1]).map((_, i) => [end1[0], Math.min(end1[1], end2[1]) + i])

  if (end1[1] === end2[1])
    return arrayFrom(end1[0], end2[0]).map((_, i) => [Math.min(end1[0], end2[0]) + i, end1[1]])

  return withDiagonals ? diagonals(end1, end2) : []
}

const diagonals = (end1, end2) => {
  const lowestX = Math.min(end1[0], end2[0])
  const lowestY = Math.min(end1[1], end2[1])
  return arrayFrom(end1[0], end2[0]).map((_, i) => [lowestX + i, lowestX === end1[0] ? end1[1] + (lowestY === end1[1] ? i : -i) : end2[1] + (lowestY === end2[1] ? i : -i)])
}

const arrayFrom = (a, b) => Array.from({ length: Math.abs(a - b) + 1 })

export { parseLineSegment, numberOfPointsWithTwoLinesOverlapping }
