import { dailyInput } from '../dailyInput.js'
import { countElements, grow, parsePolymer, parsePolymerAndRules, polymerization } from './day14.js'

describe('Day 14: Extended Polymerization', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(14)
  })

  const example = 'NNCB\n' + '\n' + 'CH -> B\n' + 'HH -> N\n' + 'CB -> H\n' + 'NH -> C\n' + 'HB -> C\n' + 'HC -> B\n' + 'HN -> C\n' + 'NN -> C\n' + 'BH -> H\n' + 'NC -> B\n' + 'NB -> B\n' + 'BN -> B\n' + 'BB -> N\n' + 'BC -> B\n' + 'CC -> N\n' + 'CN -> C'

  describe('Part 1: What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?', () => {
    it('parses polymer has pairs', () => {
      const { polymer } = parsePolymerAndRules(example)

      expect(polymer).to.deep.equal({ 'NN': 1, 'NC': 1, 'CB': 1 })
    })

    it('parses rules', () => {
      const { rules } = parsePolymerAndRules(example)

      expect(rules).to.deep.equal({ 'BB': 'N', 'BC': 'B', 'BH': 'H', 'BN': 'B', 'CB': 'H', 'CC': 'N', 'CH': 'B', 'CN': 'C', 'HB': 'C', 'HC': 'B', 'HH': 'N', 'HN': 'C', 'NB': 'B', 'NC': 'B', 'NH': 'C', 'NN': 'C' })
    })

    it('grows polymer based on rules', () => {
      const { rules } = parsePolymerAndRules(example)
      const growWithRules = grow(rules)

      expect(growWithRules(parsePolymer('NNCB'))).to.deep.equal(parsePolymer('NCNBCHB'))
      expect(growWithRules(parsePolymer('NCNBCHB'))).to.deep.equal(parsePolymer('NBCCNBBBCBHCB'))
      expect(growWithRules(parsePolymer('NBCCNBBBCBHCB'))).to.deep.equal(parsePolymer('NBBBCNCCNBBNBNBBCHBHHBCHB'))
      expect(growWithRules(parsePolymer('NBBBCNCCNBBNBNBBCHBHHBCHB'))).to.deep.equal(parsePolymer('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'))
    })

    it('counts elements', () => {
      expect(countElements({ 'NN': 1, 'NC': 1, 'CB': 2 })).to.deep.equal({ 'N': 3, 'C': 3, 'B': 2 })
    })

    it('solves example', () => {
      expect(polymerization(example, 10)).to.equal(1588)
    })

    it('solves it', () => {
      expect(polymerization(input, 10)).to.equal(3697)
    })
  })

  describe('Part 2: What do you get if you take the quantity of the most common element and subtract the quantity of the least common element? (40 steps)', () => {
    it('solves example', () => {
      expect(polymerization(example, 40)).to.equal(2188189693529)
    })

    it('solves it', () => {
      expect(polymerization(input, 40)).to.equal(4371307836157)
    })
  })
})


