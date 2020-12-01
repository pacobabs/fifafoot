module.exports = {
  darkMode: 'media',
  purge: {
    preserveHtmlElements: false,
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}']
  },
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      recursive: ['Recursive', 'sans-serif'],
      crimson: ['"Crimson Pro"', 'serif']
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        50: '#fcfcfc',
        100: '#e6e6e6',
        200: '#cccccc',
        300: '#b3b3b3',
        400: '#999999',
        500: '#808080',
        600: '#666666',
        700: '#4d4d4d',
        800: '#333333',
        900: '#1a1a1a'
      },
      indigo: {
        50: '#f4faff',
        100: '#d7e5f1',
        200: '#a3bbce',
        300: '#769ab6',
        400: '#48789d',
        500: '#2a6aa7',
        600: '#1a5685',
        700: '#15456a',
        800: '#0c314e',
        900: '#0a2235'
      },
      pink: {
        50: '#fcf9f8',
        100: '#fcf0f1',
        200: '#fad5e0',
        300: '#f9b0c5',
        400: '#f97a97',
        500: '#fa4e6b',
        600: '#f22f48',
        700: '#d3243d',
        800: '#a51e33',
        900: '#81192a'
      },
      yellow: {
        50: '#fbfaf3',
        100: '#faf7db',
        200: '#f4eea1',
        300: '#edde5b',
        400: '#dbbf20',
        500: '#c69e0b',
        600: '#a37906',
        700: '#7b5c09',
        800: '#5b450e',
        900: '#46360f'
      }
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: 'calc(0.125rem * var(--vr-baseline))',
      1: 'calc(0.25rem * var(--vr-baseline))',
      1.5: 'calc(0.375rem * var(--vr-baseline))',
      2: 'calc(0.5rem * var(--vr-baseline))',
      2.5: 'calc(0.625rem * var(--vr-baseline))',
      3: 'calc(0.75rem * var(--vr-baseline))',
      3.5: 'calc(0.875rem * var(--vr-baseline))',
      4: 'calc(1rem * var(--vr-baseline))',
      5: 'calc(1.25rem * var(--vr-baseline))',
      6: 'calc(1.5rem * var(--vr-baseline))',
      7: 'calc(1.75rem * var(--vr-baseline))',
      8: 'calc(2rem * var(--vr-baseline))',
      9: 'calc(2.25rem * var(--vr-baseline))',
      10: 'calc(2.5rem * var(--vr-baseline))',
      11: 'calc(2.75rem * var(--vr-baseline))',
      12: 'calc(3rem * var(--vr-baseline))',
      14: 'calc(3.5rem * var(--vr-baseline))',
      16: 'calc(4rem * var(--vr-baseline))',
      20: 'calc(5rem * var(--vr-baseline))',
      24: 'calc(6rem * var(--vr-baseline))',
      28: 'calc(7rem * var(--vr-baseline))',
      32: 'calc(8rem * var(--vr-baseline))',
      36: 'calc(9rem * var(--vr-baseline))',
      40: 'calc(10rem * var(--vr-baseline))',
      44: 'calc(11rem * var(--vr-baseline))',
      48: 'calc(12rem * var(--vr-baseline))',
      52: 'calc(13rem * var(--vr-baseline))',
      56: 'calc(14rem * var(--vr-baseline))',
      60: 'calc(15rem * var(--vr-baseline))',
      64: 'calc(16rem * var(--vr-baseline))',
      72: 'calc(18rem * var(--vr-baseline))',
      80: 'calc(20rem * var(--vr-baseline))',
      96: 'calc(24rem * var(--vr-baseline))'
    },
    lineHeight: {
      none: '1',
      tight: 'calc(1.25 / 1.5 * var(--vr-baseline))',
      snug: 'calc(1.375 / 1.5 * var(--vr-baseline))',
      normal: 'var(--vr-baseline)',
      relaxed: 'calc(1.625 / 1.5 * var(--vr-baseline))',
      loose: 'calc(2 / 1.5 * var(--vr-baseline))',
      3: 'calc(0.75rem * var(--vr-baseline))',
      4: 'calc(1rem * var(--vr-baseline))',
      5: 'calc(1.25rem * var(--vr-baseline))',
      6: 'calc(1.5rem * var(--vr-baseline))',
      7: 'calc(1.75rem * var(--vr-baseline))',
      8: 'calc(2rem * var(--vr-baseline))',
      9: 'calc(2.25rem * var(--vr-baseline))',
      10: 'calc(2.5rem * var(--vr-baseline))'
    },
    extend: {
      gridTemplateRows: {
        layout: 'auto auto 1fr auto auto auto',
        'layout-2': 'auto auto 1fr auto'
      }
    }
  },
  plugins: [
    // require('@tailwindcss/forms')
    // ...
  ]
}
