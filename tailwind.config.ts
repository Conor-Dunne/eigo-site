import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/[lang]/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/[lang]/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '640px', 
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    animation: {
      'bounce-slow': 'bounce 20s linear infinite',
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
