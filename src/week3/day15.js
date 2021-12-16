// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Pseudocode
export const caveLowestRiskLevel = (cave) => {
  const moves = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
  const path = [{ position: { x: 0, y: 0 }, risk: 0 }]
  const visited = {}

  while (!atDestination(path[0].position, cave)) {
    const { position, risk } = path.shift()

    const positionsToVisit = moves
      .map(move => ({ x: move.x + position.x, y: move.y + position.y }))
      .filter(newPosition => insideCave(newPosition, cave) && !visited[hash(newPosition)])

    for (const newPosition of positionsToVisit) {
      visited[hash(newPosition)] = true
      path.push({ position: newPosition, risk: risk + cave[newPosition.y][newPosition.x] })
    }

    path.sort(sortPathByRiskAscending)
  }

  return path[0].risk
}

export const buildFullCave = cave => {
  const fullCave = []
  for (let y = 0; y < cave.length * 5; y++) {
    fullCave.push([])
    for (let x = 0; x < cave[0].length * 5; x++) {
      const risk = cave[y % cave.length][x % cave[0].length]
      const riskMod = Math.floor(x / cave.length) + Math.floor(y / cave[0].length)
      const newRisk = 1 + ((risk + riskMod - 1) % 9)
      fullCave[y].push(newRisk)
    }
  }
  return fullCave
}

export const parseCave = input => input.split('\n').map(line => line.split('').map(risk => parseInt(risk)))
const atDestination = (position, cave) => position.y === cave.length - 1 && position.x === cave[0].length - 1
const insideCave = (position, cave) => cave[position.y]?.[position.x]
const hash = (pos) => '' + pos.x + pos.y
const sortPathByRiskAscending = (p1, p2) => p1.risk - p2.risk
