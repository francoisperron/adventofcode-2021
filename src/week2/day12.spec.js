import { dailyInput } from '../dailyInput.js'
import { parseCaves, smallCavesVisitedTwice, travel, travel2 } from './day12.js'

describe('Day 12: Passage Pathing', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(12)
  })

  const example =
    'start-A\n' +
    'start-b\n' +
    'A-c\n' +
    'A-b\n' +
    'b-d\n' +
    'A-end\n' +
    'b-end'

  describe('Part 1: How many paths through this cave system are there that visit small caves at most once?', () => {
    it('parses caves', () => {
      expect(parseCaves(example)).to.deep.equal({
        'start': ['A', 'b'],
        'A': ['c', 'b', 'end'],
        'b': ['A', 'd', 'end'],
        'c': ['A'],
        'd': ['b']
      })
    })

    it('travels from start to ends', () => {
      const caves = parseCaves(example)
      const currentPath = ['start']
      const paths = []

      expect(travel({ currentPath, caves, paths }).paths.length).to.equal(10)
    })

    it('solves it', () => {
      const caves = parseCaves(input)
      const currentPath = ['start']
      const paths = []

      expect(travel({ currentPath, caves, paths }).paths.length).to.equal(4186)
    })
  })

  describe('Part 2: how many paths through this cave system are there?', () => {
    it('determines when any 2 smalls caves has already been visited', () => {
      expect(smallCavesVisitedTwice(['A', 'A', 'A'], 'c')).to.equal(false)

      expect(smallCavesVisitedTwice(['b', 'b', 'c'], 'c')).to.equal(true)
      expect(smallCavesVisitedTwice(['b', 'b', 'c'], 'b')).to.equal(true)
      expect(smallCavesVisitedTwice(['b', 'b', 'c'], 'd')).to.equal(false)

      expect(smallCavesVisitedTwice(['b', 'b'], 'b')).to.equal(true)
      expect(smallCavesVisitedTwice(['b', 'b'], 'c')).to.equal(false)
    })

    it('solves example', () => {
      const caves = parseCaves(example)
      const currentPath = ['start']
      const paths = []

      expect(travel2({ currentPath, caves, paths }).paths.length).to.equal(36)
    })

    it('solves larger example', () => {
      const larger =
        'fs-end\n' +
        'he-DX\n' +
        'fs-he\n' +
        'start-DX\n' +
        'pj-DX\n' +
        'end-zg\n' +
        'zg-sl\n' +
        'zg-pj\n' +
        'pj-he\n' +
        'RW-he\n' +
        'fs-DX\n' +
        'pj-RW\n' +
        'zg-RW\n' +
        'start-pj\n' +
        'he-WI\n' +
        'zg-he\n' +
        'pj-fs\n' +
        'start-RW'

      const caves = parseCaves(larger)
      const currentPath = ['start']
      const paths = []

      expect(travel2({ currentPath, caves, paths }).paths.length).to.equal(3509)
    })

    it('solves it', () => {
      const caves = parseCaves(input)
      const currentPath = ['start']
      const paths = []

      expect(travel2({ currentPath, caves, paths }).paths.length).to.equal(92111)
    })
  })
})
