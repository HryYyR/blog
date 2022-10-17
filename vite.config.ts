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
  resolve: {
    alias: {
      qc: 'QC'
    }
  },
  base: '/',  //history
  // base: process.env.NODE_ENV === 'production' ? './' : '/',  //hash
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    },
    terserOptions: {
      compress: {
        //生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true,
      },
    },
  }
})


