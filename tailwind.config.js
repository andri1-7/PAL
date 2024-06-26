/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors : {
      pevitaBlue : "#0074E6",
      textDashboard : "#4B5563",
      textDashboardHover : "#0071B8",
      noConnection: "#FFE7E7",
      textNoConnection: "#EF4C4D",
      pevitaSecondary: "#41ACE1",
      'gray-900':'#111827',
      'gray-800':'#1f2937',
      'gray-700':'#374151',
      'gray-600':'#4b5563',
      'gray-500':'#6b7280',
      'gray-400':'#9ca3af',
      'gray-300':'#d1d5db',
      'gray-200':'#e5e7eb',
      'gray-100':'#f3f4f6',
      'gray-50':'#f9fafb',
      'gray-25':'#fcfcfd',
      'gray-warm-900':'#141414',
      'gray-warm-800':'#292929',
      'gray-warm-700':'#424242',
      'gray-warm-600':'#525252',
      'gray-warm-500':'#737373',
      'gray-warm-400':'#a3a3a3',
      'gray-warm-300':'#dedede',
      'gray-warm-200':'#e5e5e5',
      'gray-warm-100':'#f5f5f5',
      'gray-warm-50':'#fafafa',
      'gray-warm-25':'#fcfcfc',
      'black':'#333333',
      'white':'#ffffff',
      'semantic-positive-900':'#084c2e',
      'semantic-positive-800':'#095c37',
      'semantic-positive-700':'#087443',
      'semantic-positive-600':'#099250',
      'semantic-positive-500':'#16b364',
      'semantic-positive-400':'#3ccb7f',
      'semantic-positive-300':'#73e2a3',
      'semantic-positive-200':'#aaf0c4',
      'semantic-positive-100':'#d3f8df',
      'semantic-positive-50':'#edfcf2',
      'semantic-positive-25':'#f6fef9',
      'semantic-negative-900':'#7a271a',
      'semantic-negative-800':'#912018',
      'semantic-negative-700':'#b42318',
      'semantic-negative-600':'#d92d20',
      'semantic-negative-500':'#f04438',
      'semantic-negative-400':'#f97066',
      'semantic-negative-300':'#fda29b',
      'semantic-negative-200':'#fecdca',
      'semantic-negative-100':'#fee4e2',
      'semantic-negative-50':'#fef3f2',
      'semantic-negative-25':'#fffbfa',
      'semantic-notice-900':'#7a2e0e',
      'semantic-notice-800':'#93370d',
      'semantic-notice-700':'#b54708',
      'semantic-notice-600':'#dc6803',
      'semantic-notice-500':'#f79009',
      'semantic-notice-400':'#fdb022',
      'semantic-notice-300':'#fec84b',
      'semantic-notice-200':'#fedf89',
      'semantic-notice-100':'#fef0c7',
      'semantic-notice-50':'#fffaeb',
      'semantic-notice-25':'#fffcf5',
      'blue-primary-900':'#001e3c',
      'blue-primary-800':'#00366c',
      'blue-primary-700':'#004b94',
      'blue-primary-600':'#0060bd',
      'blue-primary-500':'#0074e6',
      'blue-primary-400':'#3399ff',
      'blue-primary-300':'#75baff',
      'blue-primary-200':'#aed7ff',
      'blue-primary-100':'#d6eaff',
      'blue-primary-50':'#ebf5ff',
      'blue-primary-25':'#f6f7fb',
      'blue-secondary-900':'#0a3042',
      'blue-secondary-800':'#14455d',
      'blue-secondary-700':'#2b6c8d',
      'blue-secondary-600':'#3c93bd',
      'blue-secondary-500':'#59b7e5',
      'blue-secondary-400':'#6ecfff',
      'blue-secondary-300':'#8fdaff',
      'blue-secondary-200':'#afe5ff',
      'blue-secondary-100':'#d0efff',
      'blue-secondary-50':'#e5f6ff',
      'blue-secondary-25':'#eff6fb',
    },
  },
  plugins: [],
}
