/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#68d350",
        
"secondary": "#f7e4a0",
        
"accent": "#bdb2f7",
        
"neutral": "#1d1c30",
        
"base-100": "#ffffff",
        
"info": "#97e1f2",
        
"success": "#1bda61",
        
"warning": "#de8912",
        
"error": "#e92f3f",
        },
      },
    ],
  },
  plugins: [require("daisyui")]
}