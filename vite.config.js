import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
  })],
  server: {
    host: true,
    // 指定项目启动端口
    port: 3000,
    // 启动项目时自动打开
    open: true,
    // 允许跨域
    cors: true,
    // 开发时的解决跨域问题
    // https://cn.vitejs.dev/config/#server-proxy
    proxy: {}
  },
  define: {
    "global": {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      stream: 'stream-browserify',
    }
  },
})
