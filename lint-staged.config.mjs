import path from 'node:path'

const buildBiomeCommand = (filenames) =>
  `biome check --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`

export default {
  '*.{js,jsx,ts,tsx,md,html,css}': [buildBiomeCommand],
}
