import { dailyInputLines } from '../dailyInput.js'
import { adds, explodes, magnitudeOf, part1, part2, reduces, splits } from './day18.js'

describe('Day 18: Snailfish', () => {
  let input
  before('get input', async () => {
    input = await dailyInputLines(18)
  })

  const example = ['[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]', '[[[5,[2,8]],4],[5,[[9,9],0]]]', '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]', '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]', '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]', '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]', '[[[[5,4],[7,7]],8],[[8,3],8]]', '[[9,3],[[9,9],[6,[4,9]]]]', '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]', '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]']

  describe('Part 1: What is the magnitude of the final sum?', () => {
    it('adds ', () => {
      expect(adds('[1,2]', '[[3,4],5]')).to.equal('[[1,2],[[3,4],5]]')
      expect(adds('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]')).to.equal('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
    })

    it('explodes', () => {
      expect(explodes('[[[[[9,8],1],2],3],4]')).to.equal('[[[[' + '0,9],' + '2],3],4]')
      expect(explodes('[7,[6,[5,[4,[3,2]]]]]')).to.equal('[7,[6,[5,[7,0]]]]')
      expect(explodes('[[6,[5,[4,[3,2]]]],1]')).to.equal('[[6,[5,[7,0]]],3]')
      expect(explodes('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]')).to.equal('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')
      expect(explodes('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')).to.equal('[[3,[2,[8,0]]],[9,[5,[7,0]]]]')
    })

    it('splits', () => {
      expect(splits('[15,[0,13]]')).to.equal('[[7,8],[0,13]]')
      expect(splits('[[7,8],[0,13]]')).to.equal('[[7,8],[0,[6,7]]]')
    })

    it('reduces', () => {
      expect(reduces('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')).to.equal('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')
    })

    it('finds magnitude', () => {
      expect(magnitudeOf([9, 1])).to.equal(29)
      expect(magnitudeOf([[9, 1], [1, 9]])).to.equal(129)
    })

    it('solves example', () => {
      expect(part1(example)).to.equal(4140)
    })

    it('solves it', () => {
      expect(part1(input)).to.equal(4111)
    })
  })

  describe('Part 2: ', () => {
    it('solves example', () => {
      expect(part2(example)).to.equal(3993)
    })

    it('solves it', () => {
      expect(part2(input)).to.equal(4917)
    })
  })
})
