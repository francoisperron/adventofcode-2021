export const packetsVersion = hex => {
  const bin = toBinary(hex)
  const packets = parsePacket(bin.split(''))

  return packets[packets.length - 1].version
}

export const packetsSum = hex => {
  const bin = toBinary(hex)
  const packets = parsePacket(bin.split(''))

  return packets[packets.length - 1].number
}

export const parsePacket = (bin, packets = []) => {
  const version = readBits(bin, 3)
  const typeId = readBits(bin, 3)

  return typeId === 4
    ? parseLiteralValuePacket(version, typeId, bin, packets)
    : parseOperatorPacket(version, typeId, bin, packets)
}

const parseLiteralValuePacket = (version, typeId, bin, packets) => {
  let number = ''

  while (bin[0] !== '0') {
    bin.splice(0, 1)
    number += bin.splice(0, 4).join('')
  }
  bin.splice(0, 1)
  number += bin.splice(0, 4).join('')
  number = parseInt(number, 2)

  return [...packets, { version, typeId, number }]
}

const parseOperatorPacket = (version, typeId, bin, packets) => {
  const lengthTypeId = readBits(bin, 1)
  const numberLength = lengthTypeId === 0 ? 15 : 11
  const subPacketsLength = readBits(bin, numberLength)

  let newPackets = []

  if (lengthTypeId === 0) {
    const currentBinLength = bin.length
    while (currentBinLength !== subPacketsLength + bin.length) {
      newPackets.push(...parsePacket(bin))
    }
  } else {
    for (let i = 0; i < subPacketsLength; i++) {
      newPackets.push(...parsePacket(bin))
    }
  }

  const number = packetNumberCalculator[typeId](newPackets)
  const newVersion = version + newPackets.map(p => p.version).reduce((sum, v) => sum + v, 0)

  return [...packets, { version: newVersion, typeId, number }]
}

const packetNumberCalculator = {
  0: (packets) => packets.reduce((sum, p) => sum + p.number, 0),
  1: (packets) => packets.reduce((product, p) => product * p.number, 1),
  2: (packets) => Math.min(...packets.map(p => p.number)),
  3: (packets) => Math.max(...packets.map(p => p.number)),
  5: (packets) => packets[0].number > packets[1].number ? 1 : 0,
  6: (packets) => packets[0].number < packets[1].number ? 1 : 0,
  7: (packets) => packets[0].number === packets[1].number ? 1 : 0
}

const readBits = (bin, number) => parseInt(bin.splice(0, number).join(''), 2)

export const toBinary = hex => hex
  .split('')
  .map(v => parseInt(v, 16).toString(2).padStart(4, '0'))
  .join('')
