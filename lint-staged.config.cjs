const path = require('node:path')

const buildBiomeCommand = (filenames) =>
  `biome check --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx,md,html,css}': [buildBiomeCommand],
}
