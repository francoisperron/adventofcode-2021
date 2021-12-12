// part 2
export const travel2 = ({ currentPath, caves, paths }) => {
  const currentCave = currentPath.at(-1)

  if (currentCave === 'end') {
    paths.push(currentPath)
    return { currentPath, caves, paths }
  }

  return caves[currentCave]
    .filter(cave => cave === cave.toUpperCase() || (!smallCavesVisitedTwice(currentPath, cave) && cave !=='start'))
    .reduce((result, cave) => {
      return travel2({ currentPath: [...currentPath, cave], caves: caves, paths: result.paths })
    }, { currentPath, caves, paths })
}

export const smallCavesVisitedTwice = (path, cave) => {
  const pathWithoutBigCaves = [...path, cave].filter(c => c === c.toLowerCase())
  return new Set(pathWithoutBigCaves).size + 1 < pathWithoutBigCaves.length
}

// part 1
export const travel = ({ currentPath, caves, paths }) => {
  const currentCave = currentPath.at(-1)

  if (currentCave === 'end') {
    paths.push(currentPath)
    return { currentPath, caves, paths }
  }

  return caves[currentCave]
    .filter(cave => cave === cave.toUpperCase() || !currentPath.includes(cave))
    .reduce((result, cave) => {
      return travel({ currentPath: [...currentPath, cave], caves: caves, paths: result.paths })
    }, { currentPath, caves, paths })
}

export const parseCaves = (input) => input
  .split('\n')
  .reduce((caves, line) => {
    const [start, end] = line.split('-')
    caves[start] === undefined ? caves[start] = [end] : caves[start] = [...caves[start], end]
    if (start !== 'start' && end !== 'end') {
      caves[end] === undefined ? caves[end] = [start] : caves[end] = [...caves[end], start]
    }
    return caves
  }, {})
