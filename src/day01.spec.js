import { dailyInputLines } from './dailyInput.js'

const countLargerMeasurements = measurements => measurements
  .map((_, i) => measurements[i] > measurements[i - 1])
  .filter((larger) => larger)
  .length

// en une seule ligne mais moins lisible
// const countLargerMeasurements = measurements =>
//   measurements.reduce((count, measurement, i) => measurements[i] > measurements[i - 1] ? count + 1 : count, 0)

const countLargerSumMeasurements = measurements => countLargerMeasurements(sumBy3(measurements))

const sumBy3 = measurements => measurements
  .reduce((sums, measurement, i) => {
    sums.push(measurement)
    sums[i - 1] += measurement
    sums[i - 2] += measurement
    return sums
  }, [])

describe('Day 1: Sonar Sweep', () => {

  let measurements
  before('get measurements', async () => {
    measurements = (await dailyInputLines(1)).map(l => parseInt(l))
  })

  describe('Part 1: Counts measurements larger than the previous measurement', () => {
    it('skips first measurement', () => {
      expect(countLargerMeasurements([100])).to.equal(0)
    })

    it('counts when larger', () => {
      expect(countLargerMeasurements([100, 200])).to.equal(1)
    })

    it('skips when lower', () => {
      expect(countLargerMeasurements([200, 100])).to.equal(0)
    })

    it('solves it', () => {
      expect(countLargerMeasurements(measurements)).to.equal(1184)
    })
  })

  describe('Part 2: How many sums are larger than the previous sum?', () => {
    it('sums measurements by group of 3', () => {
      expect(sumBy3([199, 200, 208, 210])).to.deep.equal([607, 618, 418, 210])
    })

    it('counts when sum is larger (199 + 200 + 208 = 607 < 200 + 208 + 210 = 618)', () => {
      expect(countLargerSumMeasurements([199, 200, 208, 210])).to.equal(1)
    })

    it('skips when sum is lower (299 + 200 + 208 = 707 > 200 + 208 + 210 = 618)', () => {
      expect(countLargerSumMeasurements([299, 200, 208, 210])).to.equal(0)
    })

    it('solves it', () => {
      expect(countLargerSumMeasurements(measurements)).to.equal(1158)
    })
  })
})
