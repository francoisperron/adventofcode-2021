// part 2

export const executeFullRebootSteps = input => parseRebootSteps(input)
  .reduce((intersections, step) => findIntersections(intersections, step), [])
  .map(cubeValue).reduce(sum)

const findIntersections = (intersections, step) => {
  const newIntersections = intersections
    .map(intersection => intersect(intersection, step))
    .filter(newIntersection => newIntersection !== null)

  if (step.on) {
    newIntersections.push(step)
  }
  return [...intersections, ...newIntersections]
}


export const intersect = (cube1, cube2) => {
  const intersection = {
    on: !cube1.on,
    x: { min: Math.max(cube1.x.min, cube2.x.min), max: Math.min(cube1.x.max, cube2.x.max) },
    y: { min: Math.max(cube1.y.min, cube2.y.min), max: Math.min(cube1.y.max, cube2.y.max) },
    z: { min: Math.max(cube1.z.min, cube2.z.min), max: Math.min(cube1.z.max, cube2.z.max) }
  }
  return intersection.x.min > intersection.x.max || intersection.y.min > intersection.y.max || intersection.z.min > intersection.z.max
    ? null
    : intersection
}

export const cubeValue = cube => (cube.on ? 1 : -1) *
  (cube.x.max + 1 - cube.x.min) *
  (cube.y.max + 1 - cube.y.min) *
  (cube.z.max + 1 - cube.z.min)

// part 1
export const executeRebootSteps = input => {

  let steps = parseRebootSteps(input)
  steps = removeStepsOutside(steps)

  const cubes = steps.reduce((cubes, step) => {
    range(step.x.min, step.x.max).map(x => {
      range(step.y.min, step.y.max).map(y => {
        range(step.z.min, step.z.max).map(z => {
          cubes[hash(x, y, z)] = step.on
        })
      })
    })
    return cubes
  }, {})

  return Object.values(cubes).filter(on => on === true).length
}

export const removeStepsOutside = steps => steps
  .filter(step =>
    step.x.min >= -50 && step.x.max <= 50 &&
    step.y.min >= -50 && step.y.max <= 50 &&
    step.z.min >= -50 && step.z.max <= 50)

export const parseRebootSteps = input => input.map(parseRebootStep)

const parseRebootStep = line => {
  const regex = /(?<on>[a-zA-Z]+) x=(?<minX>-?\d+)..(?<maxX>-?\d+),y=(?<minY>-?\d+)..(?<maxY>-?\d+),z=(?<minZ>-?\d+)..(?<maxZ>-?\d+)/
  const groups = line.match(regex).groups
  return {
    on: groups['on'] === 'on',
    x: { min: parseInt(groups['minX']), max: parseInt(groups['maxX']) },
    y: { min: parseInt(groups['minY']), max: parseInt(groups['maxY']) },
    z: { min: parseInt(groups['minZ']), max: parseInt(groups['maxZ']) }
  }
}

const range = (start, end) => Array(end - start + 1).fill(0).map((_, idx) => start + idx)
const hash = (x, y, z) => x + ',' + y + ',' + z
const sum = (sum, on) => sum + on
