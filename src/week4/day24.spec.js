import { expect } from 'chai'
import { dailyInputLines } from '../dailyInput.js'
import { findLargestModelNumberAcceptedByMonad, findSmallestModelNumberAcceptedByMonad, nextLargestNumber, runInstruction, runMonad } from './day24.js'

describe('Day 24: Arithmetic Logic Unit', () => {
  let input
  before('get input', async () => {
    input = await dailyInputLines(24)
  })

  describe('Part 1: What is the largest model number accepted by MONAD?', () => {
    it('reads next input value and write it to variable w', () => {
      const state = { w: 0, x: 0, y: 0, z: 0, values: [2, 3, 4] }
      let result = runInstruction('inp w', state)

      expect(result.w).to.equal(2)
      expect(result.values).to.deep.equal([3, 4])
    })

    it('adds x = x + y', () => {
      const state = { w: 0, x: 4, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('add x y', state)

      expect(result.x).to.equal(7)
    })

    it('adds 25 to x', () => {
      const state = { w: 0, x: 4, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('add y 25', state)

      expect(result.y).to.equal(28)
    })

    it('multiplies x = x * y', () => {
      const state = { w: 0, x: 4, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('mul x y', state)

      expect(result.x).to.equal(12)
    })

    it('multiplies x = x * 25', () => {
      const state = { w: 0, x: 4, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('mul x 25', state)

      expect(result.x).to.equal(100)
    })

    it('divides x = x / y', () => {
      const state = { w: 0, x: 7, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('div x y', state)

      expect(result.x).to.equal(2)
    })

    it('divides by 0 crashes', () => {
      const state = { w: 0, x: 7, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('div x 0', state)

      expect(result.crash).to.equal(true)
    })

    it('modulos x = x % y', () => {
      const state = { w: 0, x: 7, y: 3, z: 0, values: [2, 3, 4] }
      let result = runInstruction('mod x y', state)

      expect(result.x).to.equal(1)
    })

    it('modulos with x < 0 or y <= 0 crashes', () => {
      let result = runInstruction('mod x -1', { w: 0, x: 7, y: 3, z: 0, values: [2, 3, 4] })
      expect(result.crash).to.equal(true)

      result = runInstruction('mod x y', { w: 0, x: 7, y: 0, z: 0, values: [2, 3, 4] })
      expect(result.crash).to.equal(true)

      result = runInstruction('mod x y', { w: 0, x: -1, y: 0, z: 0, values: [2, 3, 4] })
      expect(result.crash).to.equal(true)
    })

    it('checks for equality x = y => 1, x != y > 0', () => {
      let result = runInstruction('eql x y', { w: 0, x: 3, y: 3, z: 0, values: [2, 3, 4] })
      expect(result.x).to.equal(1)

      result = runInstruction('eql x y', { w: 0, x: 3, y: 4, z: 0, values: [2, 3, 4] })
      expect(result.x).to.equal(0)

      result = runInstruction('eql x 3', { w: 0, x: 3, y: 4, z: 0, values: [2, 3, 4] })
      expect(result.x).to.equal(1)
    })

    it('finds the next largest number without a 0', () => {
      expect(nextLargestNumber(99999999999999)).to.equal(99999999999998)
      expect(nextLargestNumber(99999999999991)).to.equal(99999999999989)
      expect(nextLargestNumber(99999999999911)).to.equal(99999999999899)
    })

    it('runs monad program', () => {
      expect(runMonad(99999999999999, input)).to.equal(false)
      expect(runMonad(91699394894995, input)).to.equal(true)
    })

    it('solves it', () => {
      const number = findLargestModelNumberAcceptedByMonad(input, 91699394894995 + 1)
      expect(number).to.equal(91699394894995)
    })
  })

  describe('Part 2: What is the smallest model number accepted by MONAD?', () => {
    it('solves it', () => {
      const number = findSmallestModelNumberAcceptedByMonad(input, 51147191161261 - 1)
      expect(number).to.equal(51147191161261)
    })
  })
})
