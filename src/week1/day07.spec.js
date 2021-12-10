import { dailyInput } from '../dailyInput.js'

const minimumFuelSpentToAlign = (crabs) => {
  const possibleOutcomes = crabs.map(c => fuelSpent(crabs, c))
  return Math.min(...possibleOutcomes)
}

const fuelSpent = (crabs, position) => crabs
  .map(c => Math.abs(c - position))
  .reduce((sum, crab) => sum + crab)

const minimumFuelSpentAtConstantRateToAlign = (crabs) => {
  const possibleOutcomes = rangeOf(crabs)
    .map(c => fuelSpentAtConstantRate(crabs, c))
  return Math.min(...possibleOutcomes)
}

const fuelSpentAtConstantRate = (crabs, position) => crabs
  .map(c => constantRateOf(Math.abs(c - position)))
  .reduce((sum, crab) => sum + crab)

const constantRateOf = (p) => Array.from(Array(p).keys())
  .map(i => i + 1)
  .reduce((sum, i) => sum + i, 0)

const rangeOf = (array) => [...Array(Math.max(...array) - Math.min(...array)).keys()].map(i => i + 1)

describe('Day 7: The Treachery of Whales', () => {
  let input
  before('get input', async () => {
    input = (await dailyInput(7)).split(',').map(i => parseInt(i))
  })

  const example = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

  describe('Part 1: How much fuel must they spend to align to that position?', () => {
    it('calculates the fuel spent to moves crab subs to given position', () => {
      expect(fuelSpent(example, 2)).to.equal(37)
      expect(fuelSpent(example, 1)).to.equal(41)
      expect(fuelSpent(example, 3)).to.equal(39)
      expect(fuelSpent(example, 10)).to.equal(71)
    })

    it('solves example', () => {
      expect(minimumFuelSpentToAlign(example)).to.equal(37)
    })

    it('solves it', () => {
      expect(minimumFuelSpentToAlign(input)).to.equal(349812)
    })
  })

  describe('Part 2: How much fuel must they spend to align to that position?', () => {
    it('calculates 5+4+3+2+1 = 15 for 5', () => {
      expect(constantRateOf(5)).to.equal(15)
    })

    it('creates a range from array min and max', () => {
      expect(rangeOf(example)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    })

    it('calculates the fuel spent to moves crab subs to given position', () => {
      expect(fuelSpentAtConstantRate(example, 5)).to.equal(168)
      expect(fuelSpentAtConstantRate(example, 2)).to.equal(206)
    })

    it('solves example', () => {
      expect(minimumFuelSpentAtConstantRateToAlign(example)).to.equal(168)
    })

    // 39 secs to run
    // it('solves it', () => {
    //   expect(minimumFuelSpentAtConstantRateToAlign(input)).to.equal(99763899)
    // })
  })
})
