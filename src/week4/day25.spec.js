import { dailyInput } from '../dailyInput.js'
import { moveCucumberLine, moveCucumbers, stepsBeforeLanding } from './day25.js'

describe('Day 25: Sea Cucumber', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(25)
  })
  describe('Part 1: What is the first step on which no sea cucumbers move?', () => {
    it('moves east facing cucumbers', () => {
      expect(moveCucumberLine('...>>>>>...', '>')).to.equal('...>>>>.>..')
      expect(moveCucumberLine('...>>>>.>..', '>')).to.equal('...>>>.>.>.')
      expect(moveCucumberLine('...>>>.>.>.', '>')).to.equal('...>>.>.>.>')
      expect(moveCucumberLine('...>>.>.>.>', '>')).to.equal('>..>.>.>.>.')
    })

    it('moves cucumbers', () => {
      const cucumbers = [
        '.>',
        '.v'
      ]
      const expected = [
        '>v',
        '..'
      ]
      expect(moveCucumbers(cucumbers)).to.deep.equal(expected)
    })

    it('solves example', () => {
      const example =
        'v...>>.vv>\n' +
        '.vv>>.vv..\n' +
        '>>.>v>...v\n' +
        '>>v>>.>.v.\n' +
        'v>v.vv.v..\n' +
        '>.>>..v...\n' +
        '.vv..>.>v.\n' +
        'v.v..>>v.v\n' +
        '....v..v.>'

      expect(stepsBeforeLanding(example)).to.equal(58)
    })

    it('solves it', () => {
      expect(stepsBeforeLanding(input)).to.equal(486  )
    })
  })
})
