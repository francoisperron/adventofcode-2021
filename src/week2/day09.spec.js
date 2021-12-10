import { dailyInput } from '../dailyInput.js'
import { isLowPoint, largestBasinsProduct, parseHeightMap, riskLevelOf } from './day09.js'

describe('Day 9: Smoke Basin', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(9)
  })

  const example = '2199943210\n' + '3987894921\n' + '9856789892\n' + '8767896789\n' + '9899965678'

  describe('Part 1: What is the sum of the risk levels of all low points on your heightmap?', () => {
    it('parses height map', () => {
      const heightMap = [[2, 1, 9, 9, 9, 4, 3, 2, 1, 0], [3, 9, 8, 7, 8, 9, 4, 9, 2, 1], [9, 8, 5, 6, 7, 8, 9, 8, 9, 2], [8, 7, 6, 7, 8, 9, 6, 7, 8, 9], [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]]
      expect(parseHeightMap(example)).to.deep.equal(heightMap)
    })

    it('determines if a point is a low point', () => {
      const map = [
        [2, 1, 0],
        [9, 2, 1],
        [8, 9, 2]
      ]
      expect(isLowPoint(0, 1, map)).to.equal(false)
      expect(isLowPoint(0, 2, map)).to.equal(true)
    })

    it('solves example', () => {
      expect(riskLevelOf(example)).to.equal(15)
    })

    it('solves it', () => {
      expect(riskLevelOf(input)).to.equal(607)
    })
  })

  describe('Part 2: What do you get if you multiply together the sizes of the three largest basins?', () => {
    // get low points
    // get basin for each low points
      // for each adjacent
        // skip seen
        // add to seen
        // if < 9 => recurse
    // sort basin
    // multiply 1 ,2 ,3

    it('solves example', () => {
      expect(largestBasinsProduct(example)).to.equal(1134)
    })

    it('solves input', () => {
      expect(largestBasinsProduct(input)).to.equal(900864)
    })
  })
})
