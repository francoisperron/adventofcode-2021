import { expect } from 'chai'
import { dailyInput } from './dailyInput.js'
import { bingo, lastWinningBoardScore, parseBingo, sumOfNotDrawnNumbers, winningBoardScore } from './day04.js'

describe('Day 4: Giant Squid', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(4)
  })

  const example =
    '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n' +
    '\n' +
    '22 13 17 11  0\n' +
    ' 8  2 23  4 24\n' +
    '21  9 14 16  7\n' +
    ' 6 10  3 18  5\n' +
    ' 1 12 20 15 19\n' +
    '\n' +
    ' 3 15  0  2 22\n' +
    ' 9 18 13 17  5\n' +
    '19  8  7 25 23\n' +
    '20 11 10 24  4\n' +
    '14 21 16 12  6\n' +
    '\n' +
    '14 21 17 24  4\n' +
    '10 16 15  9 19\n' +
    '18  8 23 26 20\n' +
    '22 11 13  6  5\n' +
    ' 2  0 12  3  7'

  describe('Part 1: ', () => {
    it('parses input into numbers and boards', () => {
      const { numbers, boards } = parseBingo(example)
      expect(numbers).to.deep.equal([7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1])
      expect(boards.length).to.equal(3)
      expect(boards[0]).to.deep.equal([
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [21, 9, 14, 16, 7],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19]
      ])
    })

    it('determines when board wins', () => {
      const board = [
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [21, 9, 14, 16, 7],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19]
      ]
      const winsByRow = [8, 2, 23, 4, 24, 99]
      expect(bingo(board, winsByRow)).to.equal(true)

      const notWinning = [8, 2, 23, 4, 99]
      expect(bingo(board, notWinning)).to.equal(false)

      const winsByColumn = [0, 24, 7, 5, 19]
      expect(bingo(board, winsByColumn)).to.equal(true)
    })

    it('calculates sum of not drawn numbers', () => {
      const board = [
        [14, 21, 17, 24, 4],
        [10, 16, 15, 9, 19],
        [18, 8, 23, 26, 20],
        [22, 11, 13, 6, 5],
        [2, 0, 12, 3, 7]
      ]
      const drawnNumbers = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24]
      expect(sumOfNotDrawnNumbers(board, drawnNumbers)).to.equal(188)
    })

    it('solves example', () => {
      expect(winningBoardScore(example)).to.equal(4512)
    })

    it('solves it', () => {
      expect(winningBoardScore(input)).to.equal(54275)
    })
  })

  describe('Part 2: Figure out which board will win last. Once it wins, what would its final score be?', () => {
    it('finds last winning board', () => {
      expect(lastWinningBoardScore(example)).to.equal(1924)
    })

    it('solves it', () => {
      expect(lastWinningBoardScore(input)).to.equal(13158)
    })
  })
})
