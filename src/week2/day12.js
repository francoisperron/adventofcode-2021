// part 2
export const visitCaveSystemPart2 = input => {
  const caves = parseCaves(input)
  const currentPath = ['start']
  const paths = []
  const rule = (path, cave) => isABigCave(cave) || !smallCavesVisitedTwice(path, cave)

  return travel({ currentPath, caves, paths, rule }).paths.length
}

export const smallCavesVisitedTwice = (path, cave) => {
  const pathWithoutBigCaves = [...path, cave].filter(c => c === c.toLowerCase())
  return new Set(pathWithoutBigCaves).size + 1 < pathWithoutBigCaves.length
}

// part 1
export const visitCaveSystemPart1 = input => {
  const caves = parseCaves(input)
  const currentPath = ['start']
  const paths = []
  const rule = (path, cave) => isABigCave(cave) || !path.includes(cave)

  return travel({ currentPath, caves, paths, rule }).paths.length
}

export const travel = ({ currentPath, caves, paths, rule }) => {
  const currentCave = currentPath.at(-1)

  if (currentCave === 'end') {
    paths.push(currentPath)
    return { currentPath, caves, paths }
  }

  return caves[currentCave]
    .filter(cave => rule(currentPath, cave))
    .reduce((result, cave) => {
      return travel({ currentPath: [...currentPath, cave], caves: caves, paths: result.paths, rule })
    }, { currentPath, caves, paths, rule })
}

const isABigCave = cave => cave === cave.toUpperCase()

export const parseCaves = (input) => input
  .split('\n')
  .reduce((caves, line) => {
    const [start, end] = line.split('-')

    if (end !== 'start')
      caves[start] = caves[start] === undefined ? [end] : [...caves[start], end]

    if (start !== 'start' && end !== 'end')
      caves[end] = caves[end] === undefined ? [start] : [...caves[end], start]

    return caves
  }, {})
