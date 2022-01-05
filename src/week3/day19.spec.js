import fs from 'fs'
import { dailyInput } from '../dailyInput.js'
import { alignScanner, countBeacons, distancesBetween, intersectionsBetween, largestManhattanDistanceBetweenTwoScanners, parseScannersAndBeacons, xyz } from './day19.js'

describe('Day 19: Beacon Scanner', () => {
  let input
  let example
  before('get input', async () => {
    input = await dailyInput(19)
    example = fs.readFileSync('src/week3/day19.example.txt').toString()
  })

  describe('Part 1: How many beacons are there?', () => {
    it('parses scanners and beacons', () => {
      const scanners = parseScannersAndBeacons(example)
      expect(scanners.length).to.equal(5)
      expect(scanners[0].beacons.length).to.equal(25)
      expect(scanners[0].beacons[0]).to.deep.equal({ x: 404, y: -588, z: -901 })
    })

    it('calculates triangulated distances to other beacons', () => {
      const beacons = [xyz(0, 2, 0), xyz(4, 1, 0), xyz(3, 3, 0)]

      distancesBetween(beacons)

      expect(beacons[0].distances).to.deep.equal(['0-0-0', '4-0-4', '3-0-3'])
      expect(beacons[1].distances).to.deep.equal(['4-0-4', '0-0-0', '2-0-2'])
      expect(beacons[2].distances).to.deep.equal(['3-0-3', '2-0-2', '0-0-0'])
    })

    it('finds intersections between scanners', () => {
      const scanner1 = { beacons: [xyz(0, 2, 0), xyz(4, 1, 0), xyz(3, 3, 0)] }
      const scanner2 = { beacons: [xyz(-1, -1, 0), xyz(-5, 0, 0), xyz(-2, 1, 0)] }

      distancesBetween(scanner1.beacons)
      distancesBetween(scanner2.beacons)

      const intersections = intersectionsBetween(scanner1, scanner2, 3)
      expect(intersections.intersections).to.deep.equal([{ 'beacon1Index': 1, 'beacon2Index': 0 }, { 'beacon1Index': 0, 'beacon2Index': 1 }, { 'beacon1Index': 2, 'beacon2Index': 2 }])
    })

    it('aligns scanners', () => {
      const scanner1 = { beacons: [xyz(0, 2, 0), xyz(4, 1, 0), xyz(3, 3, 0)] }
      const scanner2 = { beacons: [xyz(-1, -1, 0), xyz(-5, 0, 0), xyz(-2, 1, 0)] }

      distancesBetween(scanner1.beacons)
      distancesBetween(scanner2.beacons)
      const intersections = intersectionsBetween(scanner1, scanner2, 3)
      alignScanner(scanner1, scanner2, intersections)

      expect(scanner2.position).to.deep.equal(xyz(5, 2, 0))
    })

    it('solves example', () => {
      expect(countBeacons(example)).to.equal(79)
    })

    it('solves it', () => {
      expect(countBeacons(input)).to.equal(383)
    })
  })

  describe('Part 2: What is the largest Manhattan distance between any two scanners?', () => {
    it('solves example', () => {
      expect(largestManhattanDistanceBetweenTwoScanners(example)).to.equal(3621)
    })

    it('solves it', () => {
      expect(largestManhattanDistanceBetweenTwoScanners(input)).to.equal(9854)
    })
  })
})
