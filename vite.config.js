import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  console.log(111111)
  console.log(command)
  console.log(mode)
  const define = {
    global: {}
  }
  return {
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
    define: command === 'build' ? {} : define,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        stream: 'stream-browserify',
        "safe-buffer": "buffer",
        fs: "memfs",
        path: "path-browserify",
        crypto: "crypto-browserify",
        "readable-stream": "readable-stream-no-circular",
        timers: "timers-browserify",
        os: "os-browserify",
        tty: "tty-browserify",
        readline: "EMPTY",
        fsevents: "EMPTY",
        chokidar: "EMPTY",
        readdirp: "EMPTY",
        consolidate: "EMPTY",
        pnpapi: "EMPTY"
      }
    },
    build:{
      // terserOptions: {
      //     compress: {
      //       drop_console: true,
      //       drop_debugger: true
      //     }
      // }
    }
  }
})
