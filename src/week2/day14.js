export const polymerization = (input, steps) => {
  let { polymer, rules } = parsePolymerAndRules(input)
  const growWithRules = grow(rules)

  for (let i = 0; i < steps; i++) {
    polymer = growWithRules(polymer)
  }

  const counts = Object.values(countElements(polymer))
  return Math.round(Math.max(...counts) / 2 - Math.min(...counts) / 2)
}

export const grow = rules => polymer => Object.keys(polymer)
  .reduce((newPolymer, pair) => {
    const letter = rules[pair]

    newPolymer[pair[0] + letter] = (newPolymer[pair[0] + letter] || 0) + polymer[pair]
    newPolymer[letter + pair[1]] = (newPolymer[letter + pair[1]] || 0) + polymer[pair]

    return newPolymer
  }, {})

export const countElements = (polymer) => Object.keys(polymer)
  .reduce((groups, p) => {
    const [a, b] = p.split('')
    groups[a] = (groups[a] || 0) + polymer[p]
    groups[b] = (groups[b] || 0) + polymer[p]
    return groups
  }, {})

export const parsePolymerAndRules = input => {
  const [polymerLine, rulesLines] = input.split('\n\n')

  const rules = rulesLines.split('\n').map(line => line.split(' -> ')).reduce((rules, r) => ({ ...rules, [r[0]]: r[1] }), {})

  return { polymer: parsePolymer(polymerLine), rules: rules }
}

export const parsePolymer = polymerLine => polymerLine
  .split('')
  .reduce((polymer, _, i, elements) => {
    if (elements[i + 1])
      polymer[elements[i] + elements[i + 1]] = (polymer[elements[i] + elements[i + 1]] || 0) + 1

    return polymer
  }, {})
