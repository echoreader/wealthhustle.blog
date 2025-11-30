import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    //presetTypography(),
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
})
