export const part2 = input => {
  const numbers = []
  for (let i = 0; i < input.length; i++) {
    for (let j = 1; j < input.length; j++) {
      numbers.push(adds(input[i], input[j]))
      numbers.push(adds(input[j], input[i]))
    }
  }
  const magnitudes = numbers.map(n => {
    const reduced = reduces(n)
    return magnitudeOf(toArray(reduced))
  })

  return Math.max(...magnitudes)
}
export const part1 = input => {
  const number = input.reduce((number, line) => {
    const newNumber = adds(number, line)
    return reduces(newNumber)
  })

  return magnitudeOf(toArray(number))
}

export const magnitudeOf = number => Array.isArray(number)
  ? 3 * magnitudeOf(number[0]) + 2 * magnitudeOf(number[1])
  : number

export const reduces = number => {
  const exploded = explodes(number)
  if (number !== exploded)
    return reduces(exploded)

  const split = splits(number)
  if (number !== split)
    return reduces(split)

  return number
}

export const adds = (number1, number2) => `[${number1},${number2}]`

export const explodes = (number) => {
  let opens = 0
  for (let i = 0; i < number.length; i++) {
    if (number[i] === '[')
      opens++
    else if (number[i] === ']')
      opens--
    else if (opens >= 5) {
      const [pair, left, right] = number.slice(i).match(/(\d+),(\d+)/)

      const before = number.slice(0, i - 1).replace(/(\d+)(\D+)$/, joinLeft(left))
      const after = number.slice(i + pair.length + 1).replace(/(\d+)/, joinRight(right))

      return `${before}0${after}`
    }
  }
  return number
}

export const splits = number => number.replace(/(\d\d+)/, splitNumber)

const joinLeft = left => (_, number, remaining) => `${parseInt(number) + parseInt(left)}${remaining}`
const joinRight = right => (number) => parseInt(number) + parseInt(right)
const splitNumber = (number) => `[${Math.floor(parseInt(number) / 2)},${Math.ceil(parseInt(number) / 2)}]`
const toArray = number => JSON.parse(number)
