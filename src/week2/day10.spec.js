import { dailyInputLines } from '../dailyInput.js'
import { calculateCompletionScore, completeIncompleteLine, firstIllegalCharacter, middleScore, syntaxErrorScore } from './day10.js'

describe('Day 10: Syntax Scoring', () => {
  let input
  before('get input', async () => {
    input = await dailyInputLines(10)
  })

  const example = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'
  ]

  describe('Part 1: What is the total syntax error score for those errors?', () => {
    it('determines first illegal character', () => {
      expect(firstIllegalCharacter('(]')).to.equal(']')
      expect(firstIllegalCharacter('{()()()>')).to.equal('>')
      expect(firstIllegalCharacter('(((()))}')).to.equal('}')
      expect(firstIllegalCharacter('<([]){()}[{}])')).to.equal(')')

      expect(firstIllegalCharacter('{([(<{}[<>[]}>{[]{[(<()>')).to.equal('}')
      expect(firstIllegalCharacter('[[<[([]))<([[{}[[()]]]')).to.equal(')')
    })

    it('solves example', () => {
      expect(syntaxErrorScore(example)).to.equal(26397)
    })

    it('solves it', () => {
      expect(syntaxErrorScore(input)).to.equal(364389)
    })
  })

  describe('Part 2: What is the middle score?', () => {
    it('completes incomplete lines', () => {
      expect(completeIncompleteLine('[({(<(())[]>[[{[]{<()<>>')).to.equal('}}]])})]')
      expect(completeIncompleteLine('[(()[<>])]({[<{<<[]>>(')).to.equal(')}>]})')
    })

    it('calculates completion score', () => {
      expect(calculateCompletionScore('])}>')).to.equal(294)
    })

    it('solves example', () => {
      expect(middleScore(example)).to.equal(288957)
    })

    it('solves it', () => {
      expect(middleScore(input)).to.equal(2870201088)
    })
  })
})
