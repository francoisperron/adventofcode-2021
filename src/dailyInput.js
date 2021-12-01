import https from 'https'

const dailyInput = async day => {
  const options = {
    hostname: 'adventofcode.com',
    path: `/2021/day/${day}/input`,
    method: 'GET',
    headers: { 'Cookie': `session=${process.env.AOC_SESSION}` }
  }

  return new Promise((resolve, reject) => {
    const req = https.get(options, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => resolve(data.slice(0, -1)))
    })

    req.on('error', err => {
      reject(err)
    })
  })
}

const dailyInputLines = async day => dailyInput(day).then(input => input.split('\n'))

export { dailyInput, dailyInputLines }

