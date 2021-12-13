import { dailyInput } from '../dailyInput.js'

describe('Day 13: Transparent Origami', () => {

  let input
  before('get input', async () => {
    input = await dailyInput(13)
  })

  const example = '6,10\n' + '0,14\n' + '9,10\n' + '0,3\n' + '10,4\n' + '4,11\n' + '6,0\n' + '6,12\n' + '4,1\n' + '0,13\n' + '10,12\n' + '3,4\n' + '3,0\n' + '8,4\n' + '1,10\n' + '2,14\n' + '8,10\n' + '9,0\n' + '\n' + 'fold along y=7\n' + 'fold along x=5'

  describe('Part1: How many dots are visible after completing just the first fold instruction on your transparent paper?', () => {
    it('parses instructions to dots and folds', () => {
      const instructions = parseInstructions(example)

      expect(instructions.dots.length).to.equal(18)
      expect(instructions.folds.length).to.equal(2)
    })

    it('folds paper on y axis', () => {
      const { dots, folds } = parseInstructions(example)

      const folded = fold(dots, folds[0])

      expect(folded.length).to.equal(17)
      expect(folded).to.deep.include({ x: 0, y: 0 })
    })

    it('folds paper in x axis', () => {
      const { dots, folds } = parseInstructions(example)

      const folded = fold(dots, folds[0])
      const foldedTwice = fold(folded, folds[1])

      expect(foldedTwice.length).to.equal(16)
    })

    it('solves it', () => {
      const { dots, folds } = parseInstructions(input)

      const folded = fold(dots, folds[0])

      expect(folded.length).to.equal(720)
    })
  })

  describe('Part 2: What code do you use to activate the infrared thermal imaging camera system?', () => {
    it('prints code', () => {
      const { dots, folds } = parseInstructions(input)

      const result = folds.reduce((dots, f) => fold(dots, f), dots)

      const maxX = result.reduce((max, dot) => max > dot.x ? max : dot.x, 0)
      const maxY = result.reduce((max, dot) => max > dot.y ? max : dot.y, 0)

      const code = []
      for (let y = 0; y < maxY + 1; y++) {
        code[y] = []
        for (let x = 0; x < maxX + 1; x++) {
          code[y][x] = ' '
        }
      }
      for (const dot of result) {
        code[dot.y][dot.x] = '#'
      }

      // AHPRPAUZ
      console.log(code.map(l => l.join('')).join('\n'))
    })
  })
})

const fold = (dots, fold) => fold.axis === 'y'
  ? dots
    .map(dot => dot.y < fold.value ? dot : { x: dot.x, y: fold.value * 2 - dot.y })
    .filter(unique)
  : dots
    .map(dot => dot.x < fold.value ? dot : { x: fold.value * 2 - dot.x, y: dot.y })
    .filter(unique)

const unique = (dot, index, dots) => dots.findIndex(dot2 => (dot2.x === dot.x && dot2.y === dot.y)) === index

const parseInstructions = input => {
  const [dots, folds] = input.split('\n\n').map(i => i.split('\n'))

  const parseDot = dot => {
    const [x, y] = dot.split(',')
    return ({ x: parseInt(x), y: parseInt(y) })
  }
  const parseFold = fold => {
    const [axis, value] = fold.split(' ')[2].split('=')
    return { axis, value: parseInt(value) }
  }

  return { dots: dots.map(dot => parseDot(dot)), folds: folds.map(f => parseFold(f)) }
}

