module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        '206px': '206px',
      },
    },
  },
  plugins: [require('daisyui')],
};
