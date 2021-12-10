// Part 1
const mostCommonBitAt = (position, report) => {
  const nbOnes = report.reduce((ones, bits) => bits[position] === 1 ? ones + 1 : ones, 0)
  return nbOnes >= (report.length / 2) ? 1 : 0
}

const parseInput = input => input.map(i => i.split('').map(bit => parseInt(bit)))
const bitsToInt = bits => parseInt(bits.join(''), 2)

const powerConsumption = input => {
  const report = parseInput(input)

  const gamaRate = report[0].map((_, index) => mostCommonBitAt(index, report))
  const epsilonRate = gamaRate.map(r => r === 1 ? 0 : 1)

  return bitsToInt(gamaRate) * bitsToInt(epsilonRate)
}

// Part 2

const keepCommonBitAt = (criteria, position, report) => {
  const bit = mostCommonBitAt(position, report)
  return report.filter(r => criteria === 'most' ? r[position] === bit : r[position] !== bit)
}

const rating = (criteria, report) => {
  let remaining = [...report]
  for (let i = 0; i < report[0].length; i++) {
    remaining = keepCommonBitAt(criteria, i, remaining)
    if (remaining.length === 1) break
  }
  return remaining[0]
}

const oxygenGeneratorRating = (report) => rating('most', report)
const co2ScrubberRating = (report) => rating('least', report)

const lifeSupportRating = (input) => {
  const report = parseInput(input)

  const oxygen = oxygenGeneratorRating(report)
  const co2 = co2ScrubberRating(report)

  return bitsToInt(oxygen) * bitsToInt(co2)
}

export { mostCommonBitAt, parseInput, powerConsumption, keepCommonBitAt, oxygenGeneratorRating, co2ScrubberRating, lifeSupportRating }
