import { expect } from 'chai'
import fs from 'fs'
import { dailyInput } from '../dailyInput.js'

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
      expect(scanners[0].length).to.equal(25)
      expect(scanners[0][0]).to.deep.equal({ x: 404, y: -588, z: -901 })
    })

    it('calculates distance to other beacons', () => {
      const beacons = [xyz(0, 2, 0), xyz(4, 1, 0), xyz(3, 3, 0)]
      const expected = [
        [xyz(0, 0, 0), xyz(4, -1, 0), xyz(3, 1, 0)],
        [xyz(-4, 1, 0), xyz(0, 0, 0), xyz(-1, 2, 0)],
        [xyz(-3, -1, 0), xyz(1, -2, 0), xyz(0, 0, 0)]
      ]
      expect(distancesBetween(beacons)).to.deep.equal(expected)
    })

    it('calculates distance to other beacons, second example', () => {
      const beacons = [xyz(-1, -1, 0), xyz(-5, 0, 0), xyz(-2, 1, 0)]
      const expected = [
        [xyz(0, 0, 0), xyz(-4, 1, 0), xyz(-1, 2, 0)],
        [xyz(4, -1, 0), xyz(0, 0, 0), xyz(3, 1, 0)],
        [xyz(1, -2, 0), xyz(-3, -1, 0), xyz(0, 0, 0)]
      ]

      expect(distancesBetween(beacons)).to.deep.equal(expected)
    })

    xit('finds intersections between beacons', () => {
      const beacons1 = [xyz(0, 2, 0), xyz(4, 1, 0), xyz(3, 3, 0)]
      const beacons2 = [xyz(-1, -1, 0), xyz(-5, 0, 0), xyz(-2, 1, 0)]

      const intersections = intersect(beacons1, beacons2)
      expect(intersections.length).to.equal(3)
    })

    xit('solves example', () => {
      const scanners = parseScannersAndBeacons(example)

      for (let i = 1; i < scanners.length; i++) {
        const intersections = intersect(scanners[0], scanners[1])
        console.log('intersections.length', intersections.length)
        if (intersections >= 12) {

        }
      }
    })

    // scanner 0 distances

    // tant quil y a des scanners
      // pour tous les autres scanners
        // scanner i distances
        // si <= 12 beacons commun
          // convertir tous les beacons non commun du scanner i en fonction du scanner 0
          // ajouter ces beacons au beacons du 1
          // supprimer le scanner i de la liste des scanners
  })
})

const intersect = (beacons1, beacons2) => {
  const distances1 = distancesBetween(beacons1)
  const distances2 = distancesBetween(beacons2)

  return 3
}

const parseScannersAndBeacons = input => {
  const parseBeacons = lines => lines
    .split('\n')
    .filter(line => line !== '')
    .map(line => xyzFromArray(line.split(',').map(Number)))

  return input
    .split(/--- scanner \d+ ---\n/)
    .slice(1)
    .map(parseBeacons)
}

const xyzFromArray = (array) => (xyz(array[0], array[1], array[2]))
const xyz = (x, y, z) => ({ x, y, z })

const distancesBetween = beacons => beacons.map(b1 => beacons.map(b2 => distanceBetween(b2, b1)))
const distanceBetween = (p1, p2) => xyz(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z)

/*
--- scanner 0 --- 0,0
0,2
4,1
3,3

--- scanner 1 --- 0,0
-1,-1
-5,0
-2,1

si on calcule les distances entres les beacons (destination - source)

--- scanner 0 --- 0,0
0,2 => [4,-1 3,1]
4,1 => [-4,1 -1,2]
3,3 => [-3,-1 1,-2]

--- scanner 1 --- 0,0 =>
-1,-1 => [-4,1, -1,2]
-5,0  => [4,-1 3,1]
-2,1  => [1,-2 -3,-1]]

pour toutes les distances du scanner 0
 [4,-1 3,1]   === scanner 1[1]
 [-4,1 -1,2]  === scanner 1[0]
 [-3,-1 1,-2] === scanner 1[2]
 ...
 si ya 12 match, mark beacon as duplicates
 */
