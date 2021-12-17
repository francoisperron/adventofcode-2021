import { dailyInput } from '../dailyInput.js'
import { applyDragAndGravity, fireProbe, fireProbeFindingAllVelocityThatHits, fireProbeFindingHighestY, highestYOf, hitsTarget, missesTarget, parseTargetArea, xy } from './day17.js'

describe('Day 17: Trick Shot', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(17)
  })
  const example = 'target area: x=20..30, y=-10..-5'

  describe('Part 1: What is the highest y position it reaches on this trajectory?', () => {

    it('first, lets parse target', () => {
      expect(parseTargetArea(example)).to.deep.equal({ minX: 20, maxX: 30, minY: -10, maxY: -5 })
      expect(parseTargetArea(input)).to.deep.equal({ minX: 265, maxX: 287, minY: -103, maxY: -58 })
    })

    it('second, calculates new velocity due to drag and gravity', () => {
      expect(applyDragAndGravity(xy(7, 2))).to.deep.equal(xy(6, 1))
      expect(applyDragAndGravity(xy(5, 0))).to.deep.equal(xy(4, -1))
      expect(applyDragAndGravity(xy(1, 0))).to.deep.equal(xy(0, -1))
      expect(applyDragAndGravity(xy(-1, 0))).to.deep.equal(xy(0, -1))
      expect(applyDragAndGravity(xy(0, 0))).to.deep.equal(xy(0, -1))
    })

    it('third, determines when it hits target', () => {
      const target = parseTargetArea(example)

      expect(hitsTarget(xy(28, -7), target)).to.equal(true)
      expect(hitsTarget(xy(target.minX - 1, -7), target)).to.equal(false)
      expect(hitsTarget(xy(target.minX, -7), target)).to.equal(true)

      expect(hitsTarget(xy(target.maxX + 1, -7), target)).to.equal(false)
      expect(hitsTarget(xy(target.maxX, -7), target)).to.equal(true)

      expect(hitsTarget(xy(28, target.minY - 1), target)).to.equal(false)
      expect(hitsTarget(xy(28, target.minY), target)).to.equal(true)

      expect(hitsTarget(xy(28, target.maxY + 1), target)).to.equal(false)
      expect(hitsTarget(xy(28, target.maxY), target)).to.equal(true)
    })

    it('... and when it misses target', () => {
      const target = parseTargetArea(example)

      expect(missesTarget(xy(28, -7), target)).to.equal(false)
      expect(missesTarget(xy(target.minX - 1, -5), target)).to.equal(false)
      expect(missesTarget(xy(target.maxX + 1, -5), target)).to.equal(false)
      expect(missesTarget(xy(28, target.minY - 1), target)).to.equal(true)
      expect(missesTarget(xy(28, target.maxY + 1), target)).to.equal(false)
    })

    it('fires the first probe that hits target', () => {
      const target = parseTargetArea(example)
      const data = { target, position: xy(0, 0), velocity: xy(7, 2), positions: [] }
      const result = fireProbe(data)

      expect(result.hits).to.equal(true)
      expect(result.positions.pop()).to.deep.equal(xy(28, -7))
    })

    it('fires the second probe that hits target', () => {
      const target = parseTargetArea(example)
      const data = { target, position: xy(0, 0), velocity: xy(6, 3), positions: [] }
      const result = fireProbe(data)

      expect(result.hits).to.equal(true)
      expect(result.positions.pop()).to.deep.equal(xy(21, -9))
    })

    it('fires the third probe that hits target', () => {
      const target = parseTargetArea(example)
      const data = { target, position: xy(0, 0), velocity: xy(9, 0), positions: [] }
      const result = fireProbe(data)

      expect(result.hits).to.equal(true)
      expect(result.positions.pop()).to.deep.equal(xy(30, -6))
    })

    it('misses with velocity 17,-4', () => {
      const target = parseTargetArea(example)
      const data = { target, position: xy(0, 0), velocity: xy(17, -4), positions: [] }
      const result = fireProbe(data)

      expect(result.hits).to.equal(false)
    })

    it('finds highest Y for velocity 6,9', () => {
      const target = parseTargetArea(example)
      const data = { target, position: xy(0, 0), velocity: xy(6, 9), positions: [] }
      const result = fireProbe(data)

      expect(result.hits).to.equal(true)
      expect(highestYOf(result.positions)).to.equal(45)
    })

    it('solves example', () => {
      expect(fireProbeFindingHighestY(example)).to.equal(45)
    })

    it('solves it', () => {
      expect(fireProbeFindingHighestY(input)).to.equal(5253)
    })
  })

  describe('Part 2: How many distinct initial velocity values cause the probe to be within the target area after any step?', () => {
    it('solves exemple', () => {
      expect(fireProbeFindingAllVelocityThatHits(example)).to.equal(112)
    })

    it('solves it', () => {
      expect(fireProbeFindingAllVelocityThatHits(input)).to.equal(1770)
    })
  })
})
