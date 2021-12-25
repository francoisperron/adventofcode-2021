export const stepsBeforeLanding = input => {
  let region = input.split('\n')

  let newRegion = moveCucumbers(region)
  let steps = 1

  while (notEqual(newRegion, region)) {
    region = newRegion
    newRegion = moveCucumbers(region)
    steps++
  }

  return steps
}

export const moveCucumbers = region => {
  const movedEast = region.map(line => moveCucumberLine(line, '>'))
  const movedSouth = transpose(movedEast).map(line => moveCucumberLine(line, 'v'))

  return transpose(movedSouth)
}

const transpose = region => {
  const array = region.map(line => line.split(''))
  const newArray = array[0].map((_, colIndex) => array.map(row => row[colIndex]))
  return  newArray.map(line => line.join(''))
}

const notEqual = (r1, r2) => r1.join() !== r2.join()

export const moveCucumberLine = (line, cucumber) => {
  const locations = line.split('')

  let newLine = ''
  for (let i = 0; i < locations.length; i++) {
    if (line[i] === '.') {
      newLine += '.'
    } else if (line[i] === cucumber && line[i + 1] === '.') {
      newLine += '.' + cucumber
      i++
    } else if (line[i] === cucumber && i + 1 === locations.length && line[0] === '.') {
      newLine = cucumber + newLine.slice(1) + '.'
    } else {
      newLine += line[i]
    }
  }
  return newLine
}
