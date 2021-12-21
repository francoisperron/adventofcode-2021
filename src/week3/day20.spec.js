import { dailyInput } from '../dailyInput.js'
import { enhanceImageMultipleTimes, parseAlgoAndImage, transformationIndexOf } from './day20.js'

describe('Day 20: Trench Map', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(20)
  })

  const example =
    '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#\n' +
    '\n' +
    '#..#.\n' +
    '#....\n' +
    '##..#\n' +
    '..#..\n' +
    '..###'

  describe('Part 1: How many pixels are lit in the resulting image? (2 times)', () => {
    it('parses image enhancement algorithm and image', () => {
      const { algo, image } = parseAlgoAndImage(input)

      expect(algo.length).to.equal(512)
      expect(image.length).to.equal(100)
      expect(image[0].length).to.equal(100)
    })

    it('finds transformation index', () => {
      const { image } = parseAlgoAndImage(input)

      expect(transformationIndexOf(2, 2, image, '0')).to.equal(382)
      expect(transformationIndexOf(2, 2, image, '1')).to.equal(382)
      expect(transformationIndexOf(0, 0, image, '0')).to.equal(1)
      expect(transformationIndexOf(0, 0, image, '1')).to.equal(485)
      expect(transformationIndexOf(99, 99, image, '0')).to.equal(288)
      expect(transformationIndexOf(99, 99, image, '1')).to.equal(367)
    })

    it('solves example', () => {
      expect(enhanceImageMultipleTimes(example, 2)).to.equal(35)
    })

    it('solves it', () => {
      expect(enhanceImageMultipleTimes(input, 2)).to.equal(5065)
    })
  })

  describe('Part 2: How many pixels are lit in the resulting image? (50 times)', () => {
    it('solves example', () => {
      expect(enhanceImageMultipleTimes(example, 50)).to.equal(3351)
    })

    it('solves it', () => {
      expect(enhanceImageMultipleTimes(input, 50)).to.equal(14790)
    })
  })
})
