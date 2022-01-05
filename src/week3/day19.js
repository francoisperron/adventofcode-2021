export function countBeacons (input) {
  const scanners = parseScannersAndBeacons(input)
  scanners.forEach(scanner => distancesBetween(scanner.beacons))
  alignScanners(scanners)

  return scanners
    .map(s => s.beacons)
    .flat()
    .map(beacon => hash(beacon.x, beacon.y, beacon.z))
    .filter(distinct).length
}

export const parseScannersAndBeacons = input => {
  const parseBeacons = lines => lines
    .split('\n')
    .filter(line => line !== '')
    .map(line => xyzFromArray(line.split(',').map(Number)))

  return input
    .split(/--- scanner \d+ ---\n/)
    .slice(1)
    .map(lines => ({ beacons: parseBeacons(lines) }))
}

export const distancesBetween = beacons => {
  for (let beacon of beacons) {
    beacon.distances = beacons.map((signal2 => distanceBetween(beacon, signal2)))
  }
}

export const distanceBetween = (beacon1, beacon2) => {
  const dx = Math.abs(beacon1.x - beacon2.x)
  const dy = Math.abs(beacon1.y - beacon2.y)
  const dz = Math.abs(beacon1.z - beacon2.z)

  const hyp = Math.hypot(dx, dy, dz).toFixed(0)
  const min = Math.min(dx, dy, dz)
  const max = Math.max(dx, dy, dz)

  return hash(hyp, min, max)
}

export const alignScanners = scanners => {
  scanners[0].position = xyz(0, 0, 0)

  while (scanners.some(s => s.position === undefined)) {

    for (let i = 0; i < scanners.length; i++) {
      for (let j = 0; j < scanners.length; j++) {
        if (i !== j && scanners[i].position !== undefined && scanners[j].position === undefined) {
          const intersections = intersectionsBetween(scanners[i], scanners[j])
          if (intersections) {
            alignScanner(scanners[i], scanners[j], intersections)
          }
        }
      }
    }
  }
}

export const intersectionsBetween = (scanner1, scanner2, overlapping = 12) => {
  for (let beacon2 of scanner2.beacons) {
    for (let beacon1 of scanner1.beacons) {

      const intersections = []
      for (let beacon2Index = 0; beacon2Index < beacon2.distances.length; beacon2Index++) {
        const distance = beacon2.distances[beacon2Index]
        const beacon1Index = beacon1.distances.indexOf(distance)
        if (beacon1Index > -1) {
          intersections.push({ beacon1Index: beacon1Index, beacon2Index: beacon2Index })
        }
      }

      if (intersections.length >= overlapping) {
        return { beacon1, beacon2, intersections }
      }
    }
  }
  return null
}

export const alignScanner = (scanner1, scanner2, data) => {

  const offsets = findScannerOffsets(scanner1, scanner2, data)

  for (let beacon of scanner2.beacons) {
    const old = xyz(beacon.x, beacon.y, beacon.z)
    beacon.x = old.x * offsets['dxx'] + old.y * offsets['dxy'] + old.z * offsets['dxz']
    beacon.y = old.x * offsets['dyx'] + old.y * offsets['dyy'] + old.z * offsets['dyz']
    beacon.z = old.x * offsets['dzx'] + old.y * offsets['dzy'] + old.z * offsets['dzz']
  }

  scanner2.position = xyz(data.beacon1.x - data.beacon2.x, data.beacon1.y - data.beacon2.y, data.beacon1.z - data.beacon2.z)

  for (let beacon of scanner2.beacons) {
    beacon.x += scanner2.position.x
    beacon.y += scanner2.position.y
    beacon.z += scanner2.position.z
  }
}

const findScannerOffsets = (scanner1, scanner2, data) => {
  for (let intersection of data.intersections) {
    const beacon1 = scanner1.beacons[intersection.beacon1Index]
    const dx1 = data.beacon1.x - beacon1.x
    const dy1 = data.beacon1.y - beacon1.y
    const dz1 = data.beacon1.z - beacon1.z

    const beacon2 = scanner2.beacons[intersection.beacon2Index]
    const dx2 = data.beacon2.x - beacon2.x
    const dy2 = data.beacon2.y - beacon2.y
    const dz2 = data.beacon2.z - beacon2.z

    if (!(Math.abs(dx1) === Math.abs(dy1) || Math.abs(dz1) === Math.abs(dy1) || Math.abs(dx1) === Math.abs(dz1))) {
      return {
        dxx: dx1 === dx2 ? 1 : dx1 === -dx2 ? -1 : 0,
        dxy: dx1 === dy2 ? 1 : dx1 === -dy2 ? -1 : 0,
        dxz: dx1 === dz2 ? 1 : dx1 === -dz2 ? -1 : 0,
        dyx: dy1 === dx2 ? 1 : dy1 === -dx2 ? -1 : 0,
        dyy: dy1 === dy2 ? 1 : dy1 === -dy2 ? -1 : 0,
        dyz: dy1 === dz2 ? 1 : dy1 === -dz2 ? -1 : 0,
        dzx: dz1 === dx2 ? 1 : dz1 === -dx2 ? -1 : 0,
        dzy: dz1 === dy2 ? 1 : dz1 === -dy2 ? -1 : 0,
        dzz: dz1 === dz2 ? 1 : dz1 === -dz2 ? -1 : 0
      }
    }
  }
}

// part 2
export function largestManhattanDistanceBetweenTwoScanners (input) {
  const scanners = parseScannersAndBeacons(input)
  scanners.forEach(scanner => distancesBetween(scanner.beacons))
  alignScanners(scanners)

  const manhattanDistances = scanners
    .map((scanner1) => (scanners.map(scanner2 => manhattanDistance(scanner1, scanner2))))
    .flat()
  return Math.max(...manhattanDistances)
}

export const xyz = (x, y, z) => ({ x, y, z })
const xyzFromArray = (array) => (xyz(array[0], array[1], array[2]))
const hash = (hyp, min, max) => `${hyp}-${min}-${max}`
const distinct = (value, index, self) => self.indexOf(value) === index
const manhattanDistance = (scanner1, scanner2) => Math.abs(scanner1.position.x - scanner2.position.x) + Math.abs(scanner1.position.y - scanner2.position.y) + Math.abs(scanner1.position.z - scanner2.position.z)
