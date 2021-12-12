import { dailyInput } from '../dailyInput.js'
import { parseCaves, smallCavesVisitedTwice, visitCaveSystemPart1, visitCaveSystemPart2 } from './day12.js'

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

    it('parses caves ignoring start as an end', () => {
      expect(parseCaves(input)).to.deep.equal({
        'CV': ['mk', 'gm', 'kt', 'ml'],
        'IK': ['gm', 'mk', 'ml'],
        'VS': ['ca'],
        'ca': ['sk', 'sx', 'VS', 'kt', 'end', 'ml'],
        'end': ['sx', 'sk', 'ca'],
        'gm': ['IK', 'sk', 'CV', 'ml'],
        'gy': ['sx'],
        'kt': ['sk', 'ml', 'ca', 'sx', 'CV'],
        'mk': ['CV', 'sx', 'IK', 'ml'],
        'ml': ['kt', 'ca', 'mk', 'CV', 'gm', 'IK'],
        'sk': ['gm', 'ca', 'kt', 'end'],
        'start': ['gm', 'CV', 'IK'],
        'sx': ['mk', 'ca', 'end', 'gy', 'kt']
      })
    })

    it('travels from start to ends', () => {
      expect(visitCaveSystemPart1(example)).to.equal(10)
    })

    it('solves it', () => {
      expect(visitCaveSystemPart1(input)).to.equal(4186)
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
      expect(visitCaveSystemPart2(example)).to.equal(36)
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

      expect(visitCaveSystemPart2(larger)).to.equal(3509)
    })

    it('solves it', () => {
      expect(visitCaveSystemPart2(input)).to.equal(92111)
    })
  })
})
