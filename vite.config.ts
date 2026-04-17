import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es', 'umd'],
      // UMD 全局变量名（浏览器环境下）
      name: 'VueUiLib',
      // 让输出文件名与 package.json 里的 main/module 对应
      fileName: (format) => (format === 'es' ? 'index.es.js' : 'index.umd.js'),
    },
    rollupOptions: {
      // 不打包 vue（由使用方通过 peerDependencies 提供）
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
