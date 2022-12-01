import { defineConfig, resolveEnvPrefix } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import viteCompression from 'vite-plugin-compression'  //gzip
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'

export default defineConfig({
  define: {
    'process.env': {}
  },
  
  plugins: [
    Vue(),
    resolveExternalsPlugin({
      QC: 'QC'
    }),
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
    viteCompression({
      threshold: 409600, // 对大于 400kb 的文件进行压缩
      algorithm: 'gzip'
    })

  ],
  server: {
    port: 8080
  },
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


