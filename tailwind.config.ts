import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ['corporate', 'business'],
    darkTheme: 'business',
  },
}
export default config
