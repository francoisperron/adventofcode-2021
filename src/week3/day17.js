export const fireProbeFindingAllVelocityThatHits = input => fireProbes(input)
    .reduce((hits, result) => result.hits ? hits + 1 : hits, 0)

export const fireProbeFindingHighestY = input => fireProbes(input)
    .filter(result => result.hits)
    .map(result => highestYOf(result.positions))
    .reduce((highestY, y) => highestY < y ? y : highestY, 0)

const fireProbes = input => {
  const target = parseTargetArea(input)

  const velocities = range(1, target.maxX + 1)
    .map(x => range(target.minY, Math.abs(target.minY)).map(y => xy(x, y)))
    .flat()

  return velocities
    .map(velocity => fireProbe({ target, position: xy(0, 0), velocity, positions: [] }))
}

export const fireProbe = ({ target, position, velocity, positions }) => {
  if (hitsTarget(position, target))
    return { position, velocity, positions: [...positions, position], hits: true }
  if (missesTarget(position, target))
    return { position, velocity, positions: [...positions, position], hits: false }

  return fireProbe({
    target,
    position: applyVelocity(position, velocity),
    velocity: applyDragAndGravity(velocity),
    positions: [...positions, position]
  })
}

export const hitsTarget = (position, target) =>
  target.minX <= position.x && position.x <= target.maxX
  && target.minY <= position.y && position.y <= target.maxY

export const missesTarget = (position, target) => position.y < target.minY

const applyVelocity = (position, velocity) => ({
  x: position.x + velocity.x,
  y: position.y + velocity.y
})

export const applyDragAndGravity = velocity => ({
  x: velocity.x > 0
    ? velocity.x - 1
    : velocity.x < 0
      ? velocity.x + 1
      : velocity.x,
  y: velocity.y - 1
})

export const parseTargetArea = input => {
  const regex = /target area: x=(?<minX>[0-9]+)..(?<maxX>[0-9]+), y=(?<minY>-[0-9]+)..(?<maxY>-[0-9]+)/
  const groups = input.match(regex).groups
  return {
    minX: parseInt(groups['minX']),
    maxX: parseInt(groups['maxX']),
    minY: parseInt(groups['minY']),
    maxY: parseInt(groups['maxY'])
  }
}

const range = (start, end) => Array(end - start + 1).fill(0).map((_, idx) => start + idx)
export const highestYOf = positions => Math.max(...positions.map(p => p.y))
export const xy = (x, y) => ({ x, y })
