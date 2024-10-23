const svgToDataUri = require("mini-svg-data-uri");
const plugin = require('tailwindcss/plugin')

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        lightPear: 'hsl(76.25 45.28% 79.22%)',
        darkPear: 'hsl(65 48% 64%)',
        chefBlue: 'hsl(217 74% 61%)',
        lightBlue: 'hsl(214 95% 87%)',
        taupe: 'hsl(240 2% 58%)',
        leafGreen: 'hsl(131.51deg 33.95% 57.84%)',
        calPolyGreen: 'hsl(147 42% 22%)',
        jasperRed: 'hsl(9 64% 49%)',
        mountbattenPink: 'hsl(320 21% 62%)',
        stripeBlack: 'hsl(213 75% 15%)',
        stripeNavy: 'hsl(213 75% 15%)',
        stripeSlate: 'hsl(215 22% 33%)',
        // lightPear: 'hsl(76.25 45.28% 79.22%)',
        // darkPear: 'hsl(66.96deg 61.54% 64.31%)',
        // leafGreen: 'hsl(131.51deg 33.95% 57.84%)',
        // berkeleyBlue: 'hsl(210, 73%, 20%)',
        // chefBlue: "#5386e4",
        // lightBlue: "#bedcfe",
        // taupe: "#949396",
        // calPolyGreen: "#214e34",
        // jasperRed: "#c84630",
        // mountbattenPink: "#b287a3",
        // stripeBlack: "#0a2540",

        background: 'hsl(var(--background))',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--color-1))',
          '2': 'hsl(var(--color-2))',
          '3': 'hsl(var(--color-3))',
          '4': 'hsl(var(--color-4))',
          '5': 'hsl(var(--color-5))',
        }
      },
      animation: {
        'shiny-text': 'shiny-text 8s infinite',
        gradient: 'gradient 8s linear infinite'
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0'
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0'
          }
        },
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size) 0'
          }
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
