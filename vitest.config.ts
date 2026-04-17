import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 与 Vite 集成：使用 Vue 插件让 SFC 可被 Vitest 处理
  plugins: [vue()],
  test: {
    // 组件测试环境
    environment: 'jsdom',
    // 便于直接使用 describe/it/expect
    globals: true,
    // 如需自定义测试初始化，可取消注释并创建对应文件
    // setupFiles: ['./src/test/setup.ts'],
  },
})