import { dailyInputLines } from '../dailyInput.js'
import { co2ScrubberRating, keepCommonBitAt, lifeSupportRating, mostCommonBitAt, oxygenGeneratorRating, parseInput, powerConsumption } from './day03.js'

describe('Day 3: Binary Diagnostic', () => {

  let input
  before('get input', async () => {
    input = await dailyInputLines(3)
  })

  describe('Part 1: What is the power consumption of the submarine?', () => {
    it('finds most common bit for position', () => {
      const report = [[0, 0], [1, 1], [1, 0]]

      expect(mostCommonBitAt(0, report)).to.equal(1)
      expect(mostCommonBitAt(1, report)).to.equal(0)
    })

    it('solves simple', () => {
      const report = ['00', '11', '10']

      expect(powerConsumption(report)).to.equal(2)
    })

    it('solves example', () => {
      const report = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']

      expect(powerConsumption(report)).to.equal(198)
    })

    it('solves it', () => {
      expect(powerConsumption(input)).to.equal(2595824)
    })
  })

  describe('Part 2: What is the life support rating of the submarine?', () => {
    it('keeps most common bit', () => {
      const report = [[0, 0], [1, 1], [1, 0]]

      expect(keepCommonBitAt('most', 0, report)).to.deep.equal([[1, 1], [1, 0]])
    })

    it('finds oxygen generator rating', () => {
      const report = [[0, 0], [1, 1], [1, 0]]

      expect(oxygenGeneratorRating(report)).to.deep.equal([1, 1])
    })

    it('solves example', () => {
      const report = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']

      expect(oxygenGeneratorRating(parseInput(report))).to.deep.equal([1, 0, 1, 1, 1])
      expect(co2ScrubberRating(parseInput(report))).to.deep.equal([0, 1, 0, 1, 0])
      expect(lifeSupportRating(report)).to.equal(230)
    })

    it('solves it', () => {
      expect(lifeSupportRating(input)).to.equal(2135254)
    })
  })
})
