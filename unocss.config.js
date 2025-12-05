import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
    },
  },
  include: [
    'src/**/*.tsx',
    'src/**/*.jsx',
    'src/**/*.js',
    'src/**/*.html',
  ],
  safelist: [
    'font-sans',
    'container','mx-auto','px-4',
    'text-purple-700','hover:text-purple-500',
    'border','border-solid','rounded-md','p-6',
    'shadow-md','space-y-6','text-center',
  ],
  preflights: [
    {
      getCSS: () => `

        html {
          overflow-y: scroll;
        }

        table {
          border-collapse: collapse;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }

        /* Aturan untuk header dan cell */
        table th,
        table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }

        table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }

        table tr:nth-child(even) {
          background-color: #fafafa;
        }

        blockquote { border-left: 4px solid #828282; padding-left: 12px; font-style: italic; }
        details { margin-bottom: 1rem; }
        summary { cursor: pointer; font-weight: bold; }`,
    },
  ]
})