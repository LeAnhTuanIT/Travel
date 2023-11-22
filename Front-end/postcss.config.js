import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
  input: 'src/assets/css/main.scss', // Chỉ định đường dẫn đến tệp CSS chính của bạn
  output: 'src/public/css/main.scss',
};