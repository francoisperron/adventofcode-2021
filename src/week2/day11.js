// part 1
export const flashesAfterLoops = (loops, input) => rangeOf(loops)
  .reduce((data) => flashDance(data), parseOctopus(input))
  .flashes

// part 2
export const flashesSimultaneously = input => flashesSimultaneouslyRecurse(parseOctopus(input), 0)
const flashesSimultaneouslyRecurse = (data, step) =>
  octopusSynchronized(data.octopus)
    ? step
    : flashesSimultaneouslyRecurse(flashDance(data), step + 1)


export const flashDance = ({ octopus, flashes }) => {
  let newOctopus = increaseEnergyLevel(octopus)

  const flashed = []
  let previousFlashes = -1
  while (flashed.length !== previousFlashes) {
    previousFlashes = flashed.length

    for (let x = 0; x < newOctopus.length; x++) {
      for (let y = 0; y < newOctopus[x].length; y++) {
        if (newOctopus[x][y] > 9 && !flashed.includes(hash(x, y))) {
          flashed.push(hash(x, y))

          increaseEnergyLevelAt(x + 1, y - 1, newOctopus)
          increaseEnergyLevelAt(x, y - 1, newOctopus)
          increaseEnergyLevelAt(x - 1, y - 1, newOctopus)

          increaseEnergyLevelAt(x + 1, y, newOctopus)
          increaseEnergyLevelAt(x - 1, y, newOctopus)

          increaseEnergyLevelAt(x + 1, y + 1, newOctopus)
          increaseEnergyLevelAt(x, y + 1, newOctopus)
          increaseEnergyLevelAt(x - 1, y + 1, newOctopus)
        }
      }
    }
  }

  newOctopus = resetFlashedOctopus(newOctopus)

  return { octopus: newOctopus, flashes: flashes + flashed.length }
}

const parseOctopus = input => ({
  octopus: input.split('\n').map(row => row.split('').map(i => parseInt(i))),
  flashes: 0
})

export const increaseEnergyLevel = octopus => octopus.map((row, x) => row.map((_, y) => octopus[x][y] + 1))
const resetFlashedOctopus = octopus => octopus.map((row, x) => row.map((_, y) => octopus[x][y] > 9 ? 0 : octopus[x][y]))
const octopusSynchronized = octopus => octopus.every((row, x) => row.every((_, y) => octopus[x][y] === 0))
const increaseEnergyLevelAt = (x, y, octopus) => {
  if (octopus[x] !== undefined && octopus[x][y] !== undefined)
    octopus[x][y]++
}

const rangeOf = loops => Array.from(Array(loops).keys())
const hash = (x, y) => '' + x + y
