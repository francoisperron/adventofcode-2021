import { dailyInputLines } from './dailyInput.js'

const parse = command => {
  const commands = {
    'forward': (value) => ({ h: value, d: 0 }),
    'down': (value) => ({ h: 0, d: value }),
    'up': (value) => ({ h: 0, d: -value })
  }

  const direction = command.split(' ')[0]
  const value = parseInt(command.split(' ')[1])

  return commands[direction](value)
}

const dive = commands => {
  const position = commands
    .map(c => parse(c))
    .reduce((position, command) => {
      position.h += command.h
      position.d += command.d
      return position
    }, { h: 0, d: 0 })

  return position.h * position.d
}

const parse2 = (position, command) => {
  const commands = {
    'forward': (value) => ({ h: value, d: position.a * value, a: 0 }),
    'down': (value) => ({ h: 0, d: 0, a: value }),
    'up': (value) => ({ h: 0, d: 0, a: -value })
  }

  const direction = command.split(' ')[0]
  const value = parseInt(command.split(' ')[1])

  let positionChange = commands[direction](value)
  return { h: positionChange.h + position.h, d: positionChange.d + position.d, a: positionChange.a + position.a }
}

const dive2 = commands => {
  const position = commands.reduce((position, command) => parse2(position, command), { h: 0, d: 0, a: 0 })

  return position.h * position.d
}

describe('Day 2: Dive!', () => {

  let input
  before('get input', async () => {
    input = await dailyInputLines(2)
  })

  describe('Part 1: What do you get if you multiply your final horizontal position by your final depth?', () => {
    it('parses commands', () => {
      expect(parse('forward 5')).to.deep.equal({ h: 5, d: 0 })
      expect(parse('down 5')).to.deep.equal({ h: 0, d: 5 })
      expect(parse('up 3')).to.deep.equal({ h: 0, d: -3 })
    })

    it('solves example', () => {
      const example = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
      expect(dive(example)).to.equal(150)
    })

    it('solves it', () => {
      expect(dive(input)).to.equal(1604850)
    })
  })

  describe('Part 2: What do you get if you multiply your final horizontal position by your final depth?', () => {
    it('parses commands', () => {
      expect(parse2({ h: 0, d: 0, a: 0 }, 'forward 5')).to.deep.equal({ h: 5, d: 0, a: 0 })
      expect(parse2({ h: 5, d: 0, a: 0 }, 'down 5')).to.deep.equal({ h: 5, d: 0, a: 5 })
      expect(parse2({ h: 5, d: 0, a: 5 }, 'forward 8')).to.deep.equal({ h: 13, d: 40, a: 5 })
      expect(parse2({ h: 13, d: 40, a: 5 }, 'up 3')).to.deep.equal({ h: 13, d: 40, a: 2 })
      expect(parse2({ h: 13, d: 40, a: 2 }, 'down 8')).to.deep.equal({ h: 13, d: 40, a: 10 })
      expect(parse2({ h: 13, d: 40, a: 10 }, 'forward 2')).to.deep.equal({ h: 15, d: 60, a: 10 })
    })

    it('solves example', () => {
      const example = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
      expect(dive2(example)).to.equal(900)
    })

    it('solves it', () => {
      expect(dive2(input)).to.equal(1685186100)
    })
  })
})
