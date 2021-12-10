const winningBoardScore = (input) => {
  const { numbers, boards } = parseBingo(input)

  const drawnNumbers = []
  for (const number of numbers) {
    drawnNumbers.push(number)
    for (const board of boards) {
      if (bingo(board, drawnNumbers))
        return sumOfNotDrawnNumbers(board, drawnNumbers) * number
    }
  }
}

const lastWinningBoardScore = (input) => {
  const { numbers, boards } = parseBingo(input)

  const drawnNumbers = []
  for (const number of numbers) {
    drawnNumbers.push(number)
    for (let i = boards.length - 1; i >= 0; i--) {
      const board = boards[i]
      if (boards.length === 1 && bingo(board, drawnNumbers)) {
        return sumOfNotDrawnNumbers(board, drawnNumbers) * number
      }

      if (bingo(board, drawnNumbers)) {
        boards.splice(i, 1)
      }
    }
  }
}

const parseBingo = (input) => {
  const numbers = input.split('\n')[0]
    .split(',')
    .map(number => parseInt(number))

  const parseRow = row => row
    .split(' ')
    .filter(number => number !== '')
    .map(i => parseInt(i))

  const boards = input
    .split('\n\n')
    .slice(1)
    .map(board => board.split('\n').map(row => parseRow(row)))

  return { numbers: numbers, boards: boards }
}

const bingo = (board, numbers) => {
  for (const row of board) {
    if (row.every(i => numbers.includes(i)))
      return true
  }

  for (let i = 0; i < board[0].length; i++) {
    const column = board.map(row => row[i])
    if (column.every(i => numbers.includes(i)))
      return true
  }

  return false
}

const sumOfNotDrawnNumbers = (board, numbers) =>
  [].concat(...board)
    .filter(n => !numbers.includes(n))
    .reduce((sum, n) => sum + n, 0)

export { parseBingo, bingo, sumOfNotDrawnNumbers, winningBoardScore, lastWinningBoardScore }
