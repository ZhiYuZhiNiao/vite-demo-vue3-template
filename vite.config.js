import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import path, { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const pathResolve = (dir) => {
  return resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 设置打包路径, 等下去查查具体意思
  plugins: [
    vue(),
    // eslint
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    // SvgIcon
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]'
    }),
    /* 饿了么自动按需导入 */
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    // 路径别名配置
    alias: {
      '@': pathResolve('src')
    },
    // 可以省略 .js .vue 文件的结尾, 如果是 index.js or index.vue 则可以全部省略
    extensions: ['.js', '.jsx', '.vue']
  },
  server: {
    host: true,
    port: 4000,
    open: true
  }
})
