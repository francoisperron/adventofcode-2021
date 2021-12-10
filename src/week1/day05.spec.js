import { dailyInputLines } from '../dailyInput.js'
import { numberOfPointsWithTwoLinesOverlapping, parseLineSegment } from './day05.js'

describe('Day 5: Hydrothermal Venture', () => {

  let input
  before('get input', async () => {
    input = await dailyInputLines(5)
  })

  const example = ['0,9 -> 5,9', '8,0 -> 0,8', '9,4 -> 3,4', '2,2 -> 2,1', '7,0 -> 7,4', '6,4 -> 2,0', '0,9 -> 2,9', '3,4 -> 1,4', '0,0 -> 8,8', '5,5 -> 8,2']

  describe('Part 1: At how many points do at least two lines overlap?', () => {
    it('parses input to vertical lines and horizontal lines', () => {
      expect(parseLineSegment('1,1 -> 1,3')).to.deep.equal([[1, 1], [1, 2], [1, 3]])
      expect(parseLineSegment('1,3 -> 1,1')).to.deep.equal([[1, 1], [1, 2], [1, 3]])
      expect(parseLineSegment('1,1 -> 3,1')).to.deep.equal([[1, 1], [2, 1], [3, 1]])
      expect(parseLineSegment('3,1 -> 1,1')).to.deep.equal([[1, 1], [2, 1], [3, 1]])
    })

    it('solves example', () => {
      expect(numberOfPointsWithTwoLinesOverlapping(example)).to.equal(5)
    })

    it('solves it', () => {
      expect(numberOfPointsWithTwoLinesOverlapping(input)).to.equal(7085)
    })
  })

  describe('Part 2: ', () => {
    it('parses input to diagonal lines', () => {
      expect(parseLineSegment('1,1 -> 3,3', true)).to.deep.equal([[1, 1], [2, 2], [3, 3]])
      expect(parseLineSegment('3,3 -> 1,1', true)).to.deep.equal([[1, 1], [2, 2], [3, 3]])
      expect(parseLineSegment('9,7 -> 7,9', true)).to.deep.equal([[7, 9], [8, 8], [9, 7]])
      expect(parseLineSegment('7,9 -> 9,7', true)).to.deep.equal([[7, 9], [8, 8], [9, 7]])
    })

    it('solves example', () => {
      expect(numberOfPointsWithTwoLinesOverlapping(example, true)).to.equal(12)
    })

    it('solves it', () => {
      expect(numberOfPointsWithTwoLinesOverlapping(input, true)).to.equal(20271)
    })
  })
})
