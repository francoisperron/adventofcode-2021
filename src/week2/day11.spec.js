import { dailyInput } from '../dailyInput.js'
import { flashDance, flashesAfterLoops, flashesSimultaneously, increaseEnergyLevel } from './day11.js'

describe('Day 11: Dumbo Octopus', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(11)
  })

  const example =
    '5483143223\n' +
    '2745854711\n' +
    '5264556173\n' +
    '6141336146\n' +
    '6357385478\n' +
    '4167524645\n' +
    '2176841721\n' +
    '6882881134\n' +
    '4846848554\n' +
    '5283751526'

  describe('Part 1: How many total flashes are there after 100 steps?', () => {
    it('increases energy level', () => {
      const simple = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
      const result = [[1, 1, 1], [1, 2, 1], [1, 1, 1]]
      expect(increaseEnergyLevel(simple)).to.deep.equal(result)
    })

    it('calculates simple flashes', () => {
      const simple = [[0, 0, 0], [0, 9, 0], [0, 0, 0]]
      const result = [[2, 2, 2], [2, 0, 2], [2, 2, 2]]
      const data = flashDance({ octopus: simple, flashes: 0 })

      expect(data.octopus).to.deep.equal(result)
      expect(data.flashes).to.equal(1)
    })

    it('calculates corners', () => {
      const simple = [[9, 9, 9], [9, 0, 9], [9, 9, 9]]
      const result = [[0, 0, 0], [0, 9, 0], [0, 0, 0]]
      const data = flashDance({ octopus: simple, flashes: 0 })

      expect(data.octopus).to.deep.equal(result)
      expect(data.flashes).to.equal(8)
    })

    it('calculates with loops', () => {
      const simple = [[9, 9, 9], [9, 1, 9], [9, 9, 9]]
      const result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
      const data = flashDance({ octopus: simple, flashes: 0 })

      expect(data.octopus).to.deep.equal(result)
      expect(data.flashes).to.equal(9)
    })

    it('solves example', () => {
      expect(flashesAfterLoops(100, example)).to.equal(1656)
    })

    it('solves it', () => {
      expect(flashesAfterLoops(100, input)).to.equal(1785)
    })
  })

  describe('Part 2: What is the first step during which all octopuses flash?', () => {
    it('solves example', () => {
      expect(flashesSimultaneously(example)).to.equal(195)
    })

    it('solves is', () => {
      expect(flashesSimultaneously(input)).to.equal(354)
    })
  })
})
