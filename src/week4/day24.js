// part 2
export const findSmallestModelNumberAcceptedByMonad = (instructions, startingNumber = 11111111111111) => {
  let number = startingNumber
  let validNumber = false

  while (validNumber === false) {
    number = nextSmallestNumber(number)
    validNumber = runMonad(number, instructions)
  }

  return number
}

export const nextSmallestNumber = number => {
  let nextNumber = number + 1
  while (nextNumber.toString().includes('0')) {
    nextNumber = nextNumber + 1
  }
  return nextNumber
}

// part 1
export const findLargestModelNumberAcceptedByMonad = (instructions, startingNumber = 99999999999999) => {
  let number = startingNumber
  let validNumber = false

  while (validNumber === false) {
    number = nextLargestNumber(number)
    validNumber = runMonad(number, instructions)
  }

  return number
}

export const runMonad = (number, instructions) => {
  let state = { w: 0, x: 0, y: 0, z: 0, values: number.toString().split('').map(Number) }
  for (const instruction of instructions) {
    state = runInstruction(instruction, state)
    if (state.crash) return false
  }
  return state.z === 0
}

export const nextLargestNumber = number => {
  let nextNumber = number - 1
  while (nextNumber.toString().includes('0')) {
    nextNumber = nextNumber - 1
  }
  return nextNumber
}

export const runInstruction = (instruction, state) => {
  const [op, v1, v2] = instruction.split(' ')

  const operations = {
    'inp': (v1, _, state) => readInput(v1, state),
    'add': (v1, v2, state) => add(v1, v2, state),
    'mul': (v1, v2, state) => multiply(v1, v2, state),
    'div': (v1, v2, state) => divide(v1, v2, state),
    'mod': (v1, v2, state) => modulo(v1, v2, state),
    'eql': (v1, v2, state) => equality(v1, v2, state)
  }

  return operations[op](v1, v2, state)
}

const readInput = (v1, state) => {
  state[v1] = state.values.shift()
  return state
}

const add = (v1, v2, state) => {
  state[v1] = state[v1] + valueOf(v2, state)
  return state
}

const multiply = (v1, v2, state) => {
  state[v1] = state[v1] * valueOf(v2, state)
  return state
}

const divide = (v1, v2, state) => {
  state[v1] = Math.floor(state[v1] / valueOf(v2, state))
  state.crash = valueOf(v2, state) === 0
  return state
}

const modulo = (v1, v2, state) => {
  state[v1] = state[v1] % valueOf(v2, state)
  state.crash = state[v1] < 0 || valueOf(v2, state) <= 0
  return state
}

const equality = (v1, v2, state) => {
  state[v1] = state[v1] === valueOf(v2, state) ? 1 : 0
  return state
}

const valueOf = (value, state) => ['w', 'x', 'y', 'z'].includes(value) ? state[value] : parseInt(value)
