import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),

  ],

  build: {
    minify: false,
    outDir: './public',
    assetsDir: '', 
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined,
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',       
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|webm|avif)$/.test(assetInfo.name)) {
            return `images/[name].${extType}`;
          }
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/style.${extType}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name].${extType}`;
          }
          return `[name].${extType}`;
        },
      },
    },
  }

});
