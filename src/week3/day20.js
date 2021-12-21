export const enhanceImageMultipleTimes = (input, times) => {
  let { algo, image } = parseAlgoAndImage(input)
  const enhanceImageWithAlgo = enhanceImage(algo)

  return repeat(times)
    .reduce((current, _, index) => enhanceImageWithAlgo(current, defaultPixelValue(algo, index)), image)
    .join('').split('').filter(pixel => pixel === '#').length
}

const defaultPixelValue = (algo, index) => algo[0] === '#'
  ? index % 2 ? '1' : '0'
  : '0'

const enhanceImage = algo => (image, defaultPixelValue) =>
  range(-1, image.length)
    .map(x => range(-1, image[0].length)
      .map(y => algo[transformationIndexOf(x, y, image, defaultPixelValue)])
      .join(''))

export const transformationIndexOf = (x, y, image, defaultPixelValue) => {
  const pixelAt = (x, y) => image[x]?.[y]
    ? image[x][y] === '#' ? '1' : '0'
    : defaultPixelValue

  const binary =
    pixelAt(x - 1, y - 1) + pixelAt(x - 1, y) + pixelAt(x - 1, y + 1) +
    pixelAt(x, y - 1) + pixelAt(x, y) + pixelAt(x, y + 1) +
    pixelAt(x + 1, y - 1) + pixelAt(x + 1, y) + pixelAt(x + 1, y + 1)

  return parseInt(binary, 2)
}

export const parseAlgoAndImage = input => {
  const [algo, image] = input.split('\n\n')
  return { algo: algo, image: image.split('\n') }
}

const repeat = (times) => Array(times).fill(0).map((_, idx) => idx)
const range = (start, end) => Array(end - start + 1).fill(0).map((_, idx) => start + idx)
