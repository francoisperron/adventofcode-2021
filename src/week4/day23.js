// to play run: node day23.js
import readline from 'readline'

let cursor = { x: 1, y: 1 }
let selected = 'empty'
let moves = 0
let score = 0

const extraLines =
  '  #D#C#B#A#\n' +
  '  #D#B#A#C#\n'

// example
let input =
  '#############\n' +
  '#...........#\n' +
  '###B#C#B#D###\n' +
  '  #A#D#C#A#\n' +
  '  #########'
// let input =
//   '#############\n' +
//   '#...........#\n' +
//   '###C#D#A#B###\n' +
//   '  #B#A#D#C#\n' +
//   '  #########'
let burrow = input.split('\n').map(line => line.split(''))

const registerKeys = () => {
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'x') {
      process.exit()
    } else if (key.name === 'r') {
      resetGame()
    } else if (key.name === 'p') {
      const lines = input.split('\n')
      input = lines.slice(0,3).join('\n') + '\n' + extraLines + lines.slice(3).join('\n')
      validPositions.push({ x: 4, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 4, y: 9 }, { x: 5, y: 9 })
      resetGame()
    } else if (key.name === 'up' && canMoveTo(cursor.x - 1, cursor.y)) {
      cursor.x--
      moves = selected === 'empty' ? moves : moves + 1
    } else if (key.name === 'down' && canMoveTo(cursor.x + 1, cursor.y)) {
      cursor.x++
      moves = selected === 'empty' ? moves : moves + 1
    } else if (key.name === 'left' && canMoveTo(cursor.x, cursor.y - 1)) {
      cursor.y--
      moves = selected === 'empty' ? moves : moves + 1
    } else if (key.name === 'right' && canMoveTo(cursor.x, cursor.y + 1)) {
      cursor.y++
      moves = selected === 'empty' ? moves : moves + 1
    } else if (key.name === 'space') {
      const newSelected = burrow[cursor.x][cursor.y]
      if (['A', 'B', 'C', 'D'].includes(newSelected)) {
        selected = newSelected
        burrow[cursor.x][cursor.y] = '.'
      }
      if (newSelected === '.' && selected !== 'empty') {
        score += moves * energy[selected]
        burrow[cursor.x][cursor.y] = selected
        selected = 'empty'
        moves = 0
      }
    }
    printBurrow()
  })
}

const printBurrow = () => {
  let print = ''
  for (let x = 0; x < burrow.length; x++) {
    for (let y = 0; y < burrow[x].length; y++) {
      print += (x === cursor.x && y === cursor.y) ? '\x1b[31mx\x1b[0m' : burrow[x][y]
    }
    print += '\n'
  }

  console.clear()
  console.log(print)
  console.log('selected', selected)
  console.log('moves', moves)
  console.log('score', score)
  console.log(help())
}

const help = () => '\n[up,down,left,right] = move cursor   |   [space] = select/drop amphipod   |   [r] = reset game   |   [p] = unfold extra part'

const resetGame = () => {
  score = 0
  moves = 0
  cursor = { x: 1, y: 1 }
  selected = 'empty'
  burrow = input.split('\n').map(line => line.split(''))
}

const energy = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 }

let validPositions = [
  { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }, { x: 1, y: 8 }, { x: 1, y: 9 }, { x: 1, y: 10 }, { x: 1, y: 11 },
  { x: 2, y: 3 }, { x: 3, y: 3 },
  { x: 2, y: 5 }, { x: 3, y: 5 },
  { x: 2, y: 7 }, { x: 3, y: 7 },
  { x: 2, y: 9 }, { x: 3, y: 9 }
]

const canMoveTo = (x, y) => validPositions.some(p => p.x === x && p.y === y)

// lets play
registerKeys()
printBurrow()
