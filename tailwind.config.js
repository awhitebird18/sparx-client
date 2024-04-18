import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  purge: {
    // Your other purge configurations...
    options: {
      safelist: [
        { pattern: /^from-/, variants: ['500'] },
        { pattern: /^to-/, variants: ['500'] },
      ],
    },
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2000px',
      // You can continue adding more breakpoints if needed
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle 500px at top, var(--primary), transparent)',
      },
      gridTemplateColumns: {
        53: 'repeat(53, 2rem)',
      },
      gridTemplateRows: {
        7: 'repeat(7, 2rem)',
      },
      colors: {
        borderDisabled: 'hsl(var(--border-disabled))',
        borderLight: 'hsl(var(--border-light))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        panel: 'hsl(var(--panel))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          darkest: 'var(--primary-darkest)',
          transparent: 'var(--primary-transparent)',
          darker: 'var(--primary-darker)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
          lighter: 'var(--primary-lighter)',
          lightest: 'var(--primary-lightest)',
          active: 'var(--primary-active)',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          disabled: 'hsl(var(--border-disabled))',
          input: 'hsl(var(--border-primary))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary-hover))',
        },
        hover: {
          DEFAULT: 'hsl(var(--hover))',
          foreground: 'hsl(var(--primary-dark))',
          primary: 'var(--primary-hover)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        active: {
          DEFAULT: 'var(--primary-transparent)',
          foreground: 'var(--primary-lightest)',
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
          DEFAULT: 'hsla(var(--card))',
          disabled: 'hsl(var(--card-disabled))',
          foreground: 'hsl(var(--card-foreground))',
          border: 'hsl(var(--card-border)',
          hover: 'hsl(var(--card-hover))',
        },
        scrollbar: {
          thumb: 'hsl(var(--scrollbarThumb))',
          track: 'hsl(var(--scrollbarTrack))',
        },
        'primary-flashcards': 'var(--primary-flashcards)',
        'border-flashcards': 'var(--border-flashcards)',

        'primary-members': 'var(--primary-members)',
        'border-members': 'var(--border-members)',

        'primary-discussions': 'var(--primary-discussions)',
        'border-discussions': 'var(--border-discussions)',

        'border-input': 'hsl(var(--border-input))',
        'primary-border': 'var(--primary-border)',

        userLighter: 'var(--userLighter)',
        userLight: 'var(--userLight)',
        'primary-medium': 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-shadow': 'var(--primary-shadow)',
        complete: 'var(--complete)',
        progress: 'var(--progress)',
        'complete-dark': 'var(--complete-dark)',
        highlight: 'var(--primary-highlight)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            img: {
              marginTop: '0',
              marginBottom: '0',
            },
            p: {
              marginTop: '0',
              marginBottom: '0',
            },
            h1: {
              marginTop: '0',
              marginBottom: '0',
            },
            h2: {
              marginTop: '0',
              marginBottom: '0',
            },
            h3: {
              marginTop: '0',
              marginBottom: '0',
            },
            h4: {
              marginTop: '0',
              marginBottom: '0',
            },
            h5: {
              marginTop: '0',
              marginBottom: '0',
            },
            h6: {
              marginTop: '0',
              marginBottom: '0',
            },
            // Define other elements like h3, h4, p as you like
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.300'),
              '&:hover': {
                color: theme('colors.blue.400'),
              },
            },

            // Again, define other elements as needed
          },
        },
      }),
      borderRadius: {
        lg: 'calc(var(--radius) + 1px)',
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
      // boxShadow: {
      //   md: '0 3px 4px 0px rgba(0, 0, 0, 0.04)',
      // },
      textColor: {
        main: 'hsl(var(--text-main))',
        primary: 'var(--primary)',
        active: 'var(--primary-active)',
        neutral: 'hsl(var(--text-neutral))',
        secondary: 'hsl(var(--text-secondary))',
        muted: 'hsl(var(--text-muted))',
      },
      outlineColor: {
        primary: 'hsl(var(--primary))',
      },
      borderColor: {
        neutral: 'hsl(var(--border-neutral))',
        darker: 'var(--border-darker)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addBase, theme }) {
      addBase({
        '::-webkit-scrollbar': {
          width: theme('spacing.2'),
          height: theme('spacing.2'),
        },
        '::-webkit-scrollbar-track': {
          background: theme('colors.secondary.DEFAULT'),
          borderRadius: '1rem',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.scrollbar.thumb'),
          borderRadius: theme('borderRadius.lg'),
        },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
