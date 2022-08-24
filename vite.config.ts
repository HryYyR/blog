import { defineConfig, resolveEnvPrefix } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
      ],
    }),

    Components({
      resolvers: [
        ElementPlusResolver(),
      ],

    }),

  ],
  resolve:{
    alias:{
      qc: 'QC'
    }
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  }
})


