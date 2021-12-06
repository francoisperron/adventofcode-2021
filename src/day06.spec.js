import { dailyInput } from './dailyInput.js'

const simulateLanternFish = (fish, days) => days === 0
  ? fish
  : simulateLanternFish(fish.map(f => f === 0 ? [6, 8] : f - 1).flat(), days - 1)

const simulateFaster = (fish, days) => {
  let fishPerDay = groupFishPerDay(fish)

  for (let i = 0; i < days; i++) {
    fishPerDay = [
      fishPerDay[1], fishPerDay[2], fishPerDay[3], fishPerDay[4], fishPerDay[5],
      fishPerDay[6], fishPerDay[7] + fishPerDay[0], fishPerDay[8], fishPerDay[0]
    ]
  }

  return fishPerDay.reduce((sum, f) => sum + f, 0)
}

const groupFishPerDay = fish => {
  const fishPerDay = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  fish.forEach(fish => fishPerDay[fish]++)
  return fishPerDay
}

describe('Day 6: Lanternfish', () => {
  let input
  before('get input', async () => {
    input = (await dailyInput(6)).split(',').map(i => parseInt(i))
  })

  const example = [3, 4, 3, 1, 2]

  describe('Part 1: How many lanternfish would there be after 80 days?', () => {
    it('solves example', () => {
      expect(simulateLanternFish(example, 1)).to.have.members([2, 3, 2, 0, 1])
      expect(simulateLanternFish(example, 2)).to.have.members([1, 2, 1, 6, 0, 8])
      expect(simulateLanternFish(example, 18)).to.have.members([6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8, 8])
      expect(simulateLanternFish(example, 80).length).to.equal(5934)
    })

    it('solves it', () => {
      expect(simulateLanternFish(input, 80).length).to.equal(351188)
    })
  })

  describe('Part 2: ', () => {
    it('groups number of fishes per days', () => {
      expect(groupFishPerDay([3, 4, 3, 1, 2])).to.deep.equal([0, 1, 1, 2, 1, 0, 0, 0, 0])
    })

    it('solves example', () => {
      expect(simulateFaster(example, 256)).to.equal(26984457539)
    })

    it('solves it', () => {
      expect(simulateFaster(input, 256)).to.equal(1595779846729)
    })
  })
})
