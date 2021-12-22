// part 2
export const playWithDiracDice = (game, games = []) => {
  const gameKey = hash(game)

  if (games[gameKey] !== undefined) {
    // game already played
  } else if (game.player1.score >= 21) {
    games[gameKey] = { player1: 1, player2: 0 }
  } else if (game.player2.score >= 21) {
    games[gameKey] = { player1: 0, player2: 1 }
  } else {
    games[gameKey] = rollDiracDice(game, games)
  }

  return games[gameKey]
}

const rollDiracDice = (game, games) => {
  let wins = { player1: 0, player2: 0 }

  for (let rollsSum = 3; rollsSum <= 9; rollsSum++) {
    const newGame = {
      player1Plays: !game.player1Plays,
      player1: game.player1Plays ? move(game.player1, rollsSum) : game.player1,
      player2: game.player1Plays ? game.player2 : move(game.player2, rollsSum)
    }

    const newWins = playWithDiracDice(newGame, games)

    wins.player1 += rollsSumCount[rollsSum] * newWins.player1
    wins.player2 += rollsSumCount[rollsSum] * newWins.player2
  }

  return wins
}

const rollsSumCount = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 }

const hash = game => game.player1Plays + '-' +
  game.player1.position + '-' + game.player1.score +
  game.player2.position + '-' + game.player2.score

// part 1
export const play = game => {

  if (game.player1.score >= 1000 || game.player2.score >= 1000) {
    return game
  }

  if (game.player1Plays)
    game.player1 = move(game.player1, rollDice(game.dice))
  else
    game.player2 = move(game.player2, rollDice(game.dice))

  game.player1Plays = !game.player1Plays

  return play(game)
}

export const rollDice = dice => {
  let value = 0
  for (let i = 0; i < 3; i++) {
    value += dice.roll
    dice.roll = (dice.roll % 100) + 1
    dice.rolled++
  }
  return value
}

export const move = (player, moves) => {
  const newPosition = (player.position - 1 + moves) % 10 + 1
  return { position: newPosition, score: player.score + newPosition }
}
