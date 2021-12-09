export const riskLevelOf = input => {
  const map = parseHeightMap(input)

  return findLowPoints(map)
    .map(([x, y]) => map[x][y] + 1)
    .reduce((sum, p) => sum + p, 0)
}

export const parseHeightMap = input => input
  .split('\n')
  .map(line => line.split('').map(point => parseInt(point)))

const findLowPoints = (map) => {
  const lowPoints = []
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (isLowPoint(x, y, map)) {
        lowPoints.push([x, y])
      }
    }
  }
  return lowPoints
}

export const isLowPoint = (x, y, map) => adjacentLocations(x, y)
  .map(([x, y]) => heightAt(x, y, map))
  .filter(p => p !== undefined)
  .every(p => p > map[x][y])

const adjacentLocations = (x, y) => [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
const heightAt = (x, y, map) => map[x] === undefined ? undefined : map[x][y]

// part 2

export const largestBasinsProduct = input => {
  const map = parseHeightMap(input)

  const basins = findLowPoints(map)
    .map(([x, y]) => findBasinsSize(x, y, map, [hash(x, y)]))
    .sort((a, b) => b - a)

  return basins[0] * basins[1] * basins[2]
}

const findBasinsSize = (currentX, currentY, map, skip) => {
  let size = 1
  for (const [x, y] of adjacentLocations(currentX, currentY)) {
    if (skip.includes(hash(x, y))) continue

    skip.push(hash(x, y))

    if (heightAt(x, y, map) < 9)
      size += findBasinsSize(x, y, map, skip)
  }
  return size
}

const hash = (x, y) => '' + x + y
