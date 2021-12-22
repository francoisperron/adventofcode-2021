export const executeRebootSteps = input => {

  let steps = parseRebootSteps(input)
  steps = removeStepsOutside(steps)

  const cubes = steps.reduce((cubes, step) => {
    range(step.minX, step.maxX).map(x => {
      range(step.minY, step.maxY).map(y => {
        range(step.minZ, step.maxZ).map(z => {
          cubes[hash(x, y, z)] = step.state
        })
      })
    })
    return cubes
  }, {})

  return Object.values(cubes).filter(cube => cube === 1).length
}

export const removeStepsOutside = steps => steps
  .filter(step =>
    step.minX >= -50 && step.maxX <= 50 &&
    step.minY >= -50 && step.maxY <= 50 &&
    step.minZ >= -50 && step.maxZ <= 50)

export const parseRebootSteps = input => input.map(parseRebootStep)

const parseRebootStep = line => {
  const regex = /(?<state>[a-zA-Z]+) x=(?<minX>-?\d+)..(?<maxX>-?\d+),y=(?<minY>-?\d+)..(?<maxY>-?\d+),z=(?<minZ>-?\d+)..(?<maxZ>-?\d+)/
  const groups = line.match(regex).groups
  return {
    state: groups['state'] === 'on' ? 1 : 0,
    minX: parseInt(groups['minX']), maxX: parseInt(groups['maxX']),
    minY: parseInt(groups['minY']), maxY: parseInt(groups['maxY']),
    minZ: parseInt(groups['minZ']), maxZ: parseInt(groups['maxZ'])
  }
}

const range = (start, end) => Array(end - start + 1).fill(0).map((_, idx) => start + idx)
const hash = (x, y, z) => x + ',' + y + ',' + z
