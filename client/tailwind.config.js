/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          '10': '#004481',
          '20': '#004481',
          '40': '#97CBDC',
          '60': '#DEE8F1',
          '80': 'hsl(184, 58%, 66%)',
          '100': 'hsl(214, 100%, 96%)',
        },
      },
      spacing: {
        'px': '0.125rem',  // 1px
        '0.25': '0.25rem',  // 2px
        '0.5': '0.5rem',  // 4px
        '1': '1rem',  // 8px
        '1.25': '1.25rem', // 10px
        '1.5': '1.5rem', // 12px
        '2': '2rem', // 16px
        '2.5': '2.5rem', // 20px
        '3': '3rem', // 24px
        '3.5': '3.5rem', // 28px
        '4': '4rem', // 32px
        '5': '5rem', // 40px
        '6': '6rem', // 48px
        '7': '7rem', // 56px
        '8': '8rem', // 64px
        '9': '9rem', // 72px
        '10': '10rem', // 80px
        '11': '11rem', // 88px
        '12': '12rem', // 96px
        '14': '14rem', // 112px
        '16': '16rem', // 128px
        '20': '20rem', // 160px
        '24': '24rem', // 192px
        '28': '28rem', // 224px
        '30': '30rem', // 240px
        '32': '32rem', // 256px
        '36': '36rem', // 288px
        '40': '40rem', // 320px
        '44': '44rem', // 352px
        '48': '48rem', // 384px
        '50': '50rem',
        '52': '52rem', // 416px
        '56': '56rem', // 448px
        '60': '60rem', // 480px
        '64': '64rem', // 512px
        '72': '72rem', // 576px
        '80': '80rem', // 640px
        '96': '96rem', // 768px,
        '100': '100rem', // 800px
      }
    },
  },
  plugins: [],
};
