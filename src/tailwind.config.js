module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8',   // blue-700
        },
        secondary: {
          DEFAULT: '#e11d48', // rose-600
        },
      },
    },
  },
  plugins: [],
}
