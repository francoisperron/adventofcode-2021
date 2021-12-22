import { move, play, playWithDiracDice, rollDice } from './day21.js'

describe('Day 21: Dirac Dice', () => {
  describe('Part 1: What do you get if you multiply the score of the losing player by the number of times the die was rolled during the game?', () => {
    it('rolls deterministic dice 3 times', () => {
      const dice = { roll: 4, rolled: 0 }

      expect(rollDice(dice)).to.equal(4 + 5 + 6)
      expect(dice.roll).to.equal(7)
      expect(dice.rolled).to.equal(3)
    })

    it('rolls back to 1 after 100', () => {
      const dice = { roll: 99, rolled: 10 }

      expect(rollDice(dice)).to.equal(99 + 100 + 1)
      expect(dice.roll).to.equal(2)
      expect(dice.rolled).to.equal(13)
    })

    it('moves player around', () => {
      let player = { position: 4, score: 0 }

      player = move(player, 6)
      expect(player.position).to.equal(10)
      expect(player.score).to.equal(10)
    })

    it('moves player to 1 after 10', () => {
      let player = { position: 8, score: 10 }

      player = move(player, 15)
      expect(player.position).to.equal(3)
      expect(player.score).to.equal(13)
    })

    it('moves player big time', () => {
      let player = { position: 4, score: 990 }

      player = move(player, 91 + 92 + 93)
      expect(player.position).to.equal(10)
      expect(player.score).to.equal(1000)
    })

    it('solves example', () => {
      let game = {
        player1Plays: true,
        player1: { position: 4, score: 0 },
        player2: { position: 8, score: 0 },
        dice: { roll: 1, rolled: 0 }
      }

      game = play(game)
      expect(game.player1.score).to.be.greaterThanOrEqual(1000)
      expect(game.player2.score).to.equal(745)
      expect(game.dice.rolled).to.equal(993)
      expect(game.player2.score * game.dice.rolled).to.equal(739785)
    })

    it('solves it', () => {
      let game = {
        player1Plays: true,
        player1: { position: 2, score: 0 },
        player2: { position: 1, score: 0 },
        dice: { roll: 1, rolled: 0 }
      }

      game = play(game)
      expect(game.player1.score * game.dice.rolled).to.equal(797160)
    })
  })

  describe('Part 2: Find the player that wins in more universes; in how many universes does that player win?', () => {
    it('adds 1 to player1 wins when player 1 wins', () => {
      const game = { player1Plays: true, player1: { position: 4, score: 21 }, player2: { position: 8, score: 0 } }
      const wins = playWithDiracDice(game)

      expect(wins).to.deep.equal({ player1: 1, player2: 0 })
    })

    it('adds 1 to player2 wins when player 2 wins', () => {
      const game = { player1Plays: true, player1: { position: 4, score: 0 }, player2: { position: 8, score: 21 } }
      const wins = playWithDiracDice(game)

      expect(wins).to.deep.equal({ player1: 0, player2: 1 })
    })

    it('solves example', () => {
      const game = { player1Plays: true, player1: { position: 4, score: 0 }, player2: { position: 8, score: 0 } }
      const wins = playWithDiracDice(game)

      expect(wins.player1).to.equal(444356092776315)
      expect(wins.player2).to.equal(341960390180808)
    })

    it('solves it', () => {
      const game = { player1Plays: true, player1: { position: 2, score: 0 }, player2: { position: 1, score: 0 } }
      const wins = playWithDiracDice(game)

      expect(wins.player1).to.equal(27464148626406)
      expect(wins.player2).to.equal(22909380722959)
    })
  })
})
