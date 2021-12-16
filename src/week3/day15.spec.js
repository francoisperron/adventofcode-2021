import { dailyInput } from '../dailyInput.js'
import { buildFullCave, caveLowestRiskLevel, parseCave } from './day15.js'

describe('Day 15: Chiton', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(15)
  })

  const example = '1163751742\n' + '1381373672\n' + '2136511328\n' + '3694931569\n' + '7463417111\n' + '1319128137\n' + '1359912421\n' + '3125421639\n' + '1293138521\n' + '2311944581'

  describe('Part 1: What is the lowest total risk of any path from the top left to the bottom right?', () => {
    it('solves example', () => {
      const cave = parseCave(example)
      expect(caveLowestRiskLevel(cave)).to.equal(40)
    })

    it('solves it', () => {
      const cave = parseCave(input)
      expect(caveLowestRiskLevel(cave)).to.equal(714)
    })
  })

  describe('Part2: Using the full map, what is the lowest total risk of any path from the top left to the bottom right?', () => {
    it('builds full cave from cave', () => {
      const cave = [[8]]
      const expected = [
        [8, 9, 1, 2, 3],
        [9, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7]
      ]
      expect(buildFullCave(cave)).to.deep.equal(expected)
    })

    it('solves example', () => {
      const cave = buildFullCave(parseCave(example))
      expect(caveLowestRiskLevel(cave)).to.equal(315)
    })

    // 2.5 secs
    it('solves it', () => {
      const cave = buildFullCave(parseCave(input))
      expect(caveLowestRiskLevel(cave)).to.equal(2948)
    })
  })
})
