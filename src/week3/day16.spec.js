import { dailyInput } from '../dailyInput.js'
import { packetsSum, packetsVersion, parsePacket, toBinary } from './day16.js'

describe('Day 16: Packet Decoder', () => {
  let input
  before('get input', async () => {
    input = await dailyInput(16)
  })

  describe('Part1: what do you get if you add up the version numbers in all packets?', () => {
    it('converts hex to literal string', () => {
      expect(toBinary('D2FE28')).to.equal('110100101111111000101000')
      expect(toBinary('38006F45291200')).to.equal('00111000000000000110111101000101001010010001001000000000')
      expect(toBinary('EE00D40C823060')).to.equal('11101110000000001101010000001100100000100011000001100000')
    })

    it('parses packet literal value', () => {
      const packet = parsePacket('110100101111111000101000'.split(''))[0]

      expect(packet).to.deep.equal({ version: 6, typeId: 4, number: 2021 })
    })

    it('parses packet operator', () => {
      const packets = parsePacket('00111000000000000110111101000101001010010001001000000000'.split(''))

      expect(packets).to.deep.have.members([{ version: 1 + 6 + 2, typeId: 6, number: 1 }])
    })

    it('parses packet operator 2', () => {
      const packets = parsePacket('11101110000000001101010000001100100000100011000001100000'.split(''))

      expect(packets).to.deep.have.members([{ version: 7 + 2 + 4 + 1, typeId: 3, number: 3 }])
    })

    it('solves it', () => {
      expect(packetsVersion(input)).to.equal(843)
    })
  })

  describe('Part 2: What do you get if you evaluate the expression represented by your hexadecimal-encoded BITS transmission?', () => {
    it('solves examples', () => {
      expect(packetsSum('C200B40A82')).to.equal(3)
      expect(packetsSum('04005AC33890')).to.equal(54)
      expect(packetsSum('880086C3E88112')).to.equal(7)
      expect(packetsSum('CE00C43D881120')).to.equal(9)
      expect(packetsSum('D8005AC2A8F0')).to.equal(1)
      expect(packetsSum('F600BC2D8F')).to.equal(0)
      expect(packetsSum('9C005AC2F8F0')).to.equal(0)
      expect(packetsSum('9C0141080250320F1802104A08')).to.equal(1)
    })

    it('solves it', () => {
      expect(packetsSum(input)).to.equal(5390807940351)
    })
  })
})
