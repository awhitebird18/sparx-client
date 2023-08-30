/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'scrollbar-bg': '#cfcfcf',
        'scrollbar-thumb': '#f78',
        'scrollbar-thumb-hover': '#555',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary-hover))',
        },
        hover: {
          DEFAULT: 'hsl(var(--hovered))',
          foreground: 'hsl(var(--hovered))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        scrollbar: {
          thumb: 'hsl(var(--scrollbarThumb))',
          track: 'hsl(var(--scrollbarTrack))',
        },
        userLighter: 'var(--userLighter)',
        userLight: 'var(--userLight)',
        userMedium: 'var(--userMedium)',
        userDark: 'var(--userDark)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      flexGrow: {
        2: '2',
        3: '3',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spin: 'spin 1s linear infinite',
      },
      textColor: {
        neutral: 'hsl(var(--text-neutral))',
      },
      borderColor: {
        neutral: 'hsl(var(--border-neutral))',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addBase, theme }) {
      addBase({
        '::-webkit-scrollbar': {
          width: theme('spacing.2'),
        },
        '::-webkit-scrollbar-track': {
          background: theme('colors.scrollbar.track'),
          borderRadius: '0.5rem',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.scrollbar.thumb'),
          borderRadius: theme('borderRadius.DEFAULT'),
        },
      });
    },
  ],
};
