// noinspection SpellCheckingInspection

import { dailyInputLines } from './dailyInput.js'
import { count1478, decodeOutput, decodePart2, decodePatterns, parsePatternsAndOutput } from './day08.js'

describe('Day 8: Seven Segment Search', () => {

  let input
  before('get input', async () => {
    input = await dailyInputLines(8)
  })

  const example = [
    'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
    'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
    'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
    'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
    'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
    'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
    'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
    'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
    'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
    'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
  ]

  describe('Part 1: In the output values, how many times do digits 1, 4, 7, or 8 appear?', () => {
    it('counts output values 1, 4, 7, 8', () => {
      expect(count1478(example)).to.equal(26)
    })

    it('solves it', () => {
      expect(count1478(input)).to.equal(349)
    })
  })

  describe('Part 2: What do you get if you add up all of the output values?', () => {
    it('parses entry and sorts segment\'s letters', () => {
      const entry = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'

      expect(parsePatternsAndOutput(entry)).to.deep.equal({
        patterns: ['abcdefg', 'bcdef', 'acdfg', 'abcdf', 'abd', 'abcdef', 'bcdefg', 'abef', 'abcdeg', 'ab'],
        output: ['bcdef', 'abcdf', 'bcdef', 'abcdf']
      })
    })

    it('decodes patterns', () => {
      const patterns = ['abcdefg', 'bcdef', 'acdfg', 'abcdf', 'abd', 'abcdef', 'bcdefg', 'abef', 'abcdeg', 'ab']
      const decodedPatterns = { 'abcdeg': '0', 'ab': '1', 'acdfg': '2', 'abcdf': '3', 'abef': '4', 'bcdef': '5', 'bcdefg': '6', 'abd': '7', 'abcdefg': '8', 'abcdef': '9' }
      expect(decodePatterns(patterns)).to.deep.equal(decodedPatterns)
    })

    it('decodes output', () => {
      const decodedPatterns = { 'abcdeg': '0', 'ab': '1', 'acdfg': '2', 'abcdf': '3', 'abef': '4', 'bcdef': '5', 'bcdefg': '6', 'abd': '7', 'abcdefg': '8', 'abcdef': '9' }
      const output = ['bcdef', 'abcdf', 'bcdef', 'abcdf']
      expect(decodeOutput({ patterns: decodedPatterns, output: output })).to.equal(5353)
    })

    it('solves example', () => {
      expect(decodePart2(example)).to.equal(61229)
    })

    it('solves it', () => {
      expect(decodePart2(input)).to.equal(1070957)
    })
  })
})
